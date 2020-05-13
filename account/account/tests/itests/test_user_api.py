from rest_framework.test import APITestCase
from django.contrib.auth.models import User


class UserApiTestCase(APITestCase):
    def setUp(self):
        self.user = User.objects.create(username='test_user')
        self.user.set_password('passwd')
        self.user.save()

    def test_checking_existing_fb_account(self):
        profile = self.user.profile
        profile.facebook_id = '123'
        profile.save()

        response = self.client.get('/api/v1/users/exist_fb_account/', {'fb_id': '123'})
        data = response.json()

        self.assertEqual(data['exists'], True)

    def test_checking_existing_fb_account_fail(self):
        response = self.client.get('/api/v1/users/exist_fb_account/', {'fb_id': '123'})
        data = response.json()

        self.assertEqual(data['exists'], False)

    def test_getting_my_data(self):
        self.client.credentials(HTTP_AUTHORIZATION='Token ' + self.user.auth_token.key)

        response = self.client.get('/api/v1/users/me/')
        data = response.json()

        self.assertEqual(response.status_code, 200)
        self.assertEqual(data['username'], self.user.username)
        self.assertEqual(data['profile']['location'], self.user.profile.location)
        self.assertEqual(data['first_name'], self.user.first_name)

    def test_getting_my_data_fail(self):
        response = self.client.get('/api/v1/users/me/')

        self.assertEqual(response.status_code, 403)

    def test_create_new_user(self):
        data = {'username': 'user_123', 'password': '123', 'email': 'e@email.com'}
        response = self.client.post('/api/v1/users/', data)

        self.assertEqual(response.status_code, 201)
        user = User.objects.get(username='user_123')
        self.assertTrue(user)

    def test_create_new_user_with_no_password(self):
        data = {'username': 'user_123', 'profile': {'facebook_id': '2747371888677359'}}
        response = self.client.post('/api/v1/users/', data)

        self.assertEqual(response.status_code, 201)
        user = User.objects.get(username='user_123')
        self.assertTrue(user)

    def test_create_new_user_fail(self):
        data = {'username': self.user.username, 'password': '123'}
        response = self.client.post('/api/v1/users/', data)
        data = response.json()

        self.assertEqual(response.status_code, 500)
        self.assertEqual(data['message'], 'User with provided data already exists')

    def test_is_auth_fail(self):
        response = self.client.get('/api/v1/users/is_authenticated/')

        self.assertEqual(response.status_code, 403)

    def test_is_auth(self):
        self.client.credentials(HTTP_AUTHORIZATION='Token ' + self.user.auth_token.key)

        response = self.client.get('/api/v1/users/is_authenticated/')
        data = response.json()

        self.assertEqual(response.status_code, 200)
        self.assertEqual(data['is_auth'], True)

    def test_get_users_filred_by_id_with_ordering(self):
        user_2 = User.objects.create(username='test_user_2')
        user_3 = User.objects.create(username='test_user_3')

        params = {'ids': f'{self.user.id},{user_2.id}', 'ordering': '-id'}
        response = self.client.get('/api/v1/users/', params)
        users = response.json()

        usernames = [user['username'] for user in users]
        self.assertEqual(len(usernames), 2)
        self.assertIn('test_user', usernames)
        self.assertIn('test_user_2', usernames)
        self.assertNotIn('test_user_3', usernames)
        self.assertEqual(users[1]['id'], self.user.id)
        self.assertEqual(users[0]['id'], user_2.id)

    def test_get_user(self):
        user_2 = User.objects.create(username='test_user_2')

        response = self.client.get('/api/v1/users/')
        users = response.json()

        usernames = [user['username'] for user in users]
        self.assertEqual(len(usernames), 2)
        self.assertIn('test_user', usernames)
        self.assertIn('test_user_2', usernames)
