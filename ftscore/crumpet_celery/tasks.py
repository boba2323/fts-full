import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'ftssite.settings')  # need it if we are to import django modules
django.setup()


from .celery import app
from celery import Celery
from celery.schedules import crontab
# https://docs.celeryq.dev/en/stable/userguide/periodic-tasks.html

from permissions.models import AccessCode
from datetime import datetime
import pytz

@app.on_after_configure.connect
def setup_periodic_tasks(sender: Celery, **kwargs):
    # Calls test('hello') every 10 seconds.
    sender.add_periodic_task(10.0, test.s('hello'), name='add every 10')

    # Calls test('hello') every 30 seconds.
    # It uses the same signature of previous task, an explicit name is
    # defined to avoid this task replacing the previous one defined.
    sender.add_periodic_task(30.0, test.s('hello'), name='add every 30')

    # Calls test('world') every 30 seconds
    sender.add_periodic_task(30.0, test.s('world'), expires=10)

    # Executes every Monday morning at 7:30 a.m.
    sender.add_periodic_task(
        crontab(hour=7, minute=30, day_of_week=1),
        test.s('Happy Mondays!'),
    )

    # this would execute after 10 seconds hoepfully
    sender.add_periodic_task(10.0, deactivate_keys.s(), name='deleteaccessexpired')

@app.task
def add(x, y):
    z = x + y
    print(z)

@app.task
def saysomething():
    print("happy holuday")

@app.task
def test(arg):
    print(arg)

a = pytz.timezone("Asia/Kolkata") #else we get a naive vs aware issue
@app.task
def deactivate_keys():
    now = datetime.now(a)
    print("checking accesscodes.....")
    # https://www.sankalpjonna.com/learn-django/running-a-bulk-update-with-django
    # expired_keys = AccessCode.objects.filter(expires_at__lte=now, is_active=True).select_related('team', 'created_by').update(is_active=False)
    # print(expired_keys)
    # if expired_keys:
    #     print("access key deleted")

    expired_keys = AccessCode.objects.filter(expires_at__lte=now).select_related('team', 'created_by')
    print(expired_keys)
    expired_keys.delete()