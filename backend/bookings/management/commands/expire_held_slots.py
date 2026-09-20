from datetime import timedelta

from django.core.management.base import BaseCommand
from django.utils import timezone

from bookings.models import Booking, Slot

# How long a slot can stay HELD awaiting payment before it is released.
HELD_MINUTES = 15


class Command(BaseCommand):
    """Release slots held by unpaid bookings and expire those bookings.

    A slot is set to HELD when a booking is created but payment hasn't
    completed yet. If the customer abandons the payment, the slot would stay
    locked forever. This command finds bookings still in PENDING_PAYMENT after
    HELD_MINUTES, marks them EXPIRED, and releases their slots back to
    AVAILABLE so other customers can book them.

    Run it periodically (e.g. every 5 minutes via a cron / task scheduler):
        python manage.py expire_held_slots
    """

    help = 'Release slots held by unpaid bookings and expire those bookings.'

    def add_arguments(self, parser):
        parser.add_argument(
            '--minutes',
            type=int,
            default=HELD_MINUTES,
            help='Number of minutes a slot may remain held before release.',
        )

    def handle(self, *args, **options):
        minutes = options['minutes']
        cutoff = timezone.now() - timedelta(minutes=minutes)

        pending_bookings = Booking.objects.filter(
            booking_status=Booking.Status.PENDING_PAYMENT,
            created_at__lt=cutoff,
        )

        expired_count = 0
        released_count = 0

        for booking in pending_bookings:
            # Expire the booking
            booking.booking_status = Booking.Status.EXPIRED
            booking.save()
            expired_count += 1

            # Release the held slot
            slot = booking.slot
            if slot.status == Slot.Status.HELD:
                slot.status = Slot.Status.AVAILABLE
                slot.save()
                released_count += 1

        self.stdout.write(
            self.style.SUCCESS(
                f'Expired {expired_count} pending booking(s), '
                f'released {released_count} held slot(s).'
            )
        )