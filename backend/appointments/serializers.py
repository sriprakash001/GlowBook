from rest_framework import serializers

from .models import Appointment


class AppointmentSerializer(serializers.ModelSerializer):

    customer_username = serializers.CharField(
        source="customer.username",
        read_only=True
    )

    customer_email = serializers.EmailField(
        source="customer.email",
        read_only=True
    )

    staff_username = serializers.CharField(
        source="staff.user.username",
        read_only=True
    )

    service_name = serializers.CharField(
        source="service.name",
        read_only=True
    )

    salon_name = serializers.CharField(
        source="salon.name",
        read_only=True
    )

    class Meta:
        model = Appointment

        fields = [
            "id",

            # IDs
            "customer",
            "salon",
            "service",
            "staff",

            # Display information
            "customer_username",
            "customer_email",
            "staff_username",
            "service_name",
            "salon_name",

            # Appointment details
            "appointment_date",
            "start_time",
            "end_time",
            "price",
            "status",
            "customer_note",

            # timestamps
            "created_at",
            "updated_at",
        ]

        read_only_fields = [
            "customer",
            "price",
            "status",
            "created_at",
            "updated_at",
            "customer_username",
            "customer_email",
            "staff_username",
            "service_name",
            "salon_name",
        ]

    def validate(self, data):

        salon = data.get("salon")
        service = data.get("service")
        staff = data.get("staff")
        appointment_date = data.get("appointment_date")
        start_time = data.get("start_time")
        end_time = data.get("end_time")

        # End time must be after start time
        if start_time >= end_time:
            raise serializers.ValidationError({
                "end_time": "End time must be after start time."
            })

        # Service must belong to salon
        if service.salon_id != salon.id:
            raise serializers.ValidationError({
                "service": "This service does not belong to the selected salon."
            })

        # Staff must belong to salon
        if staff.salon_id != salon.id:
            raise serializers.ValidationError({
                "staff": "This stylist does not belong to the selected salon."
            })

        # Check staff availability
        overlap = Appointment.objects.filter(
            staff=staff,
            appointment_date=appointment_date,
            status__in=[
                "pending",
                "confirmed",
            ],
        ).filter(
            start_time__lt=end_time,
            end_time__gt=start_time,
        ).exists()

        if overlap:
            raise serializers.ValidationError({
                "time": "This stylist is already booked for this time."
            })

        return data

    def create(self, validated_data):

        service = validated_data["service"]

        validated_data["price"] = service.price

        return super().create(validated_data)