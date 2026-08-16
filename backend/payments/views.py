import hmac
import hashlib
import json

from django.conf import settings
from django.utils import timezone
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response

from bookings.models import Booking, Slot
from .models import Payment
from notifications.services import send_booking_confirmation_emails


@api_view(['POST'])
def create_order(request):
    """Create a Razorpay order for a booking."""
    booking_id = request.data.get('booking_id')
    if not booking_id:
        return Response({'error': 'booking_id is required'}, status=status.HTTP_400_BAD_REQUEST)

    try:
        booking = Booking.objects.get(id=booking_id)
    except Booking.DoesNotExist:
        return Response({'error': 'Booking not found'}, status=status.HTTP_404_NOT_FOUND)

    if booking.booking_status != Booking.Status.PENDING_PAYMENT:
        return Response({'error': 'Booking is not in pending payment state'}, status=status.HTTP_400_BAD_REQUEST)

    try:
        import razorpay
        client = razorpay.Client(
            auth=(settings.RAZORPAY_KEY_ID, settings.RAZORPAY_KEY_SECRET)
        )

        # Create Razorpay order
        order_data = {
            'amount': int(float(booking.amount) * 100),  # Convert to paise
            'currency': 'INR',
            'receipt': booking.booking_number,
            'notes': {
                'booking_id': str(booking.id),
                'booking_number': booking.booking_number,
            },
        }

        order = client.order.create(data=order_data)

        # Create payment record
        payment = Payment.objects.create(
            booking=booking,
            razorpay_order_id=order['id'],
            amount=booking.amount,
            status=Payment.Status.CREATED,
        )

        return Response({
            'order_id': order['id'],
            'amount': order['amount'],
            'currency': order['currency'],
            'key_id': settings.RAZORPAY_KEY_ID,
            'payment_id': payment.id,
        })
    except Exception as e:
        return Response(
            {'error': f'Failed to create payment order: {str(e)}'},
            status=status.HTTP_500_INTERNAL_SERVER_ERROR
        )


@api_view(['POST'])
def verify_payment(request):
    """Verify Razorpay payment signature."""
    booking_id = request.data.get('booking_id')
    razorpay_payment_id = request.data.get('razorpay_payment_id')
    razorpay_order_id = request.data.get('razorpay_order_id')
    razorpay_signature = request.data.get('razorpay_signature')

    if not all([booking_id, razorpay_payment_id, razorpay_order_id, razorpay_signature]):
        return Response({'error': 'Missing required fields'}, status=status.HTTP_400_BAD_REQUEST)

    try:
        booking = Booking.objects.get(id=booking_id)
    except Booking.DoesNotExist:
        return Response({'error': 'Booking not found'}, status=status.HTTP_404_NOT_FOUND)

    try:
        payment = Payment.objects.get(
            booking=booking,
            razorpay_order_id=razorpay_order_id,
        )
    except Payment.DoesNotExist:
        return Response({'error': 'Payment not found'}, status=status.HTTP_404_NOT_FOUND)

    # Verify signature
    expected_signature = hmac.new(
        settings.RAZORPAY_KEY_SECRET.encode('utf-8'),
        f"{razorpay_order_id}|{razorpay_payment_id}".encode('utf-8'),
        hashlib.sha256
    ).hexdigest()

    if expected_signature != razorpay_signature:
        payment.status = Payment.Status.FAILED
        payment.save()
        return Response({'error': 'Invalid payment signature'}, status=status.HTTP_400_BAD_REQUEST)

    # Payment verified
    payment.razorpay_payment_id = razorpay_payment_id
    payment.razorpay_signature = razorpay_signature
    payment.status = Payment.Status.SUCCESS
    payment.save()

    # Update booking
    booking.booking_status = Booking.Status.CONFIRMED
    booking.save()

    # Update slot
    slot = booking.slot
    slot.status = Slot.Status.BOOKED
    slot.save()

    # Send confirmation emails
    send_booking_confirmation_emails(booking)

    return Response({
        'message': 'Payment verified successfully',
        'booking': {
            'id': booking.id,
            'booking_number': booking.booking_number,
            'status': booking.booking_status,
        }
    })


@api_view(['POST'])
def webhook(request):
    """Handle Razorpay webhook events."""
    webhook_secret = settings.RAZORPAY_KEY_SECRET
    signature = request.headers.get('X-Razorpay-Signature', '')

    # Verify webhook signature
    expected_signature = hmac.new(
        webhook_secret.encode('utf-8'),
        request.body,
        hashlib.sha256
    ).hexdigest()

    if not hmac.compare_digest(signature, expected_signature):
        return Response({'error': 'Invalid signature'}, status=status.HTTP_400_BAD_REQUEST)

    try:
        payload = json.loads(request.body)
        event = payload.get('event', '')
        data = payload.get('payload', {}).get('payment', {}).get('entity', {})

        if event == 'payment.captured':
            order_id = data.get('order_id', '')
            payment_id = data.get('id', '')

            try:
                payment = Payment.objects.get(razorpay_order_id=order_id)
                payment.razorpay_payment_id = payment_id
                payment.status = Payment.Status.SUCCESS
                payment.save()

                booking = payment.booking
                booking.booking_status = Booking.Status.CONFIRMED
                booking.save()

                slot = booking.slot
                slot.status = Slot.Status.BOOKED
                slot.save()

                send_booking_confirmation_emails(booking)
            except Payment.DoesNotExist:
                pass

        elif event == 'payment.failed':
            order_id = data.get('order_id', '')

            try:
                payment = Payment.objects.get(razorpay_order_id=order_id)
                payment.status = Payment.Status.FAILED
                payment.save()

                # Release the slot
                booking = payment.booking
                slot = booking.slot
                if slot.status == Slot.Status.HELD:
                    slot.status = Slot.Status.AVAILABLE
                    slot.save()

                booking.booking_status = Booking.Status.CANCELLED
                booking.save()
            except Payment.DoesNotExist:
                pass

        return Response({'status': 'success'})
    except Exception as e:
        return Response(
            {'error': str(e)},
            status=status.HTTP_500_INTERNAL_SERVER_ERROR
        )