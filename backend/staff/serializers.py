from rest_framework import serializers

from .models import Staff, WorkingHour, StaffLeave


class StaffSerializer(serializers.ModelSerializer):

    username = serializers.CharField(
        source="user.username",
        read_only=True
    )

    class Meta:
        model = Staff

        fields = [
            "id",
            "user",
            "username",
            "salon",
            "designation",
            "bio",
            "experience_years",
            "image",
            "is_active",
            "created_at",
        ]

        read_only_fields = [
            "created_at",
        ]


class WorkingHourSerializer(serializers.ModelSerializer):

    class Meta:
        model = WorkingHour

        fields = "__all__"


class StaffLeaveSerializer(serializers.ModelSerializer):

    class Meta:
        model = StaffLeave

        fields = "__all__"