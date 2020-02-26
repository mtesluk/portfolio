from django.urls import path, include
from rest_framework.authtoken.views import obtain_auth_token


urlpatterns = [
    path(r'api-token-auth/', obtain_auth_token),
]
