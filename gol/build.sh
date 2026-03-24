#!/usr/bin/env sh

uv sync
rm -rf static staticfiles
mkdir -p static staticfiles

cd app || exit 1
npm ci
npm run build
cd - || exit 1

uv run python manage.py makemigrations
uv run python manage.py migrate

uv run python manage.py collectstatic --noinput
