from rest_framework.authentication import TokenAuthentication
from rest_framework import exceptions
from django.conf import settings
from django.utils.translation import gettext_lazy as _
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework_simplejwt.exceptions import InvalidToken

from .services.facebook import FacebookService
# from .models import WebToken


class CustomTokenAuthentication(TokenAuthentication):
    # model = WebToken

    def authenticate_credentials(self, key):
        model = self.get_model()
        token = model.objects.select_related('user').filter(key=key)
        if token.exists():
            token = token.first()
            if not token.user.is_active:
                raise exceptions.AuthenticationFailed(_('User inactive or deleted.'))

            return (token.user, token)
        else:
            is_valid, data = FacebookService.debug_token(key)
            if is_valid:
                user_token = model.objects.select_related('user').filter(user__profile__facebook_id=data['user_id']).first()
                if user_token:
                    user_token.key = key
                    user_token.save()
                    return (user_token.user, user_token)
        raise exceptions.AuthenticationFailed(_('Invalid token.'))


class CustomJWTAuthentication(JWTAuthentication):
    def authenticate(self, request):
        header = self.get_header(request)
        if header is None:
            return None

        raw_token = self.get_raw_token(header)
        if raw_token is None:
            return None

        # try:
        validated_token = self.get_validated_token(raw_token)
        # except InvalidToken:
        #     pass

        return self.get_user(validated_token), validated_token
