from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework_simplejwt.tokens import RefreshToken, Token, BlacklistMixin


class CustomToken(Token):
    @classmethod
    def for_user(cls, user):
        token = super().for_user(user)
        token['admin'] = user.is_superuser
        print(1111111111111)
        print(user)
        return token


class CustomRefreshToken(RefreshToken, BlacklistMixin, CustomToken):
    pass


class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = CustomRefreshToken.for_user(user)
        return token