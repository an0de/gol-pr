from django.contrib.auth.models import User
from django.db.models import Avg, Value
from django.db.models.functions import Coalesce
from rest_framework import permissions, viewsets, filters

from grids.models import Grid, Rating
from grids.permissions import IsOwnerOrReadOnly
from grids.serializers import GridSerializer, UserSerializer, RatingSerializer


class GridViewSet(viewsets.ModelViewSet):
    # queryset = Grid.objects.all()
    queryset = Grid.objects.annotate(
        avg_rating=Coalesce(Avg("ratings__value"), Value(0.0))
    )
    serializer_class = GridSerializer
    permission_classes = (
        permissions.IsAuthenticatedOrReadOnly,
        IsOwnerOrReadOnly,
    )
    filter_backends = [filters.SearchFilter, filters.OrderingFilter]

    search_fields = ["title", "owner", "created_at"]

    ordering_fields = ["created_at", "avg_rating"]
    ordering = ["-created_at"]

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)


class UserViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer


class RatingViewSet(viewsets.ModelViewSet):
    queryset = Rating.objects.all()
    serializer_class = RatingSerializer
    permission_classes = (
        permissions.IsAuthenticatedOrReadOnly,
        IsOwnerOrReadOnly,
    )
