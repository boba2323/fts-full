from .celery import app
from celery import Celery
from celery.schedules import crontab
# https://docs.celeryq.dev/en/stable/userguide/periodic-tasks.html

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
    sender.add_periodic_task(10.0, saysomething.s(), name='add every 10 say something')

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