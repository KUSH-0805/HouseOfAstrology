from django.conf import settings
from django.core.mail import send_mail
from django.utils import timezone
from .models import Notification


def send_booking_confirmation_emails(booking):
    """Send confirmation emails to customer and owner."""
    # Send customer email
    send_customer_email(booking)
    # Send owner email
    send_owner_email(booking)


def send_customer_email(booking):
    """Send booking confirmation email to customer."""
    subject = 'House of Astrology — Booking Confirmed'
    message = f"""
Hello {booking.customer.name},

Your consultation has been successfully booked. We look forward to speaking with you.

Service: {booking.service.name}
Date: {booking.slot.date}
Time: {booking.slot.start_time}
Booking ID: {booking.booking_number}
Payment: Successful

Thank you,
House of Astrology
"""
    try:
        send_mail(
            subject,
            message,
            settings.DEFAULT_FROM_EMAIL,
            [booking.customer.email],
            fail_silently=False,
        )
        Notification.objects.create(
            booking=booking,
            type=Notification.Type.CUSTOMER_EMAIL,
            recipient=booking.customer.email,
            status=Notification.Status.SENT,
            sent_at=timezone.now(),
        )
    except Exception:
        Notification.objects.create(
            booking=booking,
            type=Notification.Type.CUSTOMER_EMAIL,
            recipient=booking.customer.email,
            status=Notification.Status.FAILED,
        )


def send_owner_email(booking):
    """Send booking notification to owner."""
    subject = 'NEW BOOKING'
    message = f"""
NEW BOOKING

Booking ID: {booking.booking_number}
Customer: {booking.customer.name}
Consultation: {booking.service.name}
Date: {booking.slot.date}
Time: {booking.slot.start_time}
Amount: ₹{booking.amount}
Payment: SUCCESS
"""
    try:
        send_mail(
            subject,
            message,
            settings.DEFAULT_FROM_EMAIL,
            [settings.OWNER_EMAIL],
            fail_silently=False,
        )
        Notification.objects.create(
            booking=booking,
            type=Notification.Type.OWNER_EMAIL,
            recipient=settings.OWNER_EMAIL,
            status=Notification.Status.SENT,
            sent_at=timezone.now(),
        )
    except Exception:
        Notification.objects.create(
            booking=booking,
            type=Notification.Type.OWNER_EMAIL,
            recipient=settings.OWNER_EMAIL,
            status=Notification.Status.FAILED,
        )


def send_contact_email(name, email, phone, message):
    """Send contact form message to owner."""
    subject = f'New Contact Message from {name}'
    message_body = f"""
Name: {name}
Email: {email}
Phone: {phone}

Message:
{message}
"""
    try:
        send_mail(
            subject,
            message_body,
            settings.DEFAULT_FROM_EMAIL,
            [settings.OWNER_EMAIL],
            fail_silently=False,
        )
        return True
    except Exception:
        return False