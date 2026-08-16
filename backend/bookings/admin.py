from django.contrib import admin
from .models import Customer, Slot, Booking


@admin.register(Customer)
class CustomerAdmin(admin.ModelAdmin):
    list_display = ['name', 'email', 'phone', 'created_at']
    search_fields = ['name', 'email', 'phone']


@admin.register(Slot)
class SlotAdmin(admin.ModelAdmin):
    list_display = ['date', 'start_time', 'end_time', 'status']
    list_filter = ['status', 'date']
    search_fields = ['date']


@admin.register(Booking)
class BookingAdmin(admin.ModelAdmin):
    list_display = ['booking_number', 'customer', 'service', 'slot', 'booking_status', 'amount', 'created_at']
    list_filter = ['booking_status', 'created_at']
    search_fields = ['booking_number', 'customer__name', 'customer__email']