from django.db import models
from bookings.models import Booking


class Notification(models.Model):
    """Notification record for bookings."""

    class Type(models.TextChoices):
        CUSTOMER_EMAIL = 'CUSTOMER_EMAIL', 'Customer Email'
        OWNER_EMAIL = 'OWNER_EMAIL', 'Owner Email'
        WHATSAPP = 'WHATSAPP', 'WhatsApp'

    class Status(models.TextChoices):
        PENDING = 'PENDING', 'Pending'
        SENT = 'SENT', 'Sent'
        FAILED = 'FAILED', 'Failed'

    booking = models.ForeignKey(Booking, on_delete=models.CASCADE, related_name='notifications')
    type = models.CharField(max_length=20, choices=Type.choices)
    recipient = models.EmailField()
    status = models.CharField(
        max_length=20,
        choices=Status.choices,
        default=Status.PENDING,
    )
    sent_at = models.DateTimeField(null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return f"{self.type} - {self.recipient} - {self.status}"