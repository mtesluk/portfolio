from unittest.mock import patch

from django.test import TestCase
from django.contrib.auth.models import User
from rest_framework.exceptions import AuthenticationFailed

from account.services.token import TokenService
from account.models import WebToken


class TokenServiceTestCase(TestCase):
    def setUp(self):
        self.user = User.objects.create(username='test_user')
        self.token = WebToken.objects.get(user=self.user)

    def test_authenticate_user_with_databse_token(self):

        user, token = TokenService().authenticate_token(self.token)

        self.assertEqual(token, self.token)
        self.assertEqual(user, self.user)

    def test_authenticate_user_not_active(self):
        self.user.is_active = False
        self.user.save()
        service = TokenService()

        self.assertRaises(AuthenticationFailed, service.authenticate_token, self.token)

    @patch('account.services.facebook.FacebookService.debug_token', return_value=(False, {}))
    def test_authenticate_user_with_fb_token_wrong(self, patch):
        service = TokenService()

        self.assertRaises(AuthenticationFailed, service.authenticate_token, 'wrong_key')

    @patch('account.services.facebook.FacebookService.debug_token', return_value=(True, {'user_id': '23'}))
    def test_authenticate_user_with_fb_token(self, patch):
        profile = self.user.profile
        profile.facebook_id = '23'
        profile.save()

        user, token = TokenService().authenticate_token('fb_token')

        self.assertEqual(token.key, 'fb_token')
        self.assertEqual(user, self.user)
