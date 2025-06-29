# https://www.procoding.org/jwt-token-as-httponly-cookie-in-django
# bullshit way, doesnt account for csrf token, didnt even bother to fix 

# https://dev.to/bhavanaeh/jwt-authentication-with-django-rest-framework-what-why-how-50kj

# https://dev.to/a_atalla/django-rest-framework-custom-jwt-authentication-5n5

# https://medium.com/@kennch/stateful-and-stateless-authentication-10aa3e3d4986

from rest_framework_simplejwt.authentication import JWTAuthentication
from django.conf import settings

from rest_framework.authentication import CSRFCheck
from rest_framework import exceptions

from rest_framework_simplejwt.exceptions import InvalidToken, TokenError

# https://github.com/encode/django-rest-framework/blob/master/rest_framework/authentication.py
from django.middleware.csrf import CsrfViewMiddleware
class CSRFCheck(CsrfViewMiddleware):
    def _reject(self, request, reason):
        return reason

# But when we do post, we must add the csrf token in the headers of axios. However, 
# since we are using a custom tokentauthentican, the csrfmiddleware does not run. 
# Only in sessionbased auth does the csrf is checked, so for the custom jwtauth,
#  we must check the csrf ourself. For that we need the enforce_csrf from sessionbased auth, 
# define it and use a dummy fubction to CSRFCHECK 
# https://github.com/encode/django-rest-framework/blob/master/rest_framework/authentication.py
def enforce_csrf(request):
    # Enforce CSRF validation for session based authentication.
    def dummy_get_response(request):  # pragma: no cover
        return None

    check = CSRFCheck(dummy_get_response)
    print("whats happenign inside enforce csrf")
    print("Request method:", request.method)
    # populates request.META['CSRF_COOKIE'], which is used in process_view()
    check.process_request(request)
    reason = check.process_view(request, None, (), {})
    if reason:
        # CSRF failed, bail with explicit error message
        raise exceptions.PermissionDenied('CSRF Failed: %s' % reason)
 
    # check = CSRFCheck(lambda r: None)  # dummy get_response
    # check_result = check.process_view(request._request, None, (), {})
    # if check_result is not None:
    #     raise exceptions.PermissionDenied(f'CSRF Failed: {check_result}')
    
class CustomAuthentication(JWTAuthentication):
    def authenticate(self, request): #Authenticate the request and return a two-tuple of (user, token).
        print('authenticate')
        header = self.get_header(request)  #Extracts the header containing the JSON web token from the given request

        if header is None:
            print("No Authorization header found")
            raw_token = request.COOKIES.get('access') 
            print( "no heder rawa token from cookies",raw_token)
        else:
            raw_token = self.get_raw_token(header) #get_raw_token(header: bytes)→ bytes | None
                                                    # Extracts an unvalidated JSON web token from the given “Authorization” header value.
            print("raw token", raw_token)
        if raw_token is None:
            print("No token found in header or cookie")
            return None

        try:
            validated_token = self.get_validated_token(raw_token)
        except TokenError as e:
            print("Token validation failed:", str(e))
            return None
        print("Request method:", request.method)
        if request.method not in ("GET", "HEAD", "OPTIONS"):
            print("make csrf skip get")

            # why on earth are we calling csrf. thats because its not session based auth and in only session based
            # auth the csrf is called authmatically the rest we have to do it for ouerselves
            enforce_csrf(request)
        expected_user = self.get_user(validated_token)
        print("expected user" ,expected_user)
        return expected_user, validated_token #Attempts to find and return a user using the given validated token.
    
# plug it to settings