from django.contrib.auth import get_user_model

User = get_user_model()
class UserServices:
    @staticmethod
    def get_available_non_team_users():
        query_of_non_team_users = User.objects.filter(memberships__isnull=True)
        if query_of_non_team_users:
            return query_of_non_team_users
        return None