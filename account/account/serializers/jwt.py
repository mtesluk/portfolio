from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework_simplejwt.tokens import RefreshToken, Token, BlacklistMixin


class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    """Additional data to token payload"""

    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        token['admin'] = user.is_superuser

        return token
