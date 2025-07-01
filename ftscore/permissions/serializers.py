from rest_framework import serializers
from django.contrib.auth.models import Group
from django.contrib.auth import get_user_model
from .models import Team, TeamMembership, AccessCode  # Import your models
from rest_framework.reverse import reverse
from fts_app.serializers import UserSerializer
from pprint import pprint
from rest_framework.validators import UniqueTogetherValidator,UniqueValidator
User = get_user_model()

class TeamMembershipSerializer(serializers.HyperlinkedModelSerializer):
    url = serializers.HyperlinkedIdentityField(
        view_name='teammembership-detail',
        
    )
    # https://www.django-rest-framework.org/api-guide/validators/#uniquevalidator
    user=serializers.HyperlinkedRelatedField(
        view_name="myuser-detail",
        queryset=User.objects.all(),
        validators=[UniqueValidator(queryset=TeamMembership.objects.all(),
                                    message="A user can only be part of one team at a time only once-unique constraint of teammembership.")]

    )
    username=serializers.SerializerMethodField()
# teammembership in models is complex especially the validations. and we need to bring all those validations
# to the api here. some we will do through the constraints 
# https://dev.to/soldatov-ss/why-django-rest-framework-doesnt-show-your-custom-validation-error-messages-and-what-to-do-about-2dcl
# others we will validate()
    class Meta:
        model = TeamMembership
        fields = ('id', 'url', 'team', 'user', 'role', "username")

    def get_username(self, obj):
        user_name = obj.user.username
        if user_name:
            return user_name

    def validate(self, attrs):
        # while model did the constraint with q objects we cannot use it in drf so we do it manually
        team_membership_model = self.Meta.model
        user = attrs.get('user')
        team =attrs.get('team')
        role = attrs.get('role')

        query_of_user_already_existing_in_tm = team_membership_model.objects.filter(user=user)
        if self.instance:
            # incase  user already exists in TM then we raise a error
            # however in case of update, the TM instance already exists, thus the user also exists in a TM, so we have to exclude the 
            # particular user from the TM, basically ensuring that the user is saved as part of the TM every time(if we select the same user)
            # unless the user exists elsewhere in the TM which is basically impossible since we constraint user as unique anyway
            if query_of_user_already_existing_in_tm.exclude(pk=self.instance.pk).exists():
                raise serializers.ValidationError("The user is already a team member elsewhere!")
        
        if query_of_user_already_existing_in_tm.exists():
            raise serializers.ValidationError("The user is already a team member elsewhere!")   

            
        if role == "leader":
            # check if leader occurs more than once
            tm_instance = team_membership_model.objects.filter(team=team, role=role)
            # for updates
            if self.instance:
                tm_instance= tm_instance.exclude(pk=self.instance.pk)
            if tm_instance.exists():
                raise serializers.ValidationError("Theres already a leader for this team")
        return attrs


