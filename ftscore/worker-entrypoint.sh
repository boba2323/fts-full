#!/bin/sh
# https://saasitive.com/tutorial/django-celery-redis-postgres-docker-compose/
until cd /app
do
    echo "Waiting for server volume..."
done

# run a worker :)
celery -A crumpet_celery worker --loglevel=info --concurrency 1 -E
# celery -A crumpet_celery beat --loglevel=info