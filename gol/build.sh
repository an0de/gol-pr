#!/usr/bin/env sh

cd app || exit 1
npm ci
npm run build
cd - || exit 1

uv sync
uv run python manage.py collectstatic --noinput
uv run python manage.py makemigrations
uv run python manage.py migrate
