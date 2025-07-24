from celery import Celery

# https://docs.celeryq.dev/en/stable/getting-started/first-steps-with-celery.html#redis
# https://docs.celeryq.dev/en/stable/getting-started/next-steps.html#project-layout
# https://testdriven.io/courses/django-celery/getting-started/
app = Celery('crumpet_celery',
            #  usually defien the url in settings as celery_broker_url but we keep it herer
             broker='redis://127.0.0.1:6379/0',
             backend='redis://127.0.0.1:6379/0',
             include=['crumpet_celery.tasks'])

# Optional configuration, see the application user guide.
app.conf.update(
    result_expires=3600,
)

app.conf.beat_schedule = {
    'add-every-10-seconds-say-something': {
        'task': 'crumpet_celery.tasks.saysomething',
        'schedule': 10.0,
        'args': ()
    },
}
app.conf.timezone = 'Asia/Kolkata'


if __name__ == '__main__':
    app.start()