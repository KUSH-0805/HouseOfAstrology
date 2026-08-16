from django.contrib import admin
from .models import Notification


@admin.register(Notification)
class NotificationAdmin(admin.ModelAdmin):
    list_display = ['booking', 'type', 'recipient', 'status', 'sent_at']
    list_filter = ['type', 'status']
    search_fields = ['recipient', 'booking__booking_number']