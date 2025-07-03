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

from permissions.special_permissions import GeneralWritePermissions
# import custom permissions
from fts_app.permissions import IsAuthorOrReadOnly, TeamsAndRolesFiles, TeamsAndRolesFolders

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
    permission_classes = [IsAuthenticated]
    authentication_classes = [CustomAuthentication]
    
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

    # def get_permissions(self):
    #     if self.action in ['create', 'update', 'partial_update', 'destroy']:
    #         return [IsAuthenticated()]
    #     return super().get_permissions()

class AccessCodeViewSet(viewsets.ModelViewSet):
    queryset = AccessCode.objects.all()  # Adjust this to your actual queryset
    serializer_class = AccessCodeSerializer
    permission_classes = [IsAuthenticated, GeneralWritePermissions]
    authentication_classes = [CustomAuthentication]
    lookup_field = 'masked_id'

    # def get_permissions(self):
    #     if self.action in ['create', 'update', 'partial_update', 'destroy']:
    #         return [IsAuthenticated()]
    #     return super().get_permissions()