class TeamSerializer(serializers.HyperlinkedModelSerializer):
    url= serializers.HyperlinkedIdentityField(
        view_name='team-detail',
    )
    access_codes= serializers.HyperlinkedRelatedField(
        # queryset=AccessCode.objects.all(),
        view_name='accesscode-detail',
        lookup_field='masked_id',
        many=True,
        read_only=True,
        # view_name='accesscode-detail',
    ) #reverse relationship to access codes in access code model

    # membership_users is a field in team model and not a reverse field in teamembership

    # this below is the reverse relatedd field
    # memberships=serializers.HyperlinkedRelatedField(many=True, read_only=True, view_name='teammembership-detail' )

    
    # doing it via this https://stackoverflow.com/questions/14573102/how-do-i-include-related-model-fields-using-django-rest-framework
    # we get the whole Teammembership serialiser info this way
    memberships=TeamMembershipSerializer(many=True, read_only=True)

    # lets attempt to do the same with leader field, we intend to get the full userserialsier structure instead of just a hyperlink
    # leader= UserSerializer()
    # bad idea, it should not be read only since we need to actively fill it. even when its writable, it does not link to existing leaders
    # but makes us create one
    access_code_code = serializers.SerializerMethodField()
    workers=serializers.SerializerMethodField()
    leader_name = serializers.SerializerMethodField()
    # access_codes=serializers.HyperlinkedRelatedField(
    #     queryset=AccessCode.objects.all(),
    #     view_name='accesscode-detail',
    #     lookup_field='masked_id',
    # )
    class Meta:
        model = Team
        fields = ('id', 'name', 'url', 'name', 'created_at', 'leader','leader_name', 'membership_users',
                   'workers',
                     'memberships', 'level', 'access_codes', "access_code_code" )
        # extra_kwargs = {
        #     'access_codes': {'view_name': 'accesscode-detail','lookup_field': 'masked_id'},
        # }
        
    
    def get_leader_name(self, obj):
        if obj.leader:
            return obj.leader.username
        return None

    def get_access_code_code(self, obj):
        if obj.access_codes.exists():
            access_code_inst = obj.access_codes.first()
            code = access_code_inst.code
            return code
        return None

    def get_workers(self, obj):
        # getting the request body in the serialiser. its not the same as getting the request body in biews
        request = self.context.get('request')
        worker_query = obj.get_workers_of_the_team() #this is a query of membership obejcts
        # we turn them in json objects??
        return [{
            'id':query.user.id,
            'user':query.user.username,
            'user_url':reverse('myuser-detail', args=[query.user.id], request=request),
            'team':query.team.name,
            'team_url':reverse('team-detail', args=[query.team.id], request=request),
            'team_membership':reverse('teammembership-detail', args=[query.id], request=request)
        } for query in worker_query]

    def validate(self, attrs):
        # now we validate all fucking serialisers since the api wont access them from model backend
        # https://stackoverflow.com/questions/53704002/find-the-model-name-from-a-django-rest-framework-serializer
        # get model name
        team_model = self.Meta.model
        leader = attrs.get('leader') #basically just a user
        
        if self.instance:
            # checksif the user is a leader exists in another team
            does_user_exist_as_leader_in_another_team = Team.objects.filter(leader=leader).exclude(pk=self.instance.pk).exists()
            if does_user_exist_as_leader_in_another_team:
                raise serializers.ValidationError("update-This user is a leader in another team already.")
            does_user_exist_as_worker_in_another_team = TeamMembership.objects.filter(user=leader, role="worker").exclude(team=self.instance).exists()
            if does_user_exist_as_worker_in_another_team:
                raise serializers.ValidationError("update-This user is a worker in another team already.")
            is_user_a_worker_in_the_team_already = TeamMembership.objects.filter(team= self.instance, user=leader, role="worker").exists()
            if is_user_a_worker_in_the_team_already:
                raise serializers.ValidationError("update-This user is a worker in this team already.")   
            return attrs

        does_user_exist_as_leader_in_another_team = Team.objects.filter(leader=leader).exists()
        if does_user_exist_as_leader_in_another_team:
            raise serializers.ValidationError("This user is a leader in another team already.")
        does_user_exist_as_worker_in_another_team = TeamMembership.objects.filter(user=leader, role="worker").exists()
        if does_user_exist_as_worker_in_another_team:
            raise serializers.ValidationError("This user is a worker in another team already.")
        return attrs

class AccessCodeSerializer(serializers.HyperlinkedModelSerializer):
    url = serializers.HyperlinkedIdentityField(
        view_name='accesscode-detail',
        lookup_field= 'masked_id'
    )
    team_name=serializers.SerializerMethodField()
    class Meta:
        model = AccessCode
        fields = ( 'url', 'code', 'masked_id', 'team', 'team_name', 'created_by', 'created_at', 'expires_at', 'is_active', 'optional_description')
        # extra_kwargs = {
        #     'url': {'view_name': 'accesscode','lookup_field': 'masked_id'},
        # }
    def get_team_name(self, obj):
        if obj.team:
            team=obj.team.name
            return team
        return "No team assigned"
    # https://www.django-rest-framework.org/api-guide/serializers/#field-level-validation
    # we are adding a validation in the field rather than in the object

    def validate_team(self, team_obj):
        team_code = team_obj.access_codes.all().first()
    # https://www.django-rest-framework.org/api-guide/serializers/#accessing-the-initial-data-and-instance
    # use .instance to access serialiaser object
        if self.instance:
            if self.instance.team == team_obj:
                return team_obj
        
        if team_code:
            print(team_code.code)
            raise serializers.ValidationError('This team already has an access code - acccesscode serialiser error')
        
        return team_obj

    # https://www.django-rest-framework.org/api-guide/serializers/#saving-instances
    # def update(self, instance, validated_data):
    #     # team = validated_data['team']
    #     # if team.pk == self.pk:
    #     return instance
