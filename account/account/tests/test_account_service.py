from unittest.mock import patch

from django.test import TestCase
from django.contrib.auth.models import User
from rest_framework.exceptions import AuthenticationFailed
from rest_framework.serializers import ValidationError
from django.core.exceptions import ObjectDoesNotExist, FieldError

from account.services.user import UserService


class UserServiceTestCase(TestCase):
    def setUp(self):
        self.user = User.objects.create(username='test_user')
        self.user.set_password('passwd')
        self.user.save()

    def test_create_user(self):
        data = {'username': 'test_user_1', 'password': '123', 'profile': {}}
        user = UserService().create_user(data)
        user = User.objects.get(username='test_user_1')
        self.assertEqual(user.username, 'test_user_1')
        self.assertFalse(user.is_superuser)

    def test_create_user_wrong_data(self):
        data = {'user_name': 'test_name'}
        service = UserService()
        self.assertRaises(ValidationError, service.create_user, data)

        data = {'user_name': 'test_name_2', 'password': '123', 'profile': {}}
        service = UserService()
        self.assertRaises(TypeError, service.create_user, data)

    def test_sign_in(self):
        token = UserService().sign_in(self.user)
        self.assertEqual(token, self.user.auth_token.key)

    def test_if_fb_profile_exists(self):
        profile = self.user.profile
        profile.facebook_id = 'fb_id'
        profile.save()
        exists = UserService().fb_account_exists('fb_id')
        self.assertTrue(exists)

    def test_if_fb_profile_not_exists(self):
        exists = UserService().fb_account_exists('fb_id')
        self.assertFalse(exists)

    def test_update_user(self):
        values = {'username': 'user'}
        user_id = self.user.id
        UserService().update_user(user_id, values)
        user = User.objects.get(id=user_id)
        self.assertEqual(user.username, 'user')

        values = {'profile': {'location': 'England'}}
        UserService().update_user(user_id, values)
        user = User.objects.get(id=user_id)
        self.assertEqual(user.profile.location, 'England')

    def test_remove_user(self):
        user_2 = User.objects.create(username='test_user_2')
        UserService().remove_user(user_2.id)
        service = UserService()
        self.assertRaises(ObjectDoesNotExist, service.remove_user, user_2.id)

    def test_remove_user_fail(self):
        service = UserService()
        self.assertRaises(ObjectDoesNotExist, service.remove_user, 62)

    def test_get_user(self):
        user = UserService().get_user(self.user.id)
        self.assertEqual(user['username'], self.user.username)
        self.assertEqual(user.get('password', ''), '')

    def test_get_user_fail(self):
        service = UserService()
        self.assertRaises(ObjectDoesNotExist, service.get_user, 62)

    def test_get_users(self):
        user_2 = User.objects.create(username='test_user_2', first_name="John")
        profile_2 = user_2.profile
        profile_2.location = 'England'
        profile_2.save()
        user_3 = User.objects.create(username='test_user_3', is_superuser=True)
        profile__3 = user_3.profile
        profile__3.location = 'England'
        profile__3.save()

        filters = {'first_name': {'type': 'equal', 'value': 'John'}}
        users = UserService().get_users(filters)
        for user in users:
            self.assertEqual(user['first_name'], 'John')

        filters = {'is_superuser': {'type': 'equal', 'value': True}}
        users = UserService().get_users(filters)
        for user in users:
            self.assertEqual(user['is_superuser'], True)

        filters = {'first_name': {'type': 'equal', 'value': 'John'}}
        profile_filters = {'location': {'type': 'contains', 'value': 'Engl'}}
        users = UserService().get_users(filters, profile_filters)
        for user in users:
            self.assertIn(user['profile']['location'], 'England')
