from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated

from .models import Service
from .serializers import ServiceSerializer


class ServiceViewSet(viewsets.ModelViewSet):

    queryset = Service.objects.filter(
        is_active=True
    )

    serializer_class = ServiceSerializer

    permission_classes = [
        IsAuthenticated
    ]

    filterset_fields = [
        "salon",
        "category",
    ]

    search_fields = [
        "name",
        "description",
    ]

    ordering_fields = [
        "price",
        "duration",
        "name",
    ]