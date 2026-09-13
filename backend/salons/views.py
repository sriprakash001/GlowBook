# from rest_framework import viewsets
# from rest_framework.permissions import IsAuthenticated
# from rest_framework.decorators import action
# from rest_framework.response import Response
# from rest_framework import status

# from .models import Salon, SalonCategory
# from .serializers import SalonSerializer, SalonCategorySerializer


# class SalonViewSet(viewsets.ModelViewSet):

#     queryset = Salon.objects.filter(
#         is_active=True
#     )

#     serializer_class = SalonSerializer

#     permission_classes = [
#         IsAuthenticated
#     ]

#     search_fields = [
#         "name",
#         "city",
#         "description",
#     ]

#     ordering_fields = [
#         "name",
#         "created_at",
#     ]

#     def perform_create(self, serializer):

#         serializer.save(
#             owner=self.request.user
#         )

#     @action(
#         detail=False,
#         methods=["get"],
#         url_path="my-salon"
#     )
#     def my_salon(self, request):

#         salon = Salon.objects.filter(
#             owner=request.user,
#             is_active=True
#         ).first()

#         if not salon:

#             return Response(
#                 {
#                     "message": "You have not created a salon yet."
#                 },
#                 status=status.HTTP_404_NOT_FOUND
#             )

#         serializer = self.get_serializer(salon)

#         return Response(
#             serializer.data
#         )


# class SalonCategoryViewSet(viewsets.ModelViewSet):

#     queryset = SalonCategory.objects.filter(
#         is_active=True
#     )

#     serializer_class = SalonCategorySerializer

#     permission_classes = [
#         IsAuthenticated
#     ]

from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework import status

from .models import Salon, SalonCategory
from .serializers import SalonSerializer, SalonCategorySerializer


class SalonViewSet(viewsets.ModelViewSet):

    queryset = Salon.objects.filter(
        is_active=True
    )

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

    def perform_create(self, serializer):

        serializer.save(owner=self.request.user,is_active=True)

    # ---------------------------------
    # Get all salons owned by current user
    # ---------------------------------

    @action(
        detail=False,
        methods=["get"],
        url_path="my-salons"
    )
    def my_salons(self, request):

        salons = Salon.objects.filter(
            owner=request.user,
            is_active=True
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

            from rest_framework.exceptions import PermissionDenied

            raise PermissionDenied(
                "You can only update your own salon."
            )

        serializer.save()


class SalonCategoryViewSet(viewsets.ModelViewSet):

    queryset = SalonCategory.objects.filter(
        is_active=True
    )

    serializer_class = SalonCategorySerializer

    permission_classes = [
        IsAuthenticated
    ]

