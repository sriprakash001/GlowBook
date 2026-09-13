from rest_framework import viewsets, permissions
from rest_framework.decorators import action
from rest_framework.response import Response

from .models import Appointment
from .serializers import AppointmentSerializer


class AppointmentViewSet(viewsets.ModelViewSet):

    serializer_class = AppointmentSerializer
    permission_classes = [permissions.IsAuthenticated]

    # =========================================================
    # GET APPOINTMENTS
    # =========================================================
    def get_queryset(self):

        user = self.request.user

        queryset = Appointment.objects.select_related(
            "customer",
            "salon",
            "service",
            "staff",
            "staff__user",
        )

        # CUSTOMER
        if user.role == "customer":

            return queryset.filter(
                customer=user
            ).order_by(
                "-appointment_date",
                "-start_time"
            )

        # SALON OWNER
        if user.role == "salon_owner":

            return queryset.filter(
                salon__owner=user
            ).order_by(
                "-appointment_date",
                "-start_time"
            )

        # SALON MANAGER
        if user.role == "salon_manager":

            return queryset.filter(
                salon__manager=user
            ).order_by(
                "-appointment_date",
                "-start_time"
            )

        # STAFF
        if user.role == "staff":

            return queryset.filter(
                staff__user=user
            ).order_by(
                "-appointment_date",
                "-start_time"
            )

        # ADMIN
        if user.role == "admin":

            return queryset.order_by(
                "-appointment_date",
                "-start_time"
            )

        return Appointment.objects.none()

    # =========================================================
    # CREATE APPOINTMENT
    # =========================================================

    def perform_create(self, serializer):

        serializer.save(
            customer=self.request.user
        )

    # =========================================================
    # CANCEL APPOINTMENT
    # =========================================================

    @action(
        detail=True,
        methods=["post"],
        url_path="cancel"
    )
    def cancel(self, request, pk=None):

        appointment = self.get_object()

        # Only customer can cancel their appointment
        if appointment.customer != request.user:

            return Response(
                {
                    "detail": "You can only cancel your own appointment."
                },
                status=403
            )

        # Cannot cancel these
        if appointment.status in [
            "completed",
            "cancelled",
            "no_show"
        ]:

            return Response(
                {
                    "detail": "This appointment cannot be cancelled."
                },
                status=400
            )

        appointment.status = "cancelled"
        appointment.save()

        return Response(
            {
                "message": "Appointment cancelled successfully.",
                "status": appointment.status
            }
        )

    # =========================================================
    # UPDATE APPOINTMENT STATUS
    # =========================================================

    @action(detail=True,methods=["post"],url_path="update-status")
    def update_status(self, request, pk=None):

        appointment = self.get_object()

        new_status = request.data.get("status")

        allowed_statuses = [
            "pending",
            "confirmed",
            "completed",
            "cancelled",
            "no_show",
        ]

        if new_status not in allowed_statuses:

            return Response(
                {
                    "detail": "Invalid appointment status."
                },
                status=400
            )

        user = request.user

        # =====================================================
        # STAFF
        # =====================================================

        if user.role == "staff":

            # Only assigned staff can update
            if appointment.staff.user != user:

                return Response(
                    {
                        "detail": "You can only update your assigned appointments."
                    },
                    status=403
                )

            # Staff status flow
            if appointment.status == "pending":

                if new_status not in [
                    "confirmed",
                    "cancelled",
                ]:
                    return Response(
                        {
                            "detail": "Pending appointment can only be confirmed or cancelled."
                        },
                        status=400
                    )

            elif appointment.status == "confirmed":

                if new_status not in [
                    "completed",
                    "cancelled",
                    "no_show",
                ]:
                    return Response(
                        {
                            "detail": "Confirmed appointment can only be completed, cancelled or marked no-show."
                        },
                        status=400
                    )

            else:

                return Response(
                    {
                        "detail": "This appointment can no longer be updated."
                    },
                    status=400
                )

        # =====================================================
        # SALON OWNER
        # =====================================================

        elif user.role == "salon_owner":

            if appointment.salon.owner != user:

                return Response(
                    {
                        "detail": "You can only update appointments for your salon."
                    },
                    status=403
                )

        # =====================================================
        # SALON MANAGER
        # =====================================================

        elif user.role == "salon_manager":

            if appointment.salon.manager != user:

                return Response(
                    {
                        "detail": "You can only update appointments for your salon."
                    },
                    status=403
                )

        # =====================================================
        # ADMIN
        # =====================================================

        elif user.role == "admin":

            pass

        # =====================================================
        # OTHER USERS
        # =====================================================

        else:

            return Response(
                {
                    "detail": "You are not allowed to update appointment status."
                },
                status=403
            )

        # =====================================================
        # SAVE
        # =====================================================

        appointment.status = new_status
        appointment.save(update_fields=[
            "status",
            "updated_at"
        ])

        return Response(
            {
                "message": "Appointment status updated successfully.",
                "status": appointment.status
            }
        )