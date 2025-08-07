from rest_framework import permissions
# from the book

from permissions.models import Team, TeamMembership
from rest_framework.exceptions import PermissionDenied

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
    

class AccessCodePermission(permissions.BasePermission):
    def has_permission(self, request, view):
        user = request.user
        if request.method in ['POST']:
            if user.supervisor or user.is_superuser:
                return True
            elif user.is_team_level_L1 or user.is_not_god_only_L2_L3_leader():
                return True
            return False
        
        if request.method in ['PUT', 'DELETE']:
            if user.supervisor or user.is_superuser:
                return True
            elif user.is_team_level_L1:
                return True
            return False
        return True

class TeamPermissions(permissions.BasePermission):
    def has_permission(self, request, view):
        user = request.user
    # Read-only permissions are allowed for any request
        if user.supervisor or user.is_superuser: #full access
            return True
        if  user.is_team_level_L1:
            return True
        if request.method in permissions.SAFE_METHODS: #view perms handled here i guess
            return True
        if request.method in ["POST"]:
            # if user.supervisor or user.is_superuser: #better this way for readability, permissions arae trickky
            #     return True
            # elif user.is_team_level_L1:
            #     return True
            # elif user.is_not_god_only_L2_L3_leader():
            #     return True
            # elif user.is_a_temp():
            #     return True
            if user.is_not_god_only_L2_L3_worker():
                return False
            return True
            
        if request.method in ["PUT", "DELETE"]:
            # if user.supervisor or user.is_superuser: #better this way for readability, permissions arae trickky
            #     return True
            # elif user.is_team_level_L1:
            #     return True
            # elif user.is_not_god_only_L2_L3_leader():
            #     return True
            if user.is_a_temp() or user.is_not_god_only_L2_L3_worker():
                return False
            return True
            
    def has_object_permission(self, request, view, obj):
        user = request.user
    # Read-only permissions are allowed for any request
        if user.supervisor or user.is_superuser: #full access
            return True
        if  user.is_team_level_L1:
            return True
        if request.method in permissions.SAFE_METHODS: #view perms handled here i guess
            return True
        if request.method in ["POST"]:
            # if user.supervisor or user.is_superuser: #better this way for readability, permissions arae trickky
            #     return True
            # elif user.is_team_level_L1:
            #     return True
            # elif user.is_not_god_only_L2_L3_leader():
            #     return True
            # elif user.is_a_temp():
            #     return True
            if user.is_not_god_only_L2_L3_worker():
                return False
            return True
            
        if request.method in [ "DELETE", "PUT"]:
            if user.supervisor or user.is_superuser: #better this way for readability, permissions arae trickky
                return True
            elif user.is_team_level_L1:
                return True
            elif user.is_not_god_only_L2_L3_leader():
                return True
            elif user.is_a_temp():
                return False
            elif user.is_not_god_only_L2_L3_worker():
                return False
            else:
                return False

    
# https://stackoverflow.com/questions/29936323/returning-custom-message-when-a-permission-is-denied-in-drf
class TeamMembershipPermissions(permissions.BasePermission):
    message = 'This action is not allowed.'
    def has_permission(self, request, view):
        user = request.user
    # Read-only permissions are allowed for any request
        if user.supervisor or user.is_superuser: #full access
            return True
        if  user.is_team_level_L1:
            return True
        if request.method in permissions.SAFE_METHODS: #view perms handled here i guess
            return True
        if request.method in ['POST']:
            if user.is_not_god_only_L2_L3_leader():
                return True
            elif user.is_not_god_only_L2_L3_worker():
                return False
            elif user.is_a_temp():
                return True
            else:
                return False
            
        return True
# we could have restricted the workers from using DELETE in has perms but we need to allow them to delet themselves
# cant work on DELETE in has perms

    def has_object_permission(self, request, view, obj):
        user = request.user
    # Read-only permissions are allowed for any request
        if user.supervisor or user.is_superuser: #full access
            return True
        if  user.is_team_level_L1:
            return True
        if request.method in permissions.SAFE_METHODS: #view perms handled here i guess
            return True
        if request.method in ['POST']:
            if user.supervisor or user.is_superuser: #better this way for readability, permissions arae trickky
                return True
            elif user.is_team_level_L1:
                return True
            elif user.is_not_god_only_L2_L3_leader():
                return True
            elif user.is_not_god_only_L2_L3_worker():
                return False
            else:
                return False
        
        # permissions to add a different user to the team or to delete him from the team
        if request.method in ['DELETE','PUT']:
            if user.supervisor or user.is_team_level_L1 or user.is_superuser:
                return True
            elif user.is_not_god_only_L2_L3_leader():
                # lets take a look at the object which is the membership hyperlink of the worker
                # we have to check if the object which is a membership is a part of the team user is in
                if obj.team == user.memberships.first().team:
                    return True
                return False
            elif user.is_not_god_only_L2_L3_worker():
                if obj.user == user:
                    return True
                raise PermissionDenied('You cant remove other workers, youre just a worker')
            else:
                return False
        # return obj.user == user #for views
        # return True 

