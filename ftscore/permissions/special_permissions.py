from rest_framework import permissions
# from the book

from permissions.models import Team, TeamMembership


class GeneralWritePermissions(permissions.BasePermission):
    def has_permission(self, request, view):
        user = request.user
        if request.method in ['POST', 'PUT', 'DELETE']:
            if user.supervisor or user.is_superuser:
                return True
            elif user.is_team_level_L1:
                return True
            return False
        return True
    

class TeamMembershipPermissions(permissions.BasePermission):
    # def has_permission(self, request, view):
    #     user =request.user


    def has_object_permission(self, request, view, obj):
        user = request.user
    # Read-only permissions are allowed for any request
        if user.supervisor or user.is_superuser: #full access
            return True
        if  user.is_team_level_L1:
            return True
        if request.method in permissions.SAFE_METHODS:
            return True
        return obj.user == user 

