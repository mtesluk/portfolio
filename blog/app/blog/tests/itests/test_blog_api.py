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
        blog_1 = Blog(user_id=0, content='123')
        blog_2 = Blog(user_id=0, content='456')
        self.session.add_all([blog_1, blog_2])
        self.session.commit()

        response = self.client.get('/api/v1/blogs/')
        data = response.json
        status = response.status_code

        self.assertEqual(status, 200)
        self.assertEqual(len(data), 2)
        self.assertEqual(data[0]['content'], blog_1.content)
        self.assertEqual(data[1]['content'], blog_2.content)

    def test_get_blog(self):
        blog = Blog(user_id=0, content='123', cooperators='1,4', country='Poland')
        self.session.add(blog)
        self.session.commit()

        response = self.client.get(f'/api/v1/blogs/{blog.id}')
        data = response.json
        status = response.status_code

        self.assertEqual(status, 200)
        self.assertEqual(data['content'], blog.content)
        self.assertEqual(data['views'], blog.views)
        self.assertEqual(data['cooperators'], blog.cooperators)
        self.assertEqual(data['user_id'], blog.user_id)
        self.assertEqual(data['country'], blog.country)

    def test_get_blog_with_wrong_id(self):
        blog = Blog(user_id=0, content='123', cooperators='1,4', country='Poland')
        self.session.add(blog)
        self.session.commit()

        response = self.client.get('/api/v1/blogs/2')
        data = response.json
        status = response.status_code

        self.assertEqual(status, 400)
        self.assertTrue(data['message'])

    def test_post_blog(self):
        payload = {'content': '123', 'country': 'Poland', 'user_id': 1}
        response = self.client.post('/api/v1/blogs/', json=payload)
        data = response.json
        status = response.status_code

        self.assertEqual(status, 201)
        self.assertEqual(data['content'], payload['content'])
        self.assertEqual(data['views'], 0)
        self.assertEqual(data['user_id'], payload['user_id'])
        self.assertEqual(data['country'], payload['country'])

    def test_post_blog_with_wrong_data(self):
        payload = {'content': '123', 'countryya': 'Poland', 'user_id': 1}
        response = self.client.post('/api/v1/blogs/', json=payload)
        data = response.json
        status = response.status_code

        self.assertEqual(status, 400)
        self.assertTrue(data['message'])

    def test_post_blog_with_no_data(self):
        payload = {}
        response = self.client.post('/api/v1/blogs/', json=payload)
        data = response.json
        status = response.status_code

        self.assertTrue(data['message'])
        self.assertEqual(status, 400)

    def test_put_blog(self):
        blog = Blog(user_id=0, content='123', cooperators='1,4', country='Poland')
        self.session.add(blog)
        self.session.commit()

        payload = {'content': '456'}
        response = self.client.put(f'/api/v1/blogs/{blog.id}', json=payload)
        updated_blog = response.json
        status = response.status_code

        self.assertEqual(status, 200)
        self.assertEqual(updated_blog['content'], payload['content'])
        self.assertEqual(blog.content, payload['content'])

    def test_put_blog_with_wrong_data(self):
        blog = Blog(user_id=0, content='123', cooperators='1,4', country='Poland')
        self.session.add(blog)
        self.session.commit()

        payload = {'conttent': '456', 'cooperators': '1,5'}
        response = self.client.put(f'/api/v1/blogs/{blog.id}', json=payload)
        updated_blog = response.json
        status = response.status_code

        self.assertEqual(status, 200)
        self.assertEqual(updated_blog['content'], blog.content)
        self.assertEqual(updated_blog['cooperators'], payload['cooperators'])

    def test_remove_blog(self):
        blog = Blog(user_id=0, content='123', cooperators='1,4', country='Poland')
        self.session.add(blog)
        self.session.commit()
        blog_id = blog.id

        response = self.client.delete(f'/api/v1/blogs/{blog_id}')
        status = response.status_code

        self.assertEqual(status, 204)
        self.assertEqual(Blog.query.get(blog_id), None)

    @patch('app.account.services.requests.get')
    def test_get_authors(self, patch):
        patch.return_value.json = lambda: [{'username': 'mtesluk', 'id': 0}, {'username': 'kdziubek', 'id': 1}]
        blog_1 = Blog(user_id=0, content='123')
        blog_2 = Blog(user_id=1, content='456')
        self.session.add_all([blog_1, blog_2])
        self.session.commit()

        response = self.client.get('/api/v1/blogs/authors')
        data = response.json
        status = response.status_code

        self.assertEqual(status, 200)
        self.assertEqual(len(data), 2)
        self.assertEqual(data[0]['id'], 0)
        self.assertEqual(data[0]['username'], 'mtesluk')
        self.assertEqual(data[1]['id'], 1)
        self.assertEqual(data[1]['username'], 'kdziubek')

    def test_get_countries(self):
        blog_1 = Blog(user_id=0, content='123', country='Poland')
        blog_2 = Blog(user_id=0, content='456', country='Germany')
        self.session.add_all([blog_1, blog_2])
        self.session.commit()

        response = self.client.get('/api/v1/blogs/countries')
        data = response.json
        status = response.status_code

        self.assertEqual(status, 200)
        self.assertEqual(len(data), 2)
        self.assertIn('Poland', data)
        self.assertIn('Germany', data)
