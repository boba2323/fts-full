# https://hakibenita.com/django-group-by-sql

from django.contrib.auth import get_user_model
User = get_user_model()
from fts_app.models import File, Folder, Modification, Tag, ActionLog
from django.db.models import Prefetch, Count
queryset = Modification.objects.select_related('file', 'modified_by')
queryset.values('file_name_at_modification').annotate(total=Count('id'))
queryset.values('file_name_at_modification').annotate(total=Count('file_name_at_modification'))
# <QuerySet [{'file_name_at_modification': 'react11', 'total': 4}, {'file_name_at_modification': 'eas2', 'total': 1}, {'file_name_at_modification': 'reac', 'total': 2}, {'file_name_at_modification': 'file 1', 'total': 1}, {'file_name_at_modification': 'react 66', 'total': 1}, {'file_name_at_modification': 'sfdsf', 'total': 2}, {'file_name_at_modification': 't1dsdsf', 'total': 4}, {'file_name_at_modification': 'new file a2', 'total': 1}, {'file_name_at_modification': 'react666', 'total': 1}, {'file_name_at_modification': 'reacd', 'total': 1}, {'file_name_at_modification': 'pandas', 'total': 3}, {'file_name_at_modification': 'eas', 'total': 1}, {'file_name_at_modification': 'file dsfd', 'total': 1}, {'file_name_at_modification': 'react13', 'total': 3}, {'file_name_at_modification': 'reactapi', 'total': 1}]>
queryset.values('file_name_at_modification').filter(file_name_at_modification="react11").annotate(total=Count('id'))
# <QuerySet [{'file_name_at_modification': 'react11', 'total': 4}]>
