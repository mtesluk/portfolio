from unittest.mock import patch

from flask import Flask, request, jsonify
from flask_testing import TestCase

from app.config import TestingConfig
from app.blog.models import Blog
from app.extensions import db
from app.blog.views import blueprint
from app.errors import errors
from app.init import create_app


class BlogApiTestCase(TestCase):
    def create_app(self):
        app  = create_app(TestingConfig)
        self.session = db.session
        return app

    def setUp(self):
        db.create_all()

    def tearDown(self):
        db.session.remove()
        db.drop_all()

    def test_get_blogs(self):
        blog_1 = Blog(user_id=0, content='123', title='title')
        blog_2 = Blog(user_id=0, content='456', title='title')
        self.session.add_all([blog_1, blog_2])
        self.session.commit()

        response = self.client.get('/api/v3/blogs/')
        data = response.json
        status = response.status_code

        self.assertEqual(status, 200)
        self.assertEqual(len(data), 2)
        self.assertEqual(data[0]['content'], blog_1.content)
        self.assertEqual(data[1]['content'], blog_2.content)

    def test_get_blogs_with_filters_user_id(self):
        blog_1 = Blog(user_id=0, content='123', title='title')
        blog_2 = Blog(user_id=1, content='456', title='title')
        self.session.add_all([blog_1, blog_2])
        self.session.commit()

        params = {'user_id': blog_2.user_id}
        response = self.client.get('/api/v3/blogs/', query_string=params)
        data = response.json
        status = response.status_code

        self.assertEqual(status, 200)
        self.assertEqual(len(data), 1)
        self.assertEqual(data[0]['content'], blog_2.content)

    def test_get_blogs_with_filters_country(self):
        blog_1 = Blog(user_id=0, content='123', title='title', country='Poland')
        blog_2 = Blog(user_id=1, content='456', title='title', country='Poland')
        blog_3 = Blog(user_id=1, content='456', title='title', country='Germany')
        self.session.add_all([blog_1, blog_2, blog_3])
        self.session.commit()

        params = {'country': 'Poland'}
        response = self.client.get('/api/v3/blogs/', query_string=params)
        data = response.json
        status = response.status_code

        self.assertEqual(status, 200)
        self.assertEqual(len(data), 2)

    def test_get_blogs_with_ordering_by_views_desc_and_limit(self):
        blog_1 = Blog(user_id=0, content='123', title='title', country='Poland', views=3)
        blog_2 = Blog(user_id=1, content='456', title='title', country='Poland', views=4)
        blog_3 = Blog(user_id=1, content='456', title='title', country='Germany', views=5)
        blog_4 = Blog(user_id=1, content='456', title='title', country='Germany', views=6)
        self.session.add_all([blog_1, blog_2, blog_3, blog_4])
        self.session.commit()

        params = {'ordering': '-views', 'limit': '2'}
        response = self.client.get('/api/v3/blogs/', query_string=params)
        data = response.json
        status = response.status_code

        self.assertEqual(status, 200)
        self.assertEqual(len(data), 2)
        self.assertEqual(data[0]['views'], 6)
        self.assertEqual(data[1]['views'], 5)

    def test_get_blogs_with_ordering_by_views_asc_and_limit(self):
        blog_1 = Blog(user_id=0, content='123', title='title', country='Poland', views=3)
        blog_2 = Blog(user_id=1, content='456', title='title', country='Poland', views=4)
        blog_3 = Blog(user_id=1, content='456', title='title', country='Germany', views=5)
        blog_4 = Blog(user_id=1, content='456', title='title', country='Germany', views=6)
        self.session.add_all([blog_1, blog_2, blog_3, blog_4])
        self.session.commit()

        params = {'ordering': 'views', 'limit': '3'}
        response = self.client.get('/api/v3/blogs/', query_string=params)
        data = response.json
        status = response.status_code

        self.assertEqual(status, 200)
        self.assertEqual(len(data), 3)
        self.assertEqual(data[0]['views'], 3)
        self.assertEqual(data[1]['views'], 4)
        self.assertEqual(data[2]['views'], 5)

    def test_get_blogs_with_wrong_filters(self):
        blog_1 = Blog(user_id=0, content='123', title='title')
        blog_2 = Blog(user_id=1, content='456', title='title')
        self.session.add_all([blog_1, blog_2])
        self.session.commit()

        params = {'user_idddddd': 'asd'}
        response = self.client.get('/api/v3/blogs/', query_string=params)
        data = response.json
        status = response.status_code

        self.assertEqual(status, 200)
        self.assertEqual(len(data), 2)

    def test_get_blog(self):
        blog = Blog(user_id=0, content='123', cooperators='1,4', country='Poland', title='title')
        self.session.add(blog)
        self.session.commit()

        response = self.client.get(f'/api/v3/blogs/{blog.id}/')
        data = response.json
        status = response.status_code

        self.assertEqual(status, 200)
        self.assertEqual(data['content'], blog.content)
        self.assertEqual(data['views'], blog.views)
        self.assertEqual(data['cooperators'], blog.cooperators)
        self.assertEqual(data['user_id'], blog.user_id)
        self.assertEqual(data['country'], blog.country)
        self.assertEqual(data['title'], blog.title)

    def test_get_blog_with_wrong_id(self):
        blog = Blog(user_id=0, content='123', cooperators='1,4', country='Poland', title='title')
        self.session.add(blog)
        self.session.commit()

        response = self.client.get('/api/v3/blogs/2/')
        data = response.json
        status = response.status_code

        self.assertEqual(status, 400)
        self.assertTrue(data['message'])

    @patch('app.account.services.requests.get')
    @patch('app.account.services.request')
    @patch('app.account.services.cache.get', return_value=False)
    def test_post_blog_with_correct_token(self, patch_1, patch_2, patch_3):
        patch_2.headers.get.return_value = 'Token 123'
        patch_3.return_value.status_code = 200

        payload = {'content': '123', 'country': 'Poland', 'user_id': 1, 'title': 'title'}
        response = self.client.post('/api/v3/blogs/', json=payload)
        data = response.json
        status = response.status_code

        self.assertEqual(status, 201)
        self.assertEqual(data['content'], payload['content'])
        self.assertEqual(data['views'], 0)
        self.assertEqual(data['user_id'], payload['user_id'])
        self.assertEqual(data['country'], payload['country'])
        self.assertEqual(data['title'], payload['title'])

    @patch('app.account.services.request')
    @patch('app.account.services.cache.get', return_value=True)
    def test_post_blog_without_token(self, patch_1, patch_2):
        patch_2.headers.get.return_value = None

        payload = {'content': '123', 'country': 'Poland', 'user_id': 1, 'title': 'title'}
        response = self.client.post('/api/v3/blogs/', json=payload)
        data = response.json
        status = response.status_code

        self.assertEqual(status, 401)

    @patch('app.account.services.requests.get')
    @patch('app.account.services.request')
    @patch('app.account.services.cache.get', return_value=False)
    def test_post_blog_with_wrong_token(self, patch_1, patch_2, patch_3):
        patch_2.headers.get.return_value = 'Token 123'
        patch_3.return_value.status_code = 401

        payload = {'content': '123', 'country': 'Poland', 'user_id': 1, 'title': 'title'}
        response = self.client.post('/api/v3/blogs/', json=payload)
        data = response.json
        status = response.status_code

        self.assertEqual(status, 401)

    @patch('app.account.services.requests.get')
    @patch('app.account.services.request')
    @patch('app.account.services.cache.get', return_value=False)
    def test_post_blog_with_wrong_data(self, patch_1, patch_2, patch_3):
        patch_2.headers.get.return_value = 'Token 123'
        patch_3.return_value.status_code = 200

        payload = {'content': '123', 'countryya': 'Poland', 'user_id': 1, 'title': 'title'}
        response = self.client.post('/api/v3/blogs/', json=payload)
        data = response.json
        status = response.status_code

        self.assertEqual(status, 400)
        self.assertTrue(data['message'])

    @patch('app.account.services.requests.get')
    @patch('app.account.services.request')
    @patch('app.account.services.cache.get', return_value=False)
    def test_post_blog_with_no_data(self, patch_1, patch_2, patch_3):
        patch_2.headers.get.return_value = 'Token 123'
        patch_3.return_value.status_code = 200

        payload = {}
        response = self.client.post('/api/v3/blogs/', json=payload)
        data = response.json
        status = response.status_code

        self.assertTrue(data['message'])
        self.assertEqual(status, 400)

    @patch('app.account.services.requests.get')
    @patch('app.account.services.request')
    @patch('app.account.services.cache.get', return_value=False)
    def test_put_blog(self, patch_1, patch_2, patch_3):
        patch_2.headers.get.return_value = 'Token 123'
        patch_3.return_value.status_code = 200

        blog = Blog(user_id=0, content='123', cooperators='1,4', country='Poland', title='title')
        self.session.add(blog)
        self.session.commit()

        payload = {'content': '456', 'title': 'new_title'}
        response = self.client.put(f'/api/v3/blogs/{blog.id}/', json=payload)
        updated_blog = response.json
        status = response.status_code

        self.assertEqual(status, 200)
        self.assertEqual(updated_blog['content'], payload['content'])
        self.assertEqual(blog.content, payload['content'])
        self.assertEqual(updated_blog['title'], payload['title'])
        self.assertEqual(blog.title, payload['title'])

    @patch('app.account.services.requests.get')
    @patch('app.account.services.request')
    @patch('app.account.services.cache.get', return_value=False)
    def test_put_blog_with_wrong_data(self, patch_1, patch_2, patch_3):
        patch_2.headers.get.return_value = 'Token 123'
        patch_3.return_value.status_code = 200

        blog = Blog(user_id=0, content='123', cooperators='1,4', country='Poland', title='title')
        self.session.add(blog)
        self.session.commit()

        payload = {'conttent': '456', 'cooperators': '1,5'}
        response = self.client.put(f'/api/v3/blogs/{blog.id}/', json=payload)
        updated_blog = response.json
        status = response.status_code

        self.assertEqual(status, 200)
        self.assertEqual(updated_blog['content'], blog.content)
        self.assertEqual(updated_blog['cooperators'], payload['cooperators'])

    @patch('app.account.services.requests.get')
    @patch('app.account.services.request')
    @patch('app.account.services.cache.get', return_value=False)
    def test_remove_blog(self, patch_1, patch_2, patch_3):
        patch_2.headers.get.return_value = 'Token 123'
        patch_3.return_value.status_code = 200

        blog = Blog(user_id=0, content='123', cooperators='1,4', country='Poland', title='title')
        self.session.add(blog)
        self.session.commit()
        blog_id = blog.id

        response = self.client.delete(f'/api/v3/blogs/{blog_id}/')
        status = response.status_code

        self.assertEqual(status, 204)
        self.assertEqual(Blog.query.get(blog_id), None)

    @patch('app.account.services.requests.get')
    def test_get_authors(self, patch):
        patch.return_value.json = lambda: [{'username': 'mtesluk', 'id': 0}, {'username': 'kdziubek', 'id': 1}]
        blog_1 = Blog(user_id=0, content='123', title='title')
        blog_2 = Blog(user_id=1, content='456', title='title')
        self.session.add_all([blog_1, blog_2])
        self.session.commit()

        response = self.client.get('/api/v3/blogs/authors/')
        data = response.json
        status = response.status_code

        self.assertEqual(status, 200)
        self.assertEqual(len(data), 2)
        self.assertEqual(data[0]['id'], 0)
        self.assertEqual(data[0]['username'], 'mtesluk')
        self.assertEqual(data[1]['id'], 1)
        self.assertEqual(data[1]['username'], 'kdziubek')

    @patch('app.account.services.AccountService.get_users')
    def test_get_authors_ordered_by_blogs_views_and_limit(self, patch):
        patch.return_value = [{'username': 'mtesluk', 'id': 2}, {'username': 'kdziubek', 'id': 3}, {'username': 'kdziubek', 'id': 1}]
        blog_1 = Blog(user_id=0, content='123', title='title1', views=1)
        blog_2 = Blog(user_id=1, content='456', title='title2', views=2)
        blog_3 = Blog(user_id=2, content='456', title='title3', views=4)
        blog_4 = Blog(user_id=3, content='456', title='title4', views=3)
        self.session.add_all([blog_1, blog_2, blog_3, blog_4])
        self.session.commit()

        params = {'limit': '3', 'ordering': '-views'}
        response = self.client.get('/api/v3/blogs/authors/', query_string=params)
        data = response.json
        status = response.status_code

        self.assertEqual(status, 200)
        self.assertEqual(len(data), 3)
        self.assertEqual(data[0]['id'], blog_3.user_id)
        patch.assert_called_with([2, 3, 1])

    def test_get_countries(self):
        blog_1 = Blog(user_id=0, content='123', country='Poland', title='title')
        blog_2 = Blog(user_id=0, content='456', country='Germany', title='title')
        self.session.add_all([blog_1, blog_2])
        self.session.commit()

        response = self.client.get('/api/v3/blogs/countries/')
        data = response.json
        status = response.status_code

        self.assertEqual(status, 200)
        self.assertEqual(len(data), 2)
        self.assertIn('Poland', data)
        self.assertIn('Germany', data)

    def test_get_countries_ordered_by_blogs_views_and_limit(self):
        blog_1 = Blog(user_id=0, content='123', country='Poland', title='title', views=1)
        blog_2 = Blog(user_id=0, content='456', country='Germany', title='title', views=5)
        blog_3 = Blog(user_id=0, content='456', country='Italy', title='title', views=2)
        self.session.add_all([blog_1, blog_2, blog_3])
        self.session.commit()

        params = {'limit': '2', 'ordering': '-views'}
        response = self.client.get('/api/v3/blogs/countries/', query_string=params)
        data = response.json
        status = response.status_code

        self.assertEqual(status, 200)
        self.assertEqual(len(data), 2)
        self.assertEqual('Germany', data[0])
        self.assertEqual('Italy', data[1])
