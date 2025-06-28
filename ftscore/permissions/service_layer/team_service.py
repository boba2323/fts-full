# https://www.geeksforgeeks.org/python/separation-of-business-logic-and-data-access-in-django/
# https://www.softkraft.co/django-best-practises/
# https://www.softkraft.co/django-speed-up-queries/
# https://roman.pt/posts/django-admin-and-service-layer/
from django.contrib.auth import get_user_model
from django.core.exceptions import ValidationError

User = get_user_model()

class TeamService:
    def create_or_update_team_membership(self, team, new_leader, created_first_time, previous_leader):
        '''with flags created first time, it checks if the team instance exists, if it does, it finds the 
        TM related to the team and leader and updates the TM with new leader, if team does not exist, it create a new
        TM with the leader in the current team field'''
        from permissions.models import TeamMembership
        if not created_first_time: #check if the team instance already exists/UPDATING so we can find the related TM instance
            try:
                existing_teammembership=TeamMembership.objects.get(user=previous_leader, team=team, role="leader")
                existing_teammembership.user=new_leader
                existing_teammembership.role='leader'
                existing_teammembership.save()
            except Exception as e:
                try:
                    # If no existing membership for old leader, create for new leader
                    TeamMembership.objects.get_or_create(user=new_leader, team=team, role='leader')
                except Exception as e:
                    print(f"Validation error of teammembership service: Updating {e}")
                    raise 
                
        # when team is saved first time, it will also create a teammembership through instance that saves the TM.user as the leader
        # with role as leader
        else: #meaning this particular team instance is being created for first time
            try:
                TeamMembership.objects.get_or_create(user=new_leader, team=team, role='leader')
            except Exception as e:
                print(f"Validation error of teammembership service: Creating {e}")
                raise 
