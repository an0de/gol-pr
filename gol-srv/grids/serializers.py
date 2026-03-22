from django.contrib.auth.models import User
from rest_framework import serializers

from grids.models import Grid, Rating


class GridSerializer(serializers.HyperlinkedModelSerializer):
    owner = serializers.ReadOnlyField(source="owner.username")
    avg_rating = serializers.FloatField(read_only=True)

    class Meta:
        model = Grid
        fields = (
            "url",
            "id",
            "owner",
            "title",
            "live_cells",
            "width",
            "height",
            "created_at",
            "avg_rating",
        )


class UserSerializer(serializers.HyperlinkedModelSerializer):
    grids = serializers.HyperlinkedRelatedField(
        many=True, view_name="grid-detail", read_only=True
    )

    class Meta:
        model = User
        fields = ("url", "id", "username", "grids")


class RatingSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Rating
        fields = ("id", "grid", "user", "value")
