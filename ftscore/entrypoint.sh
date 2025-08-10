#!/bin/sh

if [ "$DATABASE_NAME" = "fts1" ]
then
    echo "Waiting for fts1..."

    while ! nc -z $DATABASE_HOST $DATABASE_PORT; do
      sleep 0.1
    done

    echo "PostgreSQL fts1 started"
fi

python manage.py migrate

exec "$@"