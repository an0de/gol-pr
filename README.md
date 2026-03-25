# The Game of Life

## Description

This project demonstrates the integration of a React frontend (powered by Vite) with a Django backend, styled with Tailwind CSS.

[Deploy](gol-pr.vercel.app)

[![Maintainability](https://api.codeclimate.com/v1/badges/21bde3bd4aa17bb09123/maintainability)](https://codeclimate.com/github/an0de/frontend-project-44/maintainability)

## Tech Stack

- Frontend: React, Vite, Tailwind CSS, React Router.
- Backend: Python, Django, Django REST Framework, Django Vite.
- Database: PostgreSQL (or SQLite for dev).

## Run

```bash
git clone https://github.com/an0de/gol-pr
cd gol-pr || exit 1
uv sync
rm -rf static staticfiles
mkdir -p static staticfiles
cd app || exit 1
npm ci
npm run build
cd - || exit 1
uv run python manage.py makemigrations
uv run python manage.py migrate
uv run python manage.py populate_db
uv run python manage.py collectstatic --noinput
```

