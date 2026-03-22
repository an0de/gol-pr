from django.urls import include, path
from rest_framework.routers import DefaultRouter
from grids import views

router = DefaultRouter()
router.register(r"grids", views.GridViewSet)
router.register(r"users", views.UserViewSet)
router.register(r"ratings", views.RatingViewSet)

urlpatterns = [path("", include(router.urls))]
