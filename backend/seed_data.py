"""Seed initial data for the House of Astrology application."""
import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'config.settings')
django.setup()

from services.models import Service
from bookings.models import Slot
from datetime import date, time, timedelta


def seed_services():
    """Create initial services."""
    services = [
        {
            'name': 'Career & Finance Guidance',
            'slug': 'career-guidance',
            'description': 'Guidance for professional growth and success. Get clarity on your career path, financial decisions, and professional opportunities.',
            'duration': 30,
            'price': 999,
        },
        {
            'name': 'Relationship Consultation',
            'slug': 'relationship-consultation',
            'description': 'Insights for meaningful connections and harmony. Understand your relationship patterns and find balance in your personal life.',
            'duration': 45,
            'price': 1499,
        },
        {
            'name': 'Life Purpose Reading',
            'slug': 'life-purpose-reading',
            'description': 'Discover your path and true calling. Uncover your life purpose and align your actions with your deeper mission.',
            'duration': 45,
            'price': 1299,
        },
        {
            'name': 'Birth Chart Reading',
            'slug': 'birth-chart-reading',
            'description': 'Deep insights from your cosmic blueprint. A comprehensive analysis of your birth chart for a complete understanding of your life.',
            'duration': 60,
            'price': 1999,
        },
    ]

    for service_data in services:
        service, created = Service.objects.get_or_create(
            slug=service_data['slug'],
            defaults=service_data,
        )
        if created:
            print(f"Created service: {service.name}")
        else:
            print(f"Service already exists: {service.name}")


def seed_slots():
    """Create slots for the next 7 days."""
    today = date.today()
    time_slots = [
        (time(10, 0), time(10, 30)),
        (time(10, 30), time(11, 0)),
        (time(11, 0), time(11, 30)),
        (time(11, 30), time(12, 0)),
        (time(12, 0), time(12, 30)),
        (time(12, 30), time(13, 0)),
        (time(14, 0), time(14, 30)),
        (time(14, 30), time(15, 0)),
        (time(15, 0), time(15, 30)),
        (time(15, 30), time(16, 0)),
        (time(16, 0), time(16, 30)),
        (time(16, 30), time(17, 0)),
    ]

    for day_offset in range(7):
        slot_date = today + timedelta(days=day_offset)
        for start, end in time_slots:
            slot, created = Slot.objects.get_or_create(
                date=slot_date,
                start_time=start,
                defaults={
                    'end_time': end,
                    'status': Slot.Status.AVAILABLE,
                },
            )
            if created:
                print(f"Created slot: {slot_date} {start}")


if __name__ == '__main__':
    print("Seeding services...")
    seed_services()
    print("Seeding slots...")
    seed_slots()
    print("Done!")