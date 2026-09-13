from rest_framework import serializers

from .models import Salon, SalonCategory


class SalonCategorySerializer(serializers.ModelSerializer):

    class Meta:
        model = SalonCategory

        fields = [
            "id",
            "name",
            "description",
            "image",
            "is_active",
        ]


class SalonSerializer(serializers.ModelSerializer):

    owner_name = serializers.CharField(
        source="owner.username",
        read_only=True
    )

    categories = SalonCategorySerializer(
        many=True,
        read_only=True
    )

    class Meta:
        model = Salon

        fields = [
            "id",
            "owner",
            "owner_name",
            "name",
            "description",
            "phone",
            "email",
            "address",
            "city",
            "state",
            "pincode",
            "image",
            "latitude",
            "longitude",
            "categories",
            "is_active",
            "created_at",
            "updated_at",
        ]

        read_only_fields = [
            "owner",
        ]