#!/usr/bin/env sh

uv sync
mkdir -p staticfiles

cd app || exit 1
npm ci
npm run build
cd - || exit 1

uv run python manage.py makemigrations
uv run python manage.py migrate

uv run python manage.py collectstatic --noinput
