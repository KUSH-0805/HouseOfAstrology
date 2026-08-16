from rest_framework import viewsets
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Service
from .serializers import ServiceSerializer


class ServiceViewSet(viewsets.ReadOnlyModelViewSet):
    """ViewSet for viewing services."""

    queryset = Service.objects.filter(is_active=True)
    serializer_class = ServiceSerializer
    lookup_field = 'slug'