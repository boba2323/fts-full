from rest_framework import permissions
# from the book

from permissions.models import Team, TeamMembership


class GeneralWritePermissions(permissions.BasePermission):
    def has_permission(self, request, view):
        user = request.user
        if request.method in ['POST', 'PUT', 'DELETE']:
            if user.supervisor or user.superuser:
                return True
            elif user.is_team_level_L1():
                return True
            return False
        return True
