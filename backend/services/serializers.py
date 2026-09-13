from rest_framework import serializers

from .models import Service


class ServiceSerializer(serializers.ModelSerializer):

    salon_name = serializers.CharField(
        source="salon.name",
        read_only=True
    )

    category_name = serializers.CharField(
        source="category.name",
        read_only=True
    )

    class Meta:
        model = Service

        fields = [
            "id",
            "salon",
            "salon_name",
            "category",
            "category_name",
            "name",
            "description",
            "price",
            "duration",
            "image",
            "is_active",
            "created_at",
            "updated_at",
        ]