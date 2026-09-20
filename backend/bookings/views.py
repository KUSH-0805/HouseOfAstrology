from django.db import transaction
from django.utils import timezone
from rest_framework import viewsets, status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Customer, Slot, Booking
from .serializers import BookingSerializer, CreateBookingSerializer, SlotSerializer
from services.models import Service


class BookingViewSet(viewsets.ReadOnlyModelViewSet):
    """ViewSet for viewing bookings."""

    queryset = Booking.objects.all()
    serializer_class = BookingSerializer


@api_view(['GET'])
def booking_detail(request, pk):
    """Get a single booking by id (for the confirmation page)."""
    try:
        booking = Booking.objects.get(id=pk)
    except Booking.DoesNotExist:
        return Response({'error': 'Booking not found'}, status=status.HTTP_404_NOT_FOUND)
    return Response(BookingSerializer(booking).data)


@api_view(['GET'])
def availability(request):
    """Get available slots for a given date."""
    date = request.query_params.get('date')
    if not date:
        return Response({'error': 'Date parameter is required'}, status=status.HTTP_400_BAD_REQUEST)

    slots = Slot.objects.filter(date=date).order_by('start_time')
    serializer = SlotSerializer(slots, many=True)
    return Response({'date': date, 'slots': serializer.data})


@api_view(['GET'])
def slot_list(request):
    """List all slots."""
    slots = Slot.objects.all().order_by('date', 'start_time')
    serializer = SlotSerializer(slots, many=True)
    return Response(serializer.data)


@api_view(['POST'])
def create_booking(request):
    """Create a booking with slot holding."""
    serializer = CreateBookingSerializer(data=request.data)
    if not serializer.is_valid():
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    data = serializer.validated_data
    service_id = data['service_id']
    slot_id = data['slot_id']
    customer_data = data['customer']
    notes = data.get('notes', '')

    booking = None
    try:
        with transaction.atomic():
            # Validate service
            try:
                service = Service.objects.get(id=service_id, is_active=True)
            except Service.DoesNotExist:
                return Response({'error': 'Service not found'}, status=status.HTTP_404_NOT_FOUND)

            # Validate slot and check availability
            try:
                slot = Slot.objects.select_for_update().get(id=slot_id)
            except Slot.DoesNotExist:
                return Response({'error': 'Slot not found'}, status=status.HTTP_404_NOT_FOUND)

            if slot.status != Slot.Status.AVAILABLE:
                return Response(
                    {'error': 'Slot is not available'},
                    status=status.HTTP_409_CONFLICT
                )

            # Create or get customer
            customer, _ = Customer.objects.get_or_create(
                email=customer_data['email'],
                defaults={
                    'name': customer_data['name'],
                    'phone': customer_data['phone'],
                    'date_of_birth': customer_data.get('date_of_birth'),
                    'time_of_birth': customer_data.get('time_of_birth'),
                    'place_of_birth': customer_data.get('place_of_birth', ''),
                }
            )

            # Create booking in pending payment state
            booking = Booking.objects.create(
                customer=customer,
                service=service,
                slot=slot,
                amount=service.price,
                notes=notes,
                booking_status=Booking.Status.PENDING_PAYMENT,
            )

            # Hold the slot until payment is completed
            slot.status = Slot.Status.HELD
            slot.save()

            return Response(
                {
                    'booking': BookingSerializer(booking).data,
                    'message': 'Booking created. Proceed to payment.',
                },
                status=status.HTTP_201_CREATED
            )
    except Exception as e:
        return Response(
            {'error': str(e)},
            status=status.HTTP_500_INTERNAL_SERVER_ERROR
        )