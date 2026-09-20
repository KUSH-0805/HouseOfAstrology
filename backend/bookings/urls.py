from django.urls import path
from . import views

urlpatterns = [
    path('availability/', views.availability, name='availability'),
    path('slots/', views.slot_list, name='slot-list'),
    path('bookings/', views.create_booking, name='create-booking'),
    path('bookings/detail/<int:pk>/', views.booking_detail, name='booking-detail'),
]