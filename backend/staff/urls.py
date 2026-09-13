from rest_framework.routers import DefaultRouter

from .views import (
    StaffViewSet,
    WorkingHourViewSet,
    StaffLeaveViewSet,
)


router = DefaultRouter()

router.register(
    "staff",
    StaffViewSet,
    basename="staff"
)

router.register(
    "working-hours",
    WorkingHourViewSet,
    basename="working-hours"
)

router.register(
    "staff-leaves",
    StaffLeaveViewSet,
    basename="staff-leaves"
)

urlpatterns = router.urls