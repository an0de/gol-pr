#!/usr/bin/env python

from django.core.management.base import BaseCommand
from django.contrib.auth.models import User
from django.contrib.auth.hashers import make_password
from django.db.utils import IntegrityError
from datetime import datetime as dt
from random import randint, choice, sample
from faker import Faker
from grids.models import Grid, Rating


USERS_COUNT = 20
GRIDS_COUNT = 300
RATINGS_COUNT = 200


def gen_live_cells(width, height):
    return [
        [randint(0, width), randint(0, height)] for _ in range(0, width * height // 2)
    ]


def create_users():
    User.objects.all().delete()
    User.objects.create(
        password=make_password("admin"),
        is_superuser=True,
        username="admin",
        last_name="",
        email="notset@example.com",
        is_staff=True,
        is_active=True,
        date_joined=dt.now(),
        first_name="",
    )
    faker = Faker()
    for _ in range(USERS_COUNT):
        User.objects.create(
            password=make_password(faker.password()),
            is_superuser=False,
            username=faker.user_name(),
            first_name=faker.first_name(),
            last_name=faker.last_name(),
            email="notset@example.com",
            is_staff=False,
            is_active=True,
            date_joined=faker.date_time(),
        )


def create_grids():
    faker = Faker()
    users = User.objects.all()
    Grid.objects.all().delete()
    for _ in range(GRIDS_COUNT):
        width = randint(10, 100)
        height = randint(10, 60)
        Grid.objects.create(
            title=faker.sentence(),
            live_cells=gen_live_cells(width, height),
            width=width,
            height=height,
            owner=choice(users),
        )


def create_ratings():
    Rating.objects.all().delete()
    users = User.objects.all()
    grids = Grid.objects.all()
    grids_sample = sample(list(grids), GRIDS_COUNT // 4)
    users_sample = sample(list(users), USERS_COUNT // 2)
    for _ in range(GRIDS_COUNT):
        try:
            Rating.objects.create(
                grid=choice(grids_sample),
                user=choice(users_sample),
                value=randint(1, 5),
            )
        except IntegrityError:
            pass


class Command(BaseCommand):
    help = "Populate db"

    def handle(self, *args, **options):
        create_users()
        self.stdout.write(self.style.SUCCESS("Users successfully populated!"))
        create_grids()
        self.stdout.write(self.style.SUCCESS("Grids successfully populated!"))
        create_ratings()
        self.stdout.write(self.style.SUCCESS("Ratings successfully populated!"))
