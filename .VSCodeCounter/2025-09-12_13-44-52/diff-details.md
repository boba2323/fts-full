# Diff Details

Date : 2025-09-12 13:44:52

Directory /home/boba2323/crumpet/fts-full/ftscore

Total : 286 files,  26878 codes, 4996 comments, 6725 blanks, all 38599 lines

[Summary](results.md) / [Details](details.md) / [Diff Summary](diff.md) / Diff Details

## Files
| filename | language | code | comment | blank | total |
| :--- | :--- | ---: | ---: | ---: | ---: |
| [ftscore/.dockerignore](/ftscore/.dockerignore) | Ignore | 4 | 1 | 0 | 5 |
| [ftscore/Dockerfile](/ftscore/Dockerfile) | Docker | 39 | 22 | 24 | 85 |
| [ftscore/accounts/\_\_init\_\_.py](/ftscore/accounts/__init__.py) | Python | 0 | 0 | 1 | 1 |
| [ftscore/accounts/admin.py](/ftscore/accounts/admin.py) | Python | 55 | 19 | 16 | 90 |
| [ftscore/accounts/apps.py](/ftscore/accounts/apps.py) | Python | 4 | 0 | 3 | 7 |
| [ftscore/accounts/authenticate.py](/ftscore/accounts/authenticate.py) | Python | 39 | 39 | 15 | 93 |
| [ftscore/accounts/migrations/0001\_initial.py](/ftscore/accounts/migrations/0001_initial.py) | Python | 27 | 1 | 7 | 35 |
| [ftscore/accounts/migrations/0002\_profile.py](/ftscore/accounts/migrations/0002_profile.py) | Python | 19 | 1 | 6 | 26 |
| [ftscore/accounts/migrations/0003\_myuser\_is\_supervisor.py](/ftscore/accounts/migrations/0003_myuser_is_supervisor.py) | Python | 12 | 1 | 6 | 19 |
| [ftscore/accounts/migrations/\_\_init\_\_.py](/ftscore/accounts/migrations/__init__.py) | Python | 0 | 0 | 1 | 1 |
| [ftscore/accounts/models.py](/ftscore/accounts/models.py) | Python | 137 | 20 | 34 | 191 |
| [ftscore/accounts/serialiser.py](/ftscore/accounts/serialiser.py) | Python | 165 | 12 | 36 | 213 |
| [ftscore/accounts/services/\_\_init\_\_.py](/ftscore/accounts/services/__init__.py) | Python | 2 | 1 | 1 | 4 |
| [ftscore/accounts/services/services\_user.py](/ftscore/accounts/services/services_user.py) | Python | 71 | 0 | 13 | 84 |
| [ftscore/accounts/templates/accounts/index.html](/ftscore/accounts/templates/accounts/index.html) | HTML | 1 | 0 | 0 | 1 |
| [ftscore/accounts/tests.py](/ftscore/accounts/tests.py) | Python | 16 | 4 | 8 | 28 |
| [ftscore/accounts/tokenrefeshtest.py](/ftscore/accounts/tokenrefeshtest.py) | Python | 28 | 18 | 12 | 58 |
| [ftscore/accounts/urls.py](/ftscore/accounts/urls.py) | Python | 14 | 0 | 3 | 17 |
| [ftscore/accounts/views.py](/ftscore/accounts/views.py) | Python | 114 | 49 | 27 | 190 |
| [ftscore/boto\_test.py](/ftscore/boto_test.py) | Python | 18 | 10 | 5 | 33 |
| [ftscore/crumpet\_celery/\_\_init\_\_.py](/ftscore/crumpet_celery/__init__.py) | Python | 2 | 0 | 1 | 3 |
| [ftscore/crumpet\_celery/celery.py](/ftscore/crumpet_celery/celery.py) | Python | 23 | 6 | 5 | 34 |
| [ftscore/crumpet\_celery/tasks.py](/ftscore/crumpet_celery/tasks.py) | Python | 38 | 13 | 14 | 65 |
| [ftscore/entrypoint.sh](/ftscore/entrypoint.sh) | Shell Script | 10 | 1 | 5 | 16 |
| [ftscore/fts\_app/\_\_init\_\_.py](/ftscore/fts_app/__init__.py) | Python | 0 | 0 | 1 | 1 |
| [ftscore/fts\_app/admin.py](/ftscore/fts_app/admin.py) | Python | 17 | 1 | 8 | 26 |
| [ftscore/fts\_app/apps.py](/ftscore/fts_app/apps.py) | Python | 4 | 0 | 3 | 7 |
| [ftscore/fts\_app/middleware/jwt\_token\_retrieve.py](/ftscore/fts_app/middleware/jwt_token_retrieve.py) | Python | 15 | 8 | 5 | 28 |
| [ftscore/fts\_app/middleware/refresh\_token.py](/ftscore/fts_app/middleware/refresh_token.py) | Python | 36 | 13 | 12 | 61 |
| [ftscore/fts\_app/migrations/0001\_initial.py](/ftscore/fts_app/migrations/0001_initial.py) | Python | 43 | 1 | 7 | 51 |
| [ftscore/fts\_app/migrations/0002\_folder\_file\_folder.py](/ftscore/fts_app/migrations/0002_folder_file_folder.py) | Python | 27 | 1 | 6 | 34 |
| [ftscore/fts\_app/migrations/0003\_file\_owner\_username\_at\_creation\_actionlog.py](/ftscore/fts_app/migrations/0003_file_owner_username_at_creation_actionlog.py) | Python | 32 | 1 | 6 | 39 |
| [ftscore/fts\_app/migrations/0004\_alter\_file\_tags.py](/ftscore/fts_app/migrations/0004_alter_file_tags.py) | Python | 12 | 1 | 6 | 19 |
| [ftscore/fts\_app/migrations/0005\_remove\_file\_tags.py](/ftscore/fts_app/migrations/0005_remove_file_tags.py) | Python | 11 | 1 | 6 | 18 |
| [ftscore/fts\_app/migrations/0006\_file\_tags.py](/ftscore/fts_app/migrations/0006_file_tags.py) | Python | 12 | 1 | 6 | 19 |
| [ftscore/fts\_app/migrations/0007\_alter\_modification\_method\_and\_more.py](/ftscore/fts_app/migrations/0007_alter_modification_method_and_more.py) | Python | 17 | 1 | 6 | 24 |
| [ftscore/fts\_app/migrations/0008\_file\_access\_code\_folder\_access\_code.py](/ftscore/fts_app/migrations/0008_file_access_code_folder_access_code.py) | Python | 19 | 1 | 6 | 26 |
| [ftscore/fts\_app/migrations/\_\_init\_\_.py](/ftscore/fts_app/migrations/__init__.py) | Python | 0 | 0 | 1 | 1 |
| [ftscore/fts\_app/models.py](/ftscore/fts_app/models.py) | Python | 112 | 42 | 46 | 200 |
| [ftscore/fts\_app/permissions.py](/ftscore/fts_app/permissions.py) | Python | 139 | 22 | 37 | 198 |
| [ftscore/fts\_app/query\_tests.py](/ftscore/fts_app/query_tests.py) | Python | 8 | 3 | 2 | 13 |
| [ftscore/fts\_app/serializers.py](/ftscore/fts_app/serializers.py) | Python | 318 | 83 | 81 | 482 |
| [ftscore/fts\_app/service\_layer/\_\_init\_\_.py](/ftscore/fts_app/service_layer/__init__.py) | Python | 2 | 1 | 1 | 4 |
| [ftscore/fts\_app/service\_layer/services.py](/ftscore/fts_app/service_layer/services.py) | Python | 9 | 0 | 2 | 11 |
| [ftscore/fts\_app/storage\_backends.py](/ftscore/fts_app/storage_backends.py) | Python | 17 | 0 | 7 | 24 |
| [ftscore/fts\_app/templates/fts\_app/index.html](/ftscore/fts_app/templates/fts_app/index.html) | HTML | 1 | 0 | 0 | 1 |
| [ftscore/fts\_app/templates/fts\_app/listtag.html](/ftscore/fts_app/templates/fts_app/listtag.html) | HTML | 4 | 0 | 3 | 7 |
| [ftscore/fts\_app/templates/fts\_app/tag.html](/ftscore/fts_app/templates/fts_app/tag.html) | HTML | 1 | 0 | 0 | 1 |
| [ftscore/fts\_app/tests.py](/ftscore/fts_app/tests.py) | Python | 5 | 2 | 5 | 12 |
| [ftscore/fts\_app/urls.py](/ftscore/fts_app/urls.py) | Python | 8 | 4 | 4 | 16 |
| [ftscore/fts\_app/views.py](/ftscore/fts_app/views.py) | Python | 150 | 63 | 57 | 270 |
| [ftscore/ftssite/\_\_init\_\_.py](/ftscore/ftssite/__init__.py) | Python | 0 | 0 | 1 | 1 |
| [ftscore/ftssite/asgi.py](/ftscore/ftssite/asgi.py) | Python | 4 | 8 | 5 | 17 |
| [ftscore/ftssite/settings.py](/ftscore/ftssite/settings.py) | Python | 232 | 76 | 75 | 383 |
| [ftscore/ftssite/storage\_backends.py](/ftscore/ftssite/storage_backends.py) | Python | 17 | 0 | 7 | 24 |
| [ftscore/ftssite/urls.py](/ftscore/ftssite/urls.py) | Python | 30 | 33 | 14 | 77 |
| [ftscore/ftssite/wsgi.py](/ftscore/ftssite/wsgi.py) | Python | 4 | 8 | 5 | 17 |
| [ftscore/manage.py](/ftscore/manage.py) | Python | 15 | 3 | 5 | 23 |
| [ftscore/permissions/\_\_init\_\_.py](/ftscore/permissions/__init__.py) | Python | 0 | 0 | 1 | 1 |
| [ftscore/permissions/admin.py](/ftscore/permissions/admin.py) | Python | 1 | 1 | 2 | 4 |
| [ftscore/permissions/apps.py](/ftscore/permissions/apps.py) | Python | 4 | 0 | 3 | 7 |
| [ftscore/permissions/migrations/0001\_initial.py](/ftscore/permissions/migrations/0001_initial.py) | Python | 50 | 1 | 7 | 58 |
| [ftscore/permissions/migrations/0002\_alter\_teammembership\_unique\_together\_and\_more.py](/ftscore/permissions/migrations/0002_alter_teammembership_unique_together_and_more.py) | Python | 17 | 1 | 6 | 24 |
| [ftscore/permissions/migrations/0003\_alter\_team\_leader\_and\_more.py](/ftscore/permissions/migrations/0003_alter_team_leader_and_more.py) | Python | 20 | 1 | 6 | 27 |
| [ftscore/permissions/migrations/0004\_rename\_workers\_team\_membership\_users\_and\_more.py](/ftscore/permissions/migrations/0004_rename_workers_team_membership_users_and_more.py) | Python | 31 | 1 | 6 | 38 |
| [ftscore/permissions/migrations/0005\_alter\_accesscode\_team\_accesscode\_one\_code\_per\_team.py](/ftscore/permissions/migrations/0005_alter_accesscode_team_accesscode_one_code_per_team.py) | Python | 19 | 1 | 6 | 26 |
| [ftscore/permissions/migrations/0006\_alter\_teammembership\_one\_team\_per\_user\_and\_more.py](/ftscore/permissions/migrations/0006_alter_teammembership_one_team_per_user_and_more.py) | Python | 19 | 1 | 6 | 26 |
| [ftscore/permissions/migrations/0007\_accesscode\_masked\_id.py](/ftscore/permissions/migrations/0007_accesscode_masked_id.py) | Python | 12 | 1 | 6 | 19 |
| [ftscore/permissions/migrations/0008\_team\_working\_files.py](/ftscore/permissions/migrations/0008_team_working_files.py) | Python | 14 | 1 | 6 | 21 |
| [ftscore/permissions/migrations/0009\_alter\_accesscode\_team.py](/ftscore/permissions/migrations/0009_alter_accesscode_team.py) | Python | 13 | 1 | 6 | 20 |
| [ftscore/permissions/migrations/\_\_init\_\_.py](/ftscore/permissions/migrations/__init__.py) | Python | 0 | 0 | 1 | 1 |
| [ftscore/permissions/models.py](/ftscore/permissions/models.py) | Python | 274 | 149 | 81 | 504 |
| [ftscore/permissions/serializers.py](/ftscore/permissions/serializers.py) | Python | 180 | 50 | 38 | 268 |
| [ftscore/permissions/service\_layer/\_\_init\_\_.py](/ftscore/permissions/service_layer/__init__.py) | Python | 2 | 1 | 1 | 4 |
| [ftscore/permissions/service\_layer/team\_service.py](/ftscore/permissions/service_layer/team_service.py) | Python | 46 | 9 | 6 | 61 |
| [ftscore/permissions/special\_permissions.py](/ftscore/permissions/special_permissions.py) | Python | 125 | 35 | 17 | 177 |
| [ftscore/permissions/tests.py](/ftscore/permissions/tests.py) | Python | 1 | 6 | 7 | 14 |
| [ftscore/permissions/testview.py](/ftscore/permissions/testview.py) | Python | 9 | 0 | 3 | 12 |
| [ftscore/permissions/urls.py](/ftscore/permissions/urls.py) | Python | 7 | 5 | 4 | 16 |
| [ftscore/permissions/views.py](/ftscore/permissions/views.py) | Python | 102 | 27 | 26 | 155 |
| [ftscore/requirements.txt](/ftscore/requirements.txt) | pip requirements | 55 | 0 | 1 | 56 |
| [ftscore/staticfiles/admin/css/autocomplete.css](/ftscore/staticfiles/admin/css/autocomplete.css) | PostCSS | 230 | 0 | 50 | 280 |
| [ftscore/staticfiles/admin/css/base.css](/ftscore/staticfiles/admin/css/base.css) | PostCSS | 935 | 32 | 217 | 1,184 |
| [ftscore/staticfiles/admin/css/changelists.css](/ftscore/staticfiles/admin/css/changelists.css) | PostCSS | 273 | 8 | 63 | 344 |
| [ftscore/staticfiles/admin/css/dark\_mode.css](/ftscore/staticfiles/admin/css/dark_mode.css) | PostCSS | 96 | 6 | 29 | 131 |
| [ftscore/staticfiles/admin/css/dashboard.css](/ftscore/staticfiles/admin/css/dashboard.css) | PostCSS | 21 | 2 | 7 | 30 |
| [ftscore/staticfiles/admin/css/forms.css](/ftscore/staticfiles/admin/css/forms.css) | PostCSS | 387 | 12 | 100 | 499 |
| [ftscore/staticfiles/admin/css/login.css](/ftscore/staticfiles/admin/css/login.css) | PostCSS | 49 | 1 | 12 | 62 |
| [ftscore/staticfiles/admin/css/nav\_sidebar.css](/ftscore/staticfiles/admin/css/nav_sidebar.css) | PostCSS | 125 | 0 | 26 | 151 |
| [ftscore/staticfiles/admin/css/responsive.css](/ftscore/staticfiles/admin/css/responsive.css) | PostCSS | 677 | 31 | 201 | 909 |
| [ftscore/staticfiles/admin/css/responsive\_rtl.css](/ftscore/staticfiles/admin/css/responsive_rtl.css) | PostCSS | 70 | 2 | 18 | 90 |
| [ftscore/staticfiles/admin/css/rtl.css](/ftscore/staticfiles/admin/css/rtl.css) | PostCSS | 223 | 8 | 63 | 294 |
| [ftscore/staticfiles/admin/css/unusable\_password\_field.css](/ftscore/staticfiles/admin/css/unusable_password_field.css) | PostCSS | 13 | 3 | 4 | 20 |
| [ftscore/staticfiles/admin/css/vendor/select2/LICENSE-SELECT2.md](/ftscore/staticfiles/admin/css/vendor/select2/LICENSE-SELECT2.md) | Markdown | 17 | 0 | 5 | 22 |
| [ftscore/staticfiles/admin/css/vendor/select2/select2.css](/ftscore/staticfiles/admin/css/vendor/select2/select2.css) | PostCSS | 425 | 0 | 57 | 482 |
| [ftscore/staticfiles/admin/css/vendor/select2/select2.min.css](/ftscore/staticfiles/admin/css/vendor/select2/select2.min.css) | PostCSS | 1 | 0 | 1 | 2 |
| [ftscore/staticfiles/admin/css/widgets.css](/ftscore/staticfiles/admin/css/widgets.css) | PostCSS | 503 | 9 | 102 | 614 |
| [ftscore/staticfiles/admin/img/calendar-icons.svg](/ftscore/staticfiles/admin/img/calendar-icons.svg) | XML | 63 | 0 | 1 | 64 |
| [ftscore/staticfiles/admin/img/gis/move\_vertex\_off.svg](/ftscore/staticfiles/admin/img/gis/move_vertex_off.svg) | XML | 1 | 0 | 0 | 1 |
| [ftscore/staticfiles/admin/img/gis/move\_vertex\_on.svg](/ftscore/staticfiles/admin/img/gis/move_vertex_on.svg) | XML | 1 | 0 | 0 | 1 |
| [ftscore/staticfiles/admin/img/icon-addlink.svg](/ftscore/staticfiles/admin/img/icon-addlink.svg) | XML | 3 | 0 | 1 | 4 |
| [ftscore/staticfiles/admin/img/icon-alert.svg](/ftscore/staticfiles/admin/img/icon-alert.svg) | XML | 3 | 0 | 1 | 4 |
| [ftscore/staticfiles/admin/img/icon-calendar.svg](/ftscore/staticfiles/admin/img/icon-calendar.svg) | XML | 9 | 0 | 1 | 10 |
| [ftscore/staticfiles/admin/img/icon-changelink.svg](/ftscore/staticfiles/admin/img/icon-changelink.svg) | XML | 3 | 0 | 1 | 4 |
| [ftscore/staticfiles/admin/img/icon-clock.svg](/ftscore/staticfiles/admin/img/icon-clock.svg) | XML | 9 | 0 | 1 | 10 |
| [ftscore/staticfiles/admin/img/icon-deletelink.svg](/ftscore/staticfiles/admin/img/icon-deletelink.svg) | XML | 3 | 0 | 1 | 4 |
| [ftscore/staticfiles/admin/img/icon-hidelink.svg](/ftscore/staticfiles/admin/img/icon-hidelink.svg) | XML | 3 | 0 | 1 | 4 |
| [ftscore/staticfiles/admin/img/icon-no.svg](/ftscore/staticfiles/admin/img/icon-no.svg) | XML | 3 | 0 | 1 | 4 |
| [ftscore/staticfiles/admin/img/icon-unknown-alt.svg](/ftscore/staticfiles/admin/img/icon-unknown-alt.svg) | XML | 3 | 0 | 1 | 4 |
| [ftscore/staticfiles/admin/img/icon-unknown.svg](/ftscore/staticfiles/admin/img/icon-unknown.svg) | XML | 3 | 0 | 1 | 4 |
| [ftscore/staticfiles/admin/img/icon-viewlink.svg](/ftscore/staticfiles/admin/img/icon-viewlink.svg) | XML | 3 | 0 | 1 | 4 |
| [ftscore/staticfiles/admin/img/icon-yes.svg](/ftscore/staticfiles/admin/img/icon-yes.svg) | XML | 3 | 0 | 1 | 4 |
| [ftscore/staticfiles/admin/img/inline-delete.svg](/ftscore/staticfiles/admin/img/inline-delete.svg) | XML | 3 | 0 | 1 | 4 |
| [ftscore/staticfiles/admin/img/search.svg](/ftscore/staticfiles/admin/img/search.svg) | XML | 3 | 0 | 1 | 4 |
| [ftscore/staticfiles/admin/img/selector-icons.svg](/ftscore/staticfiles/admin/img/selector-icons.svg) | XML | 34 | 0 | 1 | 35 |
| [ftscore/staticfiles/admin/img/sorting-icons.svg](/ftscore/staticfiles/admin/img/sorting-icons.svg) | XML | 19 | 0 | 1 | 20 |
| [ftscore/staticfiles/admin/img/tooltag-add.svg](/ftscore/staticfiles/admin/img/tooltag-add.svg) | XML | 3 | 0 | 1 | 4 |
| [ftscore/staticfiles/admin/img/tooltag-arrowright.svg](/ftscore/staticfiles/admin/img/tooltag-arrowright.svg) | XML | 3 | 0 | 1 | 4 |
| [ftscore/staticfiles/admin/js/SelectBox.js](/ftscore/staticfiles/admin/js/SelectBox.js) | JavaScript | 111 | 5 | 1 | 117 |
| [ftscore/staticfiles/admin/js/SelectFilter2.js](/ftscore/staticfiles/admin/js/SelectFilter2.js) | JavaScript | 258 | 28 | 22 | 308 |
| [ftscore/staticfiles/admin/js/actions.js](/ftscore/staticfiles/admin/js/actions.js) | JavaScript | 175 | 9 | 21 | 205 |
| [ftscore/staticfiles/admin/js/admin/DateTimeShortcuts.js](/ftscore/staticfiles/admin/js/admin/DateTimeShortcuts.js) | JavaScript | 317 | 65 | 27 | 409 |
| [ftscore/staticfiles/admin/js/admin/RelatedObjectLookups.js](/ftscore/staticfiles/admin/js/admin/RelatedObjectLookups.js) | JavaScript | 216 | 14 | 23 | 253 |
| [ftscore/staticfiles/admin/js/autocomplete.js](/ftscore/staticfiles/admin/js/autocomplete.js) | JavaScript | 28 | 2 | 4 | 34 |
| [ftscore/staticfiles/admin/js/calendar.js](/ftscore/staticfiles/admin/js/calendar.js) | JavaScript | 196 | 28 | 16 | 240 |
| [ftscore/staticfiles/admin/js/cancel.js](/ftscore/staticfiles/admin/js/cancel.js) | JavaScript | 24 | 3 | 3 | 30 |
| [ftscore/staticfiles/admin/js/change\_form.js](/ftscore/staticfiles/admin/js/change_form.js) | JavaScript | 14 | 2 | 1 | 17 |
| [ftscore/staticfiles/admin/js/core.js](/ftscore/staticfiles/admin/js/core.js) | JavaScript | 148 | 19 | 18 | 185 |
| [ftscore/staticfiles/admin/js/filters.js](/ftscore/staticfiles/admin/js/filters.js) | JavaScript | 20 | 6 | 5 | 31 |
| [ftscore/staticfiles/admin/js/inlines.js](/ftscore/staticfiles/admin/js/inlines.js) | JavaScript | 272 | 61 | 27 | 360 |
| [ftscore/staticfiles/admin/js/jquery.init.js](/ftscore/staticfiles/admin/js/jquery.init.js) | JavaScript | 2 | 6 | 1 | 9 |
| [ftscore/staticfiles/admin/js/nav\_sidebar.js](/ftscore/staticfiles/admin/js/nav_sidebar.js) | JavaScript | 73 | 1 | 6 | 80 |
| [ftscore/staticfiles/admin/js/popup\_response.js](/ftscore/staticfiles/admin/js/popup_response.js) | JavaScript | 15 | 0 | 1 | 16 |
| [ftscore/staticfiles/admin/js/prepopulate.js](/ftscore/staticfiles/admin/js/prepopulate.js) | JavaScript | 29 | 10 | 5 | 44 |
| [ftscore/staticfiles/admin/js/prepopulate\_init.js](/ftscore/staticfiles/admin/js/prepopulate_init.js) | JavaScript | 15 | 0 | 1 | 16 |
| [ftscore/staticfiles/admin/js/theme.js](/ftscore/staticfiles/admin/js/theme.js) | JavaScript | 43 | 3 | 6 | 52 |
| [ftscore/staticfiles/admin/js/unusable\_password\_field.js](/ftscore/staticfiles/admin/js/unusable_password_field.js) | JavaScript | 24 | 5 | 1 | 30 |
| [ftscore/staticfiles/admin/js/urlify.js](/ftscore/staticfiles/admin/js/urlify.js) | JavaScript | 159 | 5 | 6 | 170 |
| [ftscore/staticfiles/admin/js/vendor/jquery/jquery.js](/ftscore/staticfiles/admin/js/vendor/jquery/jquery.js) | JavaScript | 6,767 | 1,887 | 2,063 | 10,717 |
| [ftscore/staticfiles/admin/js/vendor/jquery/jquery.min.js](/ftscore/staticfiles/admin/js/vendor/jquery/jquery.min.js) | JavaScript | 1 | 1 | 1 | 3 |
| [ftscore/staticfiles/admin/js/vendor/select2/LICENSE.md](/ftscore/staticfiles/admin/js/vendor/select2/LICENSE.md) | Markdown | 17 | 0 | 5 | 22 |
| [ftscore/staticfiles/admin/js/vendor/select2/i18n/af.js](/ftscore/staticfiles/admin/js/vendor/select2/i18n/af.js) | JavaScript | 1 | 1 | 1 | 3 |
| [ftscore/staticfiles/admin/js/vendor/select2/i18n/ar.js](/ftscore/staticfiles/admin/js/vendor/select2/i18n/ar.js) | JavaScript | 1 | 1 | 1 | 3 |
| [ftscore/staticfiles/admin/js/vendor/select2/i18n/az.js](/ftscore/staticfiles/admin/js/vendor/select2/i18n/az.js) | JavaScript | 1 | 1 | 1 | 3 |
| [ftscore/staticfiles/admin/js/vendor/select2/i18n/bg.js](/ftscore/staticfiles/admin/js/vendor/select2/i18n/bg.js) | JavaScript | 1 | 1 | 1 | 3 |
| [ftscore/staticfiles/admin/js/vendor/select2/i18n/bn.js](/ftscore/staticfiles/admin/js/vendor/select2/i18n/bn.js) | JavaScript | 1 | 1 | 1 | 3 |
| [ftscore/staticfiles/admin/js/vendor/select2/i18n/bs.js](/ftscore/staticfiles/admin/js/vendor/select2/i18n/bs.js) | JavaScript | 1 | 1 | 1 | 3 |
| [ftscore/staticfiles/admin/js/vendor/select2/i18n/ca.js](/ftscore/staticfiles/admin/js/vendor/select2/i18n/ca.js) | JavaScript | 1 | 1 | 1 | 3 |
| [ftscore/staticfiles/admin/js/vendor/select2/i18n/cs.js](/ftscore/staticfiles/admin/js/vendor/select2/i18n/cs.js) | JavaScript | 1 | 1 | 1 | 3 |
| [ftscore/staticfiles/admin/js/vendor/select2/i18n/da.js](/ftscore/staticfiles/admin/js/vendor/select2/i18n/da.js) | JavaScript | 1 | 1 | 1 | 3 |
| [ftscore/staticfiles/admin/js/vendor/select2/i18n/de.js](/ftscore/staticfiles/admin/js/vendor/select2/i18n/de.js) | JavaScript | 1 | 1 | 1 | 3 |
| [ftscore/staticfiles/admin/js/vendor/select2/i18n/dsb.js](/ftscore/staticfiles/admin/js/vendor/select2/i18n/dsb.js) | JavaScript | 1 | 1 | 1 | 3 |
| [ftscore/staticfiles/admin/js/vendor/select2/i18n/el.js](/ftscore/staticfiles/admin/js/vendor/select2/i18n/el.js) | JavaScript | 1 | 1 | 1 | 3 |
| [ftscore/staticfiles/admin/js/vendor/select2/i18n/en.js](/ftscore/staticfiles/admin/js/vendor/select2/i18n/en.js) | JavaScript | 1 | 1 | 1 | 3 |
| [ftscore/staticfiles/admin/js/vendor/select2/i18n/es.js](/ftscore/staticfiles/admin/js/vendor/select2/i18n/es.js) | JavaScript | 1 | 1 | 1 | 3 |
| [ftscore/staticfiles/admin/js/vendor/select2/i18n/et.js](/ftscore/staticfiles/admin/js/vendor/select2/i18n/et.js) | JavaScript | 1 | 1 | 1 | 3 |
| [ftscore/staticfiles/admin/js/vendor/select2/i18n/eu.js](/ftscore/staticfiles/admin/js/vendor/select2/i18n/eu.js) | JavaScript | 1 | 1 | 1 | 3 |
| [ftscore/staticfiles/admin/js/vendor/select2/i18n/fa.js](/ftscore/staticfiles/admin/js/vendor/select2/i18n/fa.js) | JavaScript | 1 | 1 | 1 | 3 |
| [ftscore/staticfiles/admin/js/vendor/select2/i18n/fi.js](/ftscore/staticfiles/admin/js/vendor/select2/i18n/fi.js) | JavaScript | 1 | 1 | 1 | 3 |
| [ftscore/staticfiles/admin/js/vendor/select2/i18n/fr.js](/ftscore/staticfiles/admin/js/vendor/select2/i18n/fr.js) | JavaScript | 1 | 1 | 1 | 3 |
| [ftscore/staticfiles/admin/js/vendor/select2/i18n/gl.js](/ftscore/staticfiles/admin/js/vendor/select2/i18n/gl.js) | JavaScript | 1 | 1 | 1 | 3 |
| [ftscore/staticfiles/admin/js/vendor/select2/i18n/he.js](/ftscore/staticfiles/admin/js/vendor/select2/i18n/he.js) | JavaScript | 1 | 1 | 1 | 3 |
| [ftscore/staticfiles/admin/js/vendor/select2/i18n/hi.js](/ftscore/staticfiles/admin/js/vendor/select2/i18n/hi.js) | JavaScript | 1 | 1 | 1 | 3 |
| [ftscore/staticfiles/admin/js/vendor/select2/i18n/hr.js](/ftscore/staticfiles/admin/js/vendor/select2/i18n/hr.js) | JavaScript | 1 | 1 | 1 | 3 |
| [ftscore/staticfiles/admin/js/vendor/select2/i18n/hsb.js](/ftscore/staticfiles/admin/js/vendor/select2/i18n/hsb.js) | JavaScript | 1 | 1 | 1 | 3 |
| [ftscore/staticfiles/admin/js/vendor/select2/i18n/hu.js](/ftscore/staticfiles/admin/js/vendor/select2/i18n/hu.js) | JavaScript | 1 | 1 | 1 | 3 |
| [ftscore/staticfiles/admin/js/vendor/select2/i18n/hy.js](/ftscore/staticfiles/admin/js/vendor/select2/i18n/hy.js) | JavaScript | 1 | 1 | 1 | 3 |
| [ftscore/staticfiles/admin/js/vendor/select2/i18n/id.js](/ftscore/staticfiles/admin/js/vendor/select2/i18n/id.js) | JavaScript | 1 | 1 | 1 | 3 |
| [ftscore/staticfiles/admin/js/vendor/select2/i18n/is.js](/ftscore/staticfiles/admin/js/vendor/select2/i18n/is.js) | JavaScript | 1 | 1 | 1 | 3 |
| [ftscore/staticfiles/admin/js/vendor/select2/i18n/it.js](/ftscore/staticfiles/admin/js/vendor/select2/i18n/it.js) | JavaScript | 1 | 1 | 1 | 3 |
| [ftscore/staticfiles/admin/js/vendor/select2/i18n/ja.js](/ftscore/staticfiles/admin/js/vendor/select2/i18n/ja.js) | JavaScript | 1 | 1 | 1 | 3 |
| [ftscore/staticfiles/admin/js/vendor/select2/i18n/ka.js](/ftscore/staticfiles/admin/js/vendor/select2/i18n/ka.js) | JavaScript | 1 | 1 | 1 | 3 |
| [ftscore/staticfiles/admin/js/vendor/select2/i18n/km.js](/ftscore/staticfiles/admin/js/vendor/select2/i18n/km.js) | JavaScript | 1 | 1 | 1 | 3 |
| [ftscore/staticfiles/admin/js/vendor/select2/i18n/ko.js](/ftscore/staticfiles/admin/js/vendor/select2/i18n/ko.js) | JavaScript | 1 | 1 | 1 | 3 |
| [ftscore/staticfiles/admin/js/vendor/select2/i18n/lt.js](/ftscore/staticfiles/admin/js/vendor/select2/i18n/lt.js) | JavaScript | 1 | 1 | 1 | 3 |
| [ftscore/staticfiles/admin/js/vendor/select2/i18n/lv.js](/ftscore/staticfiles/admin/js/vendor/select2/i18n/lv.js) | JavaScript | 1 | 1 | 1 | 3 |
| [ftscore/staticfiles/admin/js/vendor/select2/i18n/mk.js](/ftscore/staticfiles/admin/js/vendor/select2/i18n/mk.js) | JavaScript | 1 | 1 | 1 | 3 |
| [ftscore/staticfiles/admin/js/vendor/select2/i18n/ms.js](/ftscore/staticfiles/admin/js/vendor/select2/i18n/ms.js) | JavaScript | 1 | 1 | 1 | 3 |
| [ftscore/staticfiles/admin/js/vendor/select2/i18n/nb.js](/ftscore/staticfiles/admin/js/vendor/select2/i18n/nb.js) | JavaScript | 1 | 1 | 1 | 3 |
| [ftscore/staticfiles/admin/js/vendor/select2/i18n/ne.js](/ftscore/staticfiles/admin/js/vendor/select2/i18n/ne.js) | JavaScript | 1 | 1 | 1 | 3 |
| [ftscore/staticfiles/admin/js/vendor/select2/i18n/nl.js](/ftscore/staticfiles/admin/js/vendor/select2/i18n/nl.js) | JavaScript | 1 | 1 | 1 | 3 |
| [ftscore/staticfiles/admin/js/vendor/select2/i18n/pl.js](/ftscore/staticfiles/admin/js/vendor/select2/i18n/pl.js) | JavaScript | 1 | 1 | 1 | 3 |
| [ftscore/staticfiles/admin/js/vendor/select2/i18n/ps.js](/ftscore/staticfiles/admin/js/vendor/select2/i18n/ps.js) | JavaScript | 1 | 1 | 1 | 3 |
| [ftscore/staticfiles/admin/js/vendor/select2/i18n/pt-BR.js](/ftscore/staticfiles/admin/js/vendor/select2/i18n/pt-BR.js) | JavaScript | 1 | 1 | 1 | 3 |
| [ftscore/staticfiles/admin/js/vendor/select2/i18n/pt.js](/ftscore/staticfiles/admin/js/vendor/select2/i18n/pt.js) | JavaScript | 1 | 1 | 1 | 3 |
| [ftscore/staticfiles/admin/js/vendor/select2/i18n/ro.js](/ftscore/staticfiles/admin/js/vendor/select2/i18n/ro.js) | JavaScript | 1 | 1 | 1 | 3 |
| [ftscore/staticfiles/admin/js/vendor/select2/i18n/ru.js](/ftscore/staticfiles/admin/js/vendor/select2/i18n/ru.js) | JavaScript | 1 | 1 | 1 | 3 |
| [ftscore/staticfiles/admin/js/vendor/select2/i18n/sk.js](/ftscore/staticfiles/admin/js/vendor/select2/i18n/sk.js) | JavaScript | 1 | 1 | 1 | 3 |
| [ftscore/staticfiles/admin/js/vendor/select2/i18n/sl.js](/ftscore/staticfiles/admin/js/vendor/select2/i18n/sl.js) | JavaScript | 1 | 1 | 1 | 3 |
| [ftscore/staticfiles/admin/js/vendor/select2/i18n/sq.js](/ftscore/staticfiles/admin/js/vendor/select2/i18n/sq.js) | JavaScript | 1 | 1 | 1 | 3 |
| [ftscore/staticfiles/admin/js/vendor/select2/i18n/sr-Cyrl.js](/ftscore/staticfiles/admin/js/vendor/select2/i18n/sr-Cyrl.js) | JavaScript | 1 | 1 | 1 | 3 |
| [ftscore/staticfiles/admin/js/vendor/select2/i18n/sr.js](/ftscore/staticfiles/admin/js/vendor/select2/i18n/sr.js) | JavaScript | 1 | 1 | 1 | 3 |
| [ftscore/staticfiles/admin/js/vendor/select2/i18n/sv.js](/ftscore/staticfiles/admin/js/vendor/select2/i18n/sv.js) | JavaScript | 1 | 1 | 1 | 3 |
| [ftscore/staticfiles/admin/js/vendor/select2/i18n/th.js](/ftscore/staticfiles/admin/js/vendor/select2/i18n/th.js) | JavaScript | 1 | 1 | 1 | 3 |
| [ftscore/staticfiles/admin/js/vendor/select2/i18n/tk.js](/ftscore/staticfiles/admin/js/vendor/select2/i18n/tk.js) | JavaScript | 1 | 1 | 1 | 3 |
| [ftscore/staticfiles/admin/js/vendor/select2/i18n/tr.js](/ftscore/staticfiles/admin/js/vendor/select2/i18n/tr.js) | JavaScript | 1 | 1 | 1 | 3 |
| [ftscore/staticfiles/admin/js/vendor/select2/i18n/uk.js](/ftscore/staticfiles/admin/js/vendor/select2/i18n/uk.js) | JavaScript | 1 | 1 | 1 | 3 |
| [ftscore/staticfiles/admin/js/vendor/select2/i18n/vi.js](/ftscore/staticfiles/admin/js/vendor/select2/i18n/vi.js) | JavaScript | 1 | 1 | 1 | 3 |
| [ftscore/staticfiles/admin/js/vendor/select2/i18n/zh-CN.js](/ftscore/staticfiles/admin/js/vendor/select2/i18n/zh-CN.js) | JavaScript | 1 | 1 | 1 | 3 |
| [ftscore/staticfiles/admin/js/vendor/select2/i18n/zh-TW.js](/ftscore/staticfiles/admin/js/vendor/select2/i18n/zh-TW.js) | JavaScript | 1 | 1 | 1 | 3 |
| [ftscore/staticfiles/admin/js/vendor/select2/select2.full.js](/ftscore/staticfiles/admin/js/vendor/select2/select2.full.js) | JavaScript | 5,102 | 384 | 1,335 | 6,821 |
| [ftscore/staticfiles/admin/js/vendor/select2/select2.full.min.js](/ftscore/staticfiles/admin/js/vendor/select2/select2.full.min.js) | JavaScript | 1 | 1 | 0 | 2 |
| [ftscore/staticfiles/admin/js/vendor/xregexp/xregexp.js](/ftscore/staticfiles/admin/js/vendor/xregexp/xregexp.js) | JavaScript | 3,817 | 1,303 | 1,007 | 6,127 |
| [ftscore/staticfiles/admin/js/vendor/xregexp/xregexp.min.js](/ftscore/staticfiles/admin/js/vendor/xregexp/xregexp.min.js) | JavaScript | 4 | 13 | 1 | 18 |
| [ftscore/staticfiles/debug\_toolbar/css/print.css](/ftscore/staticfiles/debug_toolbar/css/print.css) | PostCSS | 3 | 0 | 1 | 4 |
| [ftscore/staticfiles/debug\_toolbar/css/toolbar.css](/ftscore/staticfiles/debug_toolbar/css/toolbar.css) | PostCSS | 870 | 16 | 71 | 957 |
| [ftscore/staticfiles/debug\_toolbar/js/history.js](/ftscore/staticfiles/debug_toolbar/js/history.js) | JavaScript | 89 | 6 | 11 | 106 |
| [ftscore/staticfiles/debug\_toolbar/js/redirect.js](/ftscore/staticfiles/debug_toolbar/js/redirect.js) | JavaScript | 1 | 0 | 1 | 2 |
| [ftscore/staticfiles/debug\_toolbar/js/timer.js](/ftscore/staticfiles/debug_toolbar/js/timer.js) | JavaScript | 72 | 7 | 4 | 83 |
| [ftscore/staticfiles/debug\_toolbar/js/toolbar.js](/ftscore/staticfiles/debug_toolbar/js/toolbar.js) | JavaScript | 345 | 24 | 30 | 399 |
| [ftscore/staticfiles/debug\_toolbar/js/utils.js](/ftscore/staticfiles/debug_toolbar/js/utils.js) | JavaScript | 123 | 14 | 8 | 145 |
| [ftscore/staticfiles/guardian/img/icon-no.svg](/ftscore/staticfiles/guardian/img/icon-no.svg) | XML | 3 | 0 | 1 | 4 |
| [ftscore/staticfiles/guardian/img/icon-yes.svg](/ftscore/staticfiles/guardian/img/icon-yes.svg) | XML | 3 | 0 | 1 | 4 |
| [ftscore/staticfiles/rest\_framework/css/bootstrap-theme.min.css](/ftscore/staticfiles/rest_framework/css/bootstrap-theme.min.css) | PostCSS | 1 | 5 | 0 | 6 |
| [ftscore/staticfiles/rest\_framework/css/bootstrap-tweaks.css](/ftscore/staticfiles/rest_framework/css/bootstrap-tweaks.css) | PostCSS | 177 | 15 | 46 | 238 |
| [ftscore/staticfiles/rest\_framework/css/bootstrap.min.css](/ftscore/staticfiles/rest_framework/css/bootstrap.min.css) | PostCSS | 1 | 5 | 0 | 6 |
| [ftscore/staticfiles/rest\_framework/css/default.css](/ftscore/staticfiles/rest_framework/css/default.css) | PostCSS | 62 | 3 | 18 | 83 |
| [ftscore/staticfiles/rest\_framework/css/font-awesome-4.0.3.css](/ftscore/staticfiles/rest_framework/css/font-awesome-4.0.3.css) | PostCSS | 1,329 | 9 | 1 | 1,339 |
| [ftscore/staticfiles/rest\_framework/css/prettify.css](/ftscore/staticfiles/rest_framework/css/prettify.css) | PostCSS | 27 | 1 | 2 | 30 |
| [ftscore/staticfiles/rest\_framework/docs/css/base.css](/ftscore/staticfiles/rest_framework/docs/css/base.css) | PostCSS | 291 | 4 | 65 | 360 |
| [ftscore/staticfiles/rest\_framework/docs/css/highlight.css](/ftscore/staticfiles/rest_framework/docs/css/highlight.css) | PostCSS | 101 | 6 | 19 | 126 |
| [ftscore/staticfiles/rest\_framework/docs/css/jquery.json-view.min.css](/ftscore/staticfiles/rest_framework/docs/css/jquery.json-view.min.css) | PostCSS | 11 | 0 | 0 | 11 |
| [ftscore/staticfiles/rest\_framework/docs/js/api.js](/ftscore/staticfiles/rest_framework/docs/js/api.js) | JavaScript | 259 | 20 | 37 | 316 |
| [ftscore/staticfiles/rest\_framework/docs/js/highlight.pack.js](/ftscore/staticfiles/rest_framework/docs/js/highlight.pack.js) | JavaScript | 2 | 0 | 0 | 2 |
| [ftscore/staticfiles/rest\_framework/docs/js/jquery.json-view.min.js](/ftscore/staticfiles/rest_framework/docs/js/jquery.json-view.min.js) | JavaScript | 1 | 6 | 0 | 7 |
| [ftscore/staticfiles/rest\_framework/fonts/fontawesome-webfont.svg](/ftscore/staticfiles/rest_framework/fonts/fontawesome-webfont.svg) | XML | 414 | 0 | 1 | 415 |
| [ftscore/staticfiles/rest\_framework/fonts/glyphicons-halflings-regular.svg](/ftscore/staticfiles/rest_framework/fonts/glyphicons-halflings-regular.svg) | XML | 288 | 0 | 1 | 289 |
| [ftscore/staticfiles/rest\_framework/js/ajax-form.js](/ftscore/staticfiles/rest_framework/js/ajax-form.js) | JavaScript | 95 | 16 | 23 | 134 |
| [ftscore/staticfiles/rest\_framework/js/bootstrap.min.js](/ftscore/staticfiles/rest_framework/js/bootstrap.min.js) | JavaScript | 1 | 5 | 0 | 6 |
| [ftscore/staticfiles/rest\_framework/js/coreapi-0.1.1.js](/ftscore/staticfiles/rest_framework/js/coreapi-0.1.1.js) | JavaScript | 1,537 | 219 | 287 | 2,043 |
| [ftscore/staticfiles/rest\_framework/js/csrf.js](/ftscore/staticfiles/rest_framework/js/csrf.js) | JavaScript | 35 | 9 | 10 | 54 |
| [ftscore/staticfiles/rest\_framework/js/default.js](/ftscore/staticfiles/rest_framework/js/default.js) | JavaScript | 32 | 6 | 10 | 48 |
| [ftscore/staticfiles/rest\_framework/js/jquery-3.7.1.min.js](/ftscore/staticfiles/rest_framework/js/jquery-3.7.1.min.js) | JavaScript | 1 | 1 | 1 | 3 |
| [ftscore/staticfiles/rest\_framework/js/load-ajax-form.js](/ftscore/staticfiles/rest_framework/js/load-ajax-form.js) | JavaScript | 3 | 0 | 1 | 4 |
| [ftscore/staticfiles/rest\_framework/js/prettify-min.js](/ftscore/staticfiles/rest_framework/js/prettify-min.js) | JavaScript | 28 | 0 | 1 | 29 |
| [ftscore/utils/\_\_init\_\_.py](/ftscore/utils/__init__.py) | Python | 0 | 1 | 1 | 2 |
| [ftscore/utils/paginationutils.py](/ftscore/utils/paginationutils.py) | Python | 9 | 0 | 2 | 11 |
| [ftscore/worker-entrypoint.sh](/ftscore/worker-entrypoint.sh) | Shell Script | 5 | 4 | 1 | 10 |
| [ftsfrontend/react-frontend/src/components/AccessCode/AccessCodeList.jsx](/ftsfrontend/react-frontend/src/components/AccessCode/AccessCodeList.jsx) | JavaScript JSX | -125 | -10 | -17 | -152 |
| [ftsfrontend/react-frontend/src/components/AdminSupervisor/AdminAC.jsx](/ftsfrontend/react-frontend/src/components/AdminSupervisor/AdminAC.jsx) | JavaScript JSX | -17 | -1 | -3 | -21 |
| [ftsfrontend/react-frontend/src/components/AdminSupervisor/AdminAccCodeDel.jsx](/ftsfrontend/react-frontend/src/components/AdminSupervisor/AdminAccCodeDel.jsx) | JavaScript JSX | -40 | -1 | -5 | -46 |
| [ftsfrontend/react-frontend/src/components/AdminSupervisor/AdminFileDelete.jsx](/ftsfrontend/react-frontend/src/components/AdminSupervisor/AdminFileDelete.jsx) | JavaScript JSX | -41 | -1 | -4 | -46 |
| [ftsfrontend/react-frontend/src/components/AdminSupervisor/AdminFileList.jsx](/ftsfrontend/react-frontend/src/components/AdminSupervisor/AdminFileList.jsx) | JavaScript JSX | -12 | 0 | -3 | -15 |
| [ftsfrontend/react-frontend/src/components/AdminSupervisor/AdminModelCard.jsx](/ftsfrontend/react-frontend/src/components/AdminSupervisor/AdminModelCard.jsx) | JavaScript JSX | -36 | -24 | -8 | -68 |
| [ftsfrontend/react-frontend/src/components/AdminSupervisor/AdminModification.jsx](/ftsfrontend/react-frontend/src/components/AdminSupervisor/AdminModification.jsx) | JavaScript JSX | -11 | -1 | -2 | -14 |
| [ftsfrontend/react-frontend/src/components/AdminSupervisor/AdminPanel.jsx](/ftsfrontend/react-frontend/src/components/AdminSupervisor/AdminPanel.jsx) | JavaScript JSX | -53 | -1 | -7 | -61 |
| [ftsfrontend/react-frontend/src/components/AdminSupervisor/AdminTeam.jsx](/ftsfrontend/react-frontend/src/components/AdminSupervisor/AdminTeam.jsx) | JavaScript JSX | -16 | -1 | -3 | -20 |
| [ftsfrontend/react-frontend/src/components/AdminSupervisor/AdminTeamDelete.jsx](/ftsfrontend/react-frontend/src/components/AdminSupervisor/AdminTeamDelete.jsx) | JavaScript JSX | -40 | -1 | -4 | -45 |
| [ftsfrontend/react-frontend/src/components/AdminSupervisor/AdminUser.jsx](/ftsfrontend/react-frontend/src/components/AdminSupervisor/AdminUser.jsx) | JavaScript JSX | -11 | 0 | -5 | -16 |
| [ftsfrontend/react-frontend/src/components/AdminSupervisor/AdminUserDelete.jsx](/ftsfrontend/react-frontend/src/components/AdminSupervisor/AdminUserDelete.jsx) | JavaScript JSX | -54 | -1 | -4 | -59 |
| [ftsfrontend/react-frontend/src/components/AdminSupervisor/CreateAccCode.jsx](/ftsfrontend/react-frontend/src/components/AdminSupervisor/CreateAccCode.jsx) | JavaScript JSX | -328 | -15 | -38 | -381 |
| [ftsfrontend/react-frontend/src/components/AdminSupervisor/CreateTeam.jsx](/ftsfrontend/react-frontend/src/components/AdminSupervisor/CreateTeam.jsx) | JavaScript JSX | -540 | -23 | -41 | -604 |
| [ftsfrontend/react-frontend/src/components/ApiFetch/TeamAPI/TeamPostApi.jsx](/ftsfrontend/react-frontend/src/components/ApiFetch/TeamAPI/TeamPostApi.jsx) | JavaScript JSX | -99 | -5 | -9 | -113 |
| [ftsfrontend/react-frontend/src/components/ApiFetch/TeamAPI/TeamgetApi.jsx](/ftsfrontend/react-frontend/src/components/ApiFetch/TeamAPI/TeamgetApi.jsx) | JavaScript JSX | -8 | 0 | -4 | -12 |
| [ftsfrontend/react-frontend/src/components/Breadcrumb/Breadcrumb.jsx](/ftsfrontend/react-frontend/src/components/Breadcrumb/Breadcrumb.jsx) | JavaScript JSX | -62 | -12 | -9 | -83 |
| [ftsfrontend/react-frontend/src/components/Dashboard/FtsDashboard.jsx](/ftsfrontend/react-frontend/src/components/Dashboard/FtsDashboard.jsx) | JavaScript JSX | -35 | -2 | -4 | -41 |
| [ftsfrontend/react-frontend/src/components/DashboardMain/DashboardMain.jsx](/ftsfrontend/react-frontend/src/components/DashboardMain/DashboardMain.jsx) | JavaScript JSX | -177 | 0 | -11 | -188 |
| [ftsfrontend/react-frontend/src/components/File/FileList.jsx](/ftsfrontend/react-frontend/src/components/File/FileList.jsx) | JavaScript JSX | -119 | -9 | -18 | -146 |
| [ftsfrontend/react-frontend/src/components/FileUpload/FileUpload.jsx](/ftsfrontend/react-frontend/src/components/FileUpload/FileUpload.jsx) | JavaScript JSX | -390 | -18 | -37 | -445 |
| [ftsfrontend/react-frontend/src/components/Footer/Footer.jsx](/ftsfrontend/react-frontend/src/components/Footer/Footer.jsx) | JavaScript JSX | -56 | -3 | -6 | -65 |
| [ftsfrontend/react-frontend/src/components/Header/Header.jsx](/ftsfrontend/react-frontend/src/components/Header/Header.jsx) | JavaScript JSX | -39 | 0 | -5 | -44 |
| [ftsfrontend/react-frontend/src/components/Header/HeaderLanding.jsx](/ftsfrontend/react-frontend/src/components/Header/HeaderLanding.jsx) | JavaScript JSX | -67 | -9 | -8 | -84 |
| [ftsfrontend/react-frontend/src/components/Header/header.css](/ftsfrontend/react-frontend/src/components/Header/header.css) | PostCSS | 0 | -3 | 0 | -3 |
| [ftsfrontend/react-frontend/src/components/Header2/Header2.jsx](/ftsfrontend/react-frontend/src/components/Header2/Header2.jsx) | JavaScript JSX | -60 | -17 | -12 | -89 |
| [ftsfrontend/react-frontend/src/components/Header3/Header3.jsx](/ftsfrontend/react-frontend/src/components/Header3/Header3.jsx) | JavaScript JSX | -49 | -17 | -12 | -78 |
| [ftsfrontend/react-frontend/src/components/Input/InputNoRequire.jsx](/ftsfrontend/react-frontend/src/components/Input/InputNoRequire.jsx) | JavaScript JSX | -32 | -1 | -5 | -38 |
| [ftsfrontend/react-frontend/src/components/Landing/Landing.jsx](/ftsfrontend/react-frontend/src/components/Landing/Landing.jsx) | JavaScript JSX | -272 | -1 | -14 | -287 |
| [ftsfrontend/react-frontend/src/components/Loading/Loading.jsx](/ftsfrontend/react-frontend/src/components/Loading/Loading.jsx) | JavaScript JSX | -8 | -9 | -3 | -20 |
| [ftsfrontend/react-frontend/src/components/Modal/ModalDeleteTeam.jsx](/ftsfrontend/react-frontend/src/components/Modal/ModalDeleteTeam.jsx) | JavaScript JSX | -87 | 0 | -4 | -91 |
| [ftsfrontend/react-frontend/src/components/Modal/ModalSearch.jsx](/ftsfrontend/react-frontend/src/components/Modal/ModalSearch.jsx) | JavaScript JSX | -91 | -1 | -3 | -95 |
| [ftsfrontend/react-frontend/src/components/Modification/Modification.jsx](/ftsfrontend/react-frontend/src/components/Modification/Modification.jsx) | JavaScript JSX | -115 | -6 | -14 | -135 |
| [ftsfrontend/react-frontend/src/components/Pagination/PaginationSticker.jsx](/ftsfrontend/react-frontend/src/components/Pagination/PaginationSticker.jsx) | JavaScript JSX | -43 | 0 | -3 | -46 |
| [ftsfrontend/react-frontend/src/components/RemoveYourself/RemoveYourself.jsx](/ftsfrontend/react-frontend/src/components/RemoveYourself/RemoveYourself.jsx) | JavaScript JSX | -36 | 0 | -5 | -41 |
| [ftsfrontend/react-frontend/src/components/RightBar/Rightbar.jsx](/ftsfrontend/react-frontend/src/components/RightBar/Rightbar.jsx) | JavaScript JSX | -99 | -18 | -11 | -128 |
| [ftsfrontend/react-frontend/src/components/SelectInputs/SelectInput.jsx](/ftsfrontend/react-frontend/src/components/SelectInputs/SelectInput.jsx) | JavaScript JSX | -50 | -7 | -5 | -62 |
| [ftsfrontend/react-frontend/src/components/Sidebar/Sidebar.jsx](/ftsfrontend/react-frontend/src/components/Sidebar/Sidebar.jsx) | JavaScript JSX | -83 | -10 | -12 | -105 |
| [ftsfrontend/react-frontend/src/components/SpaceBetweenFields/Space2.jsx](/ftsfrontend/react-frontend/src/components/SpaceBetweenFields/Space2.jsx) | JavaScript JSX | -8 | 0 | -4 | -12 |
| [ftsfrontend/react-frontend/src/components/Team/CreateTeamNonSup.jsx](/ftsfrontend/react-frontend/src/components/Team/CreateTeamNonSup.jsx) | JavaScript JSX | -413 | -20 | -34 | -467 |
| [ftsfrontend/react-frontend/src/components/Team/DeleteSelfMembership.jsx](/ftsfrontend/react-frontend/src/components/Team/DeleteSelfMembership.jsx) | JavaScript JSX | -53 | 0 | -8 | -61 |
| [ftsfrontend/react-frontend/src/components/Team/Team.jsx](/ftsfrontend/react-frontend/src/components/Team/Team.jsx) | JavaScript JSX | -138 | -9 | -17 | -164 |
| [ftsfrontend/react-frontend/src/components/Team/TeamView.jsx](/ftsfrontend/react-frontend/src/components/Team/TeamView.jsx) | JavaScript JSX | -351 | -27 | -38 | -416 |
| [ftsfrontend/react-frontend/src/components/TestComp/Test.jsx](/ftsfrontend/react-frontend/src/components/TestComp/Test.jsx) | JavaScript JSX | 0 | -18 | -4 | -22 |
| [ftsfrontend/react-frontend/src/components/UsersList/UserList.jsx](/ftsfrontend/react-frontend/src/components/UsersList/UserList.jsx) | JavaScript JSX | -122 | -18 | -17 | -157 |
| [ftsfrontend/react-frontend/src/components/UtilsErrorRendering/BelongsToTeam.jsx](/ftsfrontend/react-frontend/src/components/UtilsErrorRendering/BelongsToTeam.jsx) | JavaScript JSX | -17 | 0 | -4 | -21 |
| [ftsfrontend/react-frontend/src/components/UtilsErrorRendering/ErrorRenderHandle.jsx](/ftsfrontend/react-frontend/src/components/UtilsErrorRendering/ErrorRenderHandle.jsx) | JavaScript JSX | -34 | -5 | -3 | -42 |
| [ftsfrontend/react-frontend/src/components/Workspace/Workspace.jsx](/ftsfrontend/react-frontend/src/components/Workspace/Workspace.jsx) | JavaScript JSX | -94 | -3 | -8 | -105 |

[Summary](results.md) / [Details](details.md) / [Diff Summary](diff.md) / Diff Details