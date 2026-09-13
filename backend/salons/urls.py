from rest_framework.routers import DefaultRouter

from .views import (SalonViewSet,SalonCategoryViewSet)


router = DefaultRouter()

router.register("salons",SalonViewSet,basename="salons")

router.register("categories",SalonCategoryViewSet,basename="categories")

urlpatterns = router.urls