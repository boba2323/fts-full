from django.contrib.auth import get_user_model

class UserServices:
    
    @staticmethod
    def get_available_non_team_users():
        User = get_user_model()  #preverts the AUTHUSER from being called too early
        query_of_non_team_users = User.objects.filter(memberships__isnull=True)
        if query_of_non_team_users.exists():
            return query_of_non_team_users
        return None
    
    @staticmethod
    def is_a_team_member(user):
        user_membership = user.memberships.all()
        if user_membership.exists():
            return True
        return False
    
    @staticmethod
    def is_a_L2_team_member(user):
        user_membership = user.memberships.select_related("team", "user")
        if user_membership.exists():
            user_team = user_membership.first().team
            user_level = user_team.level
            if user_level == "L2":
                return True
            return False
        return False
    
    @staticmethod
    def is_a_temp(user):
        '''not a part of a team nor a supervisor or a superuser/mutually exclusive with is_not_god_only_L2_L3'''
        user_membership = user.memberships.all()
        if not user.is_superuser and not user.supervisor and not user_membership.exists():
            return True
        return False
    
    @staticmethod
    def is_not_god_only_L2_L3(user):
        '''he is not supervisor or superuser or TL1 but only L2 and L3/mutually exclusive with is_a_temp'''
        user_membership = user.memberships.all()
        if not user.is_superuser and not user.supervisor and user_membership.exists():
            if user.is_team_level_L2 or user.is_team_level_L3:
                return True
            return False
        return False
    

    @staticmethod
    def is_a_god(user):
        '''ts T L1 or a supervisor or a superuser'''
        if user.is_superuser or user.supervisor or user.is_team_level_L1:
            return True
        return False       

    @staticmethod
    def is_not_god_only_L2_L3_leader(user):
        '''he is not supervisor or superuser or TL1 but only L2 and L3/mutually exclusive with is_a_temp'''
        user_membership = user.memberships.all()
        if not user.is_superuser and not user.supervisor and user_membership.exists():
            if user.is_team_level_L2 or user.is_team_level_L3:
                user_team = user_membership.first()
                if user_team.role == "leader":
                    return True
                return False
            return False
        return False 
    
    @staticmethod
    def is_not_god_only_L2_L3_worker(user):
        '''he is not supervisor or superuser or TL1 but only L2 and L3/mutually exclusive with is_a_temp'''
        user_membership = user.memberships.all()
        if not user.is_superuser and not user.supervisor and user_membership.exists():
            if user.is_team_level_L2 or user.is_team_level_L3:
                user_team = user_membership.first()
                if user_team.role == "worker":
                    return True
                return False
            return False
        return False 


