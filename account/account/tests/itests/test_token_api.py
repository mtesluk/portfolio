from rest_framework.test import APITestCase
from django.contrib.auth.models import User


class TokenApiTestCase(APITestCase):
    def setUp(self):
        self.user = User.objects.create(username='test_user')
        self.user.set_password('passwd')
        self.user.save()

    def test_login(self):
        response = self.client.post(
            '/api/v2/api_token_auth/',
            {'username': self.user.username, 'password': 'passwd'})
        data = response.json()
        self.assertEqual(data['token'], self.user.auth_token.key)

    def test_login_fail(self):
        response = self.client.post(
            '/api/v2/api_token_auth/',
            {'username': self.user.username, 'password': 'ads'})
        data = response.json()
        self.assertEqual(data['non_field_errors'], ['Unable to log in with provided credentials.'])
