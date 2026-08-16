from django.db import models
from django.utils import timezone
from services.models import Service


class Customer(models.Model):
    """Customer information for bookings."""

    name = models.CharField(max_length=200)
    email = models.EmailField()
    phone = models.CharField(max_length=20)
    date_of_birth = models.DateField(null=True, blank=True)
    time_of_birth = models.TimeField(null=True, blank=True)
    place_of_birth = models.CharField(max_length=200, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return self.name


class Slot(models.Model):
    """Time slot for consultations."""

    class Status(models.TextChoices):
        AVAILABLE = 'AVAILABLE', 'Available'
        BLOCKED = 'BLOCKED', 'Blocked'
        BOOKED = 'BOOKED', 'Booked'
        HELD = 'HELD', 'Held'

    date = models.DateField()
    start_time = models.TimeField()
    end_time = models.TimeField()
    status = models.CharField(
        max_length=20,
        choices=Status.choices,
        default=Status.AVAILABLE,
    )
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['date', 'start_time']
        unique_together = ['date', 'start_time']

    def __str__(self):
        return f"{self.date} {self.start_time} - {self.end_time}"


class Booking(models.Model):
    """Booking for a consultation."""

    class Status(models.TextChoices):
        PENDING_PAYMENT = 'PENDING_PAYMENT', 'Pending Payment'
        CONFIRMED = 'CONFIRMED', 'Confirmed'
        CANCELLED = 'CANCELLED', 'Cancelled'
        EXPIRED = 'EXPIRED', 'Expired'

    booking_number = models.CharField(max_length=20, unique=True)
    customer = models.ForeignKey(Customer, on_delete=models.CASCADE, related_name='bookings')
    service = models.ForeignKey(Service, on_delete=models.CASCADE, related_name='bookings')
    slot = models.ForeignKey(Slot, on_delete=models.CASCADE, related_name='bookings')
    booking_status = models.CharField(
        max_length=20,
        choices=Status.choices,
        default=Status.PENDING_PAYMENT,
    )
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    notes = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return self.booking_number

    def save(self, *args, **kwargs):
        if not self.booking_number:
            # Generate booking number: HOA-YYYYMMDD-XXX
            today = timezone.now().strftime('%Y%m%d')
            count = Booking.objects.filter(booking_number__startswith=f'HOA-{today}').count() + 1
            self.booking_number = f'HOA-{today}-{count:03d}'
        super().save(*args, **kwargs)