from rest_framework.views import APIView
from rest_framework.response import Response

class TestDestroyView(APIView):
    def delete(self, request, *args, **kwargs):
        print("DELETE from axios happened", flush=True)
        return Response({"ok": True}, status=200)
    
    def get(self, request, *args, **kwargs):
        print("GET was called", flush=True)
        return Response({"detail": "This is a GET response"}, status=200)
