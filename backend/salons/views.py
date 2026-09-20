from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.exceptions import PermissionDenied

from .models import Salon, SalonCategory
from .serializers import SalonSerializer, SalonCategorySerializer


class SalonViewSet(viewsets.ModelViewSet):

    # Allow DRF to find all salons by ID.
    # Owner permission is checked separately below.
    queryset = Salon.objects.all()

    serializer_class = SalonSerializer

    permission_classes = [
        IsAuthenticated
    ]

    search_fields = [
        "name",
        "city",
        "description",
    ]

    ordering_fields = [
        "name",
        "created_at",
    ]

    # ---------------------------------
    # Create salon
    # ---------------------------------

    def perform_create(self, serializer):

        serializer.save(
            owner=self.request.user,
            is_active=True
        )

    # ---------------------------------
    # Get salons owned by current user
    # ---------------------------------

    @action(
        detail=False,
        methods=["get"],
        url_path="my-salons"
    )
    def my_salons(self, request):

        salons = Salon.objects.filter(
            owner=request.user
        ).order_by("-created_at")

        serializer = self.get_serializer(
            salons,
            many=True
        )

        return Response(
            serializer.data
        )

    # ---------------------------------
    # Update salon
    # ---------------------------------

    def perform_update(self, serializer):

        salon = self.get_object()

        # Only the owner can update the salon
        if salon.owner != self.request.user:

            raise PermissionDenied(
                "You can only update your own salon."
            )

        # Keep the salon active after updating
        serializer.save(
            is_active=True
        )


class SalonCategoryViewSet(viewsets.ModelViewSet):

    queryset = SalonCategory.objects.filter(
        is_active=True
    )

    serializer_class = SalonCategorySerializer

    permission_classes = [
        IsAuthenticated
    ]

