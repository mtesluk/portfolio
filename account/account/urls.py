from django.urls import path, include
from rest_framework.routers import DefaultRouter
from rest_framework_simplejwt import views as jwt_views

from .views import UserViewSet, CustomTokenObtainPairView

router = DefaultRouter()
router.register(r'users', UserViewSet, basename='user')

urlpatterns = [
    path(r'token_auth/', CustomTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path(r'token_auth/refresh/', jwt_views.TokenRefreshView.as_view(), name='token_refresh'),
    *router.urls
]
