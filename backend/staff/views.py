from rest_framework import viewsets, permissions
from rest_framework.decorators import action
from rest_framework.response import Response

from .models import Staff, WorkingHour, StaffLeave
from .serializers import (
    StaffSerializer,
    WorkingHourSerializer,
    StaffLeaveSerializer,
)


class StaffViewSet(viewsets.ModelViewSet):

    serializer_class = StaffSerializer
    permission_classes = [
        permissions.IsAuthenticated
    ]

    def get_queryset(self):

        queryset = Staff.objects.filter(
            is_active=True
        ).select_related(
            "user",
            "salon"
        )

        salon_id = self.request.query_params.get(
            "salon"
        )

        if salon_id:
            queryset = queryset.filter(
                salon_id=salon_id
            )

        return queryset.order_by("id")


class WorkingHourViewSet(viewsets.ModelViewSet):

    serializer_class = WorkingHourSerializer
    permission_classes = [
        permissions.IsAuthenticated
    ]

    def get_queryset(self):

        queryset = WorkingHour.objects.filter(
            is_available=True
        )

        staff_id = self.request.query_params.get(
            "staff"
        )

        if staff_id:
            queryset = queryset.filter(
                staff_id=staff_id
            )

        return queryset.order_by(
            "day_of_week",
            "start_time"
        )


class StaffLeaveViewSet(viewsets.ModelViewSet):

    serializer_class = StaffLeaveSerializer
    permission_classes = [
        permissions.IsAuthenticated
    ]

    def get_queryset(self):

        queryset = StaffLeave.objects.all()

        staff_id = self.request.query_params.get(
            "staff"
        )

        if staff_id:
            queryset = queryset.filter(
                staff_id=staff_id
            )

        return queryset.order_by(
            "start_date"
        )