from typing import List

from rest_framework import exceptions
from django.utils.translation import gettext_lazy as _
from django.contrib.auth.models import User

from account.services.facebook import FacebookService
from account.models import WebToken


class TokenService:
    """
    Service for manage token data
    """
    model = WebToken

    def authenticate_token(self, key: str):
        """
        Check if token exists in database, if not check if this key is facebook token
        If there is token in fb like this than check if some user is registered for this token
        If yes then it update this token in database
        :param key - string of token given to check
        :return tuple(user: User, token: WebToken)
        """
        filters = {'key': key}
        token = self._get_tokens(filters).select_related('user').first()
        if token:
            self._validate_user_activation(token.user)
            return (token.user, token)
        else:
            is_valid, data = FacebookService.debug_token(key)
            if is_valid:
                user_token = self._set_token_to_fb_account(key, data['user_id'])
                if user_token:
                    return (user_token.user, user_token)
        raise exceptions.AuthenticationFailed(_('Invalid token.'))

    def _validate_user_activation(self, user: User):
        if not user.is_active:
            raise exceptions.AuthenticationFailed(_('User inactive or deleted.'))

    def _set_token_to_fb_account(self, key: str, user_id: str):
        filters = {'user__profile__facebook_id': user_id}
        user_token = self._get_tokens(filters).select_related('user').first()
        if user_token:
            values = {'key': key}
            self._update_token(user_token, values)
        return user_token

    def _get_tokens(self, filters: dict):
        return self.model.objects.filter(**filters)

    def _token_exists(self, tokens: List[WebToken]):
        return tokens.exists()

    def _update_token(self, token: WebToken, values: dict):
        for key, value in values.items():
            setattr(token, key, value)
