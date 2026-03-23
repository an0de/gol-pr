from django.db import models
from django.core.validators import MaxValueValidator, MinValueValidator


class Grid(models.Model):
    created_at = models.DateTimeField(auto_now_add=True)
    title = models.CharField(max_length=100, blank=True, default="")
    live_cells = models.JSONField(default=list)
    width = models.IntegerField(default=100)
    height = models.IntegerField(default=60)
    owner = models.ForeignKey(
        "auth.User", related_name="grids", on_delete=models.CASCADE
    )

    class Meta:
        ordering = ("created_at",)


class Rating(models.Model):
    grid = models.ForeignKey(Grid, related_name="ratings", on_delete=models.CASCADE)
    user = models.ForeignKey("auth.User", on_delete=models.CASCADE)
    value = models.IntegerField(validators=[MinValueValidator(1), MaxValueValidator(5)])

    class Meta:
        unique_together = ("user", "grid")
