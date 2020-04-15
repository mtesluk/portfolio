from django.urls import path, include
from rest_framework.routers import DefaultRouter

from .views import UserViewSet, CustomObtainAuthTokenView

router = DefaultRouter()
router.register(r'users', UserViewSet, basename='user')

urlpatterns = [
    path(r'api_token_auth/', CustomObtainAuthTokenView.as_view()),
    *router.urls
]
