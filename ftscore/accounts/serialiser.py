from rest_framework import serializers
from django.contrib.auth import get_user_model
User = get_user_model()
from permissions.serializers import TeamSerializer

from accounts.services import UserServices
from django.apps import apps
from rest_framework.reverse import reverse
from django.db.models import Prefetch

AccessCode = apps.get_model('permissions', 'AccessCode')

# just for signup
class UserCreateSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = User
        fields = ['username', 'email', 'password']
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        return User.objects.create_user(**validated_data)



class UserSerializer(serializers.HyperlinkedModelSerializer):
    # to show the reverse fields relat4ed to user, we need to explicitly create fields for it. we are doing it
    # here for owned_files. the field must exist in the model
    url = serializers.HyperlinkedIdentityField(view_name='myuser-detail')  # Expects a URL pattern named 'myuser-detail'
    created_access_codes=serializers.HyperlinkedRelatedField(
        many=True, 
        view_name='accesscode-detail', 
        read_only=True,
        lookup_field='masked_id'
    )  # Reverse relation to AccessCode model

    team = serializers.SerializerMethodField()
    belongs_to_team = serializers.SerializerMethodField()
    team_access_level = serializers.SerializerMethodField()
    role = serializers.SerializerMethodField()

    is_superuser  = serializers.SerializerMethodField()
    is_staff  = serializers.SerializerMethodField()
    is_supervisor  = serializers.SerializerMethodField()
    is_Team_L1  = serializers.SerializerMethodField()
    is_leader = serializers.SerializerMethodField()
    is_temp = serializers.SerializerMethodField()
    is_god = serializers.SerializerMethodField()
    is_not_god_only_L2_L3 = serializers.SerializerMethodField()
    membership_id = serializers.SerializerMethodField()
    role = serializers.SerializerMethodField()
    access_code = serializers.SerializerMethodField()
    is_not_god_only_L2_L3_leader = serializers.SerializerMethodField()
    is_not_god_only_L2_L3_worker =serializers.SerializerMethodField()
    user_team_access_code_url =serializers.SerializerMethodField()
    class Meta:
        model = User
        fields = ['url', 'id', 'username', 'email', 'password', "team", 'belongs_to_team', "team_access_level",
                  "role", "access_code", "created_access_codes", 'user_team_access_code_url',
                  "memberships",
                  'membership_id',
                  'role',
                  "is_superuser",
                  "is_staff",
                  "is_supervisor",
                  "is_Team_L1",
                  "is_temp",
                  "is_leader",
                  'is_not_god_only_L2_L3',
                  "is_god",
                  "is_not_god_only_L2_L3_leader",
                  "is_not_god_only_L2_L3_worker",
                  ]  # Include 'url' field
        extra_kwargs = {'password': {'write_only': True},
                        # 'memberships':{'read_only':True}
                        }

    def get_membership_id(self, user):
        membership = user.get_team_membership()
        if membership:
            return membership.id
        return None
        
    def get_user_team_access_code_url(self, user):
        request = self.context.get('request')
        user_membership = user.get_team_membership()
        if not user_membership:
            return []
        user_team = user_membership.team
        Team = apps.get_model('permissions', 'Team')
        TeamMembership = apps.get_model('permissions', 'TeamMembership')
        accesscodes = AccessCode.objects.filter(team=user_team).select_related("created_by", "team")
        return [
            reverse('accesscode-detail', kwargs={'masked_id': ac.masked_id}, request=request)
            for ac in accesscodes
        ]
    
    def get_access_code(self, user):
        return user.get_access_code_instance()
    # to set hashed password in serialiser. its better than setting it in view or models
  # https://docs.djangoproject.com/en/5.2/ref/contrib/auth/#django.contrib.auth.models.User.set_password
    def get_is_superuser(self, obj):
        return obj.is_superuser
    
    def get_is_staff(self, obj):
        return obj.is_staff
    
    def get_is_supervisor(self, obj):
        return obj.supervisor
    
    def get_is_Team_L1(self, obj):
        return obj.is_team_level_L1
    def get_is_leader(self, obj):
        return obj.is_team_leader()
    
    def get_is_temp(self, obj):
        return obj.is_a_temp()
    
    def get_is_god(self, obj):
        return obj.is_a_god()


    def get_team(self, obj):
        if obj.get_team_membership():
            return {"id":obj.get_team_membership().team.id,
                    "name": obj.get_team_membership().team.name}
        return None
    
    def validate(self, attrs):
        return super().validate(attrs)

    def create(self, validated_data):
        password = validated_data.pop('password')
        user = User(**validated_data)
        user.set_password(password)
        user.save()
        return user

    def get_belongs_to_team(self, user):
        team_membership=user.memberships.first()
        if team_membership and team_membership.team:
            return team_membership.team.name
        return None
    
    def get_team_access_level(self, user):
        user_membership = user.get_team_membership()
        if not user_membership:
            return None
        team_access_level = user_membership.team.level
        return team_access_level

    def get_role(self, user):
        user_membership = user.get_team_membership()
        if user_membership:
            return user_membership.role
        return None
    
    def get_is_not_god_only_L2_L3(self, user):
        return user.is_not_god_only_L2_L3()
    
    def get_role(self, user):
        user_membership = user.get_team_membership()
        if user_membership:
            return user_membership.role
        return None
    
    def get_is_not_god_only_L2_L3_leader(self, user):
        return user.is_not_god_only_L2_L3_leader()

    def get_is_not_god_only_L2_L3_worker(self, user):
        return user.is_not_god_only_L2_L3_worker()


from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
# the settings module exists inside drf in venv
from rest_framework_simplejwt.settings import api_settings
from django.contrib.auth.models import AbstractBaseUser, update_last_login
#  File "/home/boba2323/fts-django/.venv/lib/python3.12/site-packages/rest_framework_simplejwt/serializers.py", line 75, in validate
#     refresh = self.get_token(self.user)
from typing import Any, Optional, TypeVar

# copy from fts_app
class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    '''this custom class saves the token access to the request session. thus creating a stateful token? the 
        TokenObtainPairSerializer is a base class that we use to build to custom tokenserialiser class
        it has default methods VALIDATE whose source code we found in a traceback that led us to the original source
        in venv. we manipulate the method to extract the request object, get our token and store it in the 
        request object. see that we store the acess not the refresh token. most of the code in the method
        is default code we only add the part that gets the token and stores it in the request session.
        i suppose we use session since it is design to expire after sometime? we can GET BACK TO IT later

        then we retrieve the token from the session in the middleware
    '''
    
# "/home/boba2323/fts-django/.venv/lib/python3.12/site-packages/rest_framework_simplejwt/serializers.py",
# we obtain this code from the module above
    def validate(self, attrs: dict[str, Any]) -> dict[str, str]:
        data = super().validate(attrs)
        request=self.context['request']
        refresh = self.get_token(self.user)

        data["refresh"] = str(refresh)
        data["access"] = str(refresh.access_token)

        request.session['token']=data['access']
        if api_settings.UPDATE_LAST_LOGIN:
            update_last_login(None, self.user)
        return data
    
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        token['name'] = "test_name"
        return token