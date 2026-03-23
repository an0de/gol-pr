from django.contrib import admin
from .models import Grid, Rating


@admin.register(Grid)
class GridAdmin(admin.ModelAdmin):
    list_display = ("title", "width", "height", "created_at")
    search_fields = ("title", "width", "height", "created_at")


@admin.register(Rating)
class RatingAdmin(admin.ModelAdmin):
    list_display = ("user", "grid", "value")
    search_fields = ("user", "grid", "value")
