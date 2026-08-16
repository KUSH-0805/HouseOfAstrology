from rest_framework import serializers
from .models import Customer, Slot, Booking
from services.models import Service
from services.serializers import ServiceSerializer


class CustomerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Customer
        fields = ['id', 'name', 'email', 'phone', 'date_of_birth', 'time_of_birth', 'place_of_birth']


class SlotSerializer(serializers.ModelSerializer):
    class Meta:
        model = Slot
        fields = ['id', 'date', 'start_time', 'end_time', 'status']


class BookingSerializer(serializers.ModelSerializer):
    customer = CustomerSerializer(read_only=True)
    service = ServiceSerializer(read_only=True)
    slot = SlotSerializer(read_only=True)

    class Meta:
        model = Booking
        fields = ['id', 'booking_number', 'customer', 'service', 'slot', 'booking_status', 'amount', 'notes', 'created_at', 'updated_at']


class CreateBookingSerializer(serializers.Serializer):
    service_id = serializers.IntegerField()
    slot_id = serializers.IntegerField()
    customer = CustomerSerializer()
    notes = serializers.CharField(required=False, allow_blank=True)