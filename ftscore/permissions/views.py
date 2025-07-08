from django.shortcuts import render
from django.http import HttpResponse
from django.views import generic
from django.conf import settings
from pprint import pprint
# your models
from .models import File, Folder, Modification, Tag, ActionLog
from accounts.authenticate import CustomAuthentication
from django.db.models import Q, Prefetch

# Create your views here.
from rest_framework import permissions, viewsets
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework_simplejwt.authentication import JWTAuthentication
from fts_app.serializers import FileSerializer, FolderSerializer, UserSerializer, ActionLogSerializer, TagSerializer, ModificationSerializer
from .models import Team, TeamMembership, AccessCode
from .serializers import TeamSerializer, TeamMembershipSerializer, AccessCodeSerializer
from django.contrib.auth import get_user_model
from rest_framework.decorators import action
# for downloads
from django.http import FileResponse
# custom throttling
from django.utils import timezone
from datetime import timedelta
# ----

import logging


from permissions.special_permissions import GeneralWritePermissions
# import custom permissions
from fts_app.permissions import IsAuthorOrReadOnly, TeamsAndRolesFiles, TeamsAndRolesFolders

from rest_framework.exceptions import NotFound

logger = logging.getLogger(__name__)

User = get_user_model()

class TeamViewSet(viewsets.ModelViewSet):
    serializer_class= TeamSerializer
    queryset = Team.objects.select_related('leader').prefetch_related(
        Prefetch('membership_users',
                 queryset=User.objects.prefetch_related('teams', 'memberships','created_access_codes')
                 ),
        Prefetch('memberships',
                 queryset=TeamMembership.objects.select_related('user', 'team'))
    )
    # permission_classes = [IsAuthenticated]
    permission_classes = [AllowAny]
    # authentication_classes = [CustomAuthentication]

    def dispatch(self, request, *args, **kwargs):
        logger.info(f"DISPATCH - Method: {request.method}, Path: {request.path}, Args: {args}, Kwargs: {kwargs}")
        print(f"DISPATCH - Method: {request.method}, Path: {request.path}, Args: {args}, Kwargs: {kwargs}")
        return super().dispatch(request, *args, **kwargs)
    
    def list(self, request, *args, **kwargs):
        print("=== LIST METHOD CALLED ===")
        return super().list(request, *args, **kwargs)
    
    def perform_destroy(self, instance):
        print("fuck destroy in team")
        return super().perform_destroy(instance)
    
    # def list(self, request, *args, **kwargs):
    #     print(request.user)
    #     return super().list(request, *args, **kwargs)

    # def get_permissions(self):
    #     if self.action in ['create', 'update', 'partial_update', 'destroy']:
    #         return [IsAuthenticated()]
    #     return super().get_permissions()

class TeamMembershipViewSet(viewsets.ModelViewSet):
    queryset = TeamMembership.objects.select_related('user', 'team')  # Adjust this to your actual queryset
    serializer_class = TeamMembershipSerializer
    permission_classes = [AllowAny]
    authentication_classes = [CustomAuthentication]


    def list(self, request, *args, **kwargs):
        print("=== LIST METHOD CALLED IN MEMBERSHIP===")
        return super().list(request, *args, **kwargs)

    def dispatch(self, request, *args, **kwargs):
        logger.info(f"DISPATCH - Method: {request.method}, Path: {request.path}, Args: {args}, Kwargs: {kwargs}")
        print(f"DISPATCH - Method: {request.method}, Path: {request.path}, Args: {args}, Kwargs: {kwargs}")
        return super().dispatch(request, *args, **kwargs)

    # def get_permissions(self):
    #     if self.action in ['create', 'update', 'partial_update', 'destroy']:
    #         return [IsAuthenticated()]
    #     return super().get_permissions()

    def destroy(self, request, *args, **kwargs):
        print("membership destroy")
        membership_instance = self.get_object()
        user = request.user
        self.perform_destroy(membership_instance)
        if user.is_leftover_teammodel_leader():
            team = user.is_leftover_teammodel_leader()
            print("the user is a leader of a teammodel")
            team.delete()
        return super().destroy(request, *args, **kwargs)
    
  # https://www.cdrf.co/3.3/rest_framework.viewsets/ModelViewSet.html#perform_destroy
    def perform_destroy(self, instance):
        print("membership perform destroy")
        instance.delete()

class AccessCodeViewSet(viewsets.ModelViewSet):
    queryset = AccessCode.objects.all()  # Adjust this to your actual queryset
    serializer_class = AccessCodeSerializer
    permission_classes = [IsAuthenticated, GeneralWritePermissions]
    authentication_classes = [CustomAuthentication]
    lookup_field = 'masked_id'

    def get_queryset(self):
        queryset = AccessCode.objects.select_related('created_by', 'team')
        teamId = self.request.query_params.get('teamId')
        order_by_date = self.request.query_params.get('order_by_fate')
        arrange_by_file = self.request.query_params.get('arrange_by_file')
        order_by_level = self.request.query_params.get('order_by_level')
        
        if teamId is not None:
            try:
                team = Team.objects.get(id=teamId)
            except Exception as e:
                # https://www.django-rest-framework.org/api-guide/exceptions/#notfound
                raise NotFound(detail="Team Id is not available", code=None)
            # https://stackoverflow.com/questions/4507893/django-filter-many-to-many-with-contains/4508083
            return queryset.filter(team=team)
        elif order_by_date is not None:
            mod_query = queryset.order_by('created_at')
            return mod_query
        # if we annotate the new field must be specified in serialisers
        # https://stackoverflow.com/questions/31920853/aggregate-and-other-annotated-fields-in-django-rest-framework-serializers
        return queryset

    # def get_permissions(self):
    #     if self.action in ['create', 'update', 'partial_update', 'destroy']:
    #         return [IsAuthenticated()]
    #     return super().get_permissions()