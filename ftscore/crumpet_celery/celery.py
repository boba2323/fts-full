from celery import Celery

# https://docs.celeryq.dev/en/stable/getting-started/first-steps-with-celery.html#redis
# https://docs.celeryq.dev/en/stable/getting-started/next-steps.html#project-layout
# https://testdriven.io/courses/django-celery/getting-started/
app = Celery('crumpet_celery', #name of the module you make
            #  usually defien the url in settings as celery_broker_url but we keep it herer
             broker='redis://127.0.0.1:6379/0', #points to the docker url where redis is running
             backend='redis://127.0.0.1:6379/0',
             include=['crumpet_celery.tasks'])

# Optional configuration, see the application user guide.
app.conf.update(
    result_expires=3600,
)

app.conf.beat_schedule = {
    # the top key is the name that you will assign to a periodic task
    'deleteaccessexpired': {
        'task': 'crumpet_celery.tasks.deactivate_keys', #this is the the periodic task is acting upon. it is fed to the decorator add.task
        'schedule': 10.0, #just the time interval, match the one in the periodic task
        'args': ()
    },
}
app.conf.timezone = 'Asia/Kolkata'


if __name__ == '__main__':
    app.start()