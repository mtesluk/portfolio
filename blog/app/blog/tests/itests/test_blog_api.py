from unittest.mock import patch

from flask import Flask, request
from flask_testing import TestCase

from app.config import TestingConfig
from app.blog.models import Blog
from app.extensions import db


class BlogApiTestCase(TestCase):
    def create_app(self):

        app = Flask(__name__)
        app.config.from_object(TestingConfig())

        db.init_app(app)
        self.session = db.session

        return app

    def setUp(self):
        db.create_all()

    def tearDown(self):
        db.session.remove()
        db.drop_all()

    # @patch('app.account.services.requests.get')
    def test_get_blogs(self):
        # patch.return_value.json = [{'username': 'mtesluk', 'id': 0}, {'username': 'kdziubek', 'id': 1}]
        blog = Blog(user_id=0, content='123')
        self.session.add(blog)
        self.session.commit()

        response = self.client.get('/api/v1/blogs')
        data = response.json
        print(data)

    # def test_get_blog(self):
    #     response = self.client.get('/api/v1/blogs/1')
    #     data = response.json

    # def test_post_blog(self):
    #     response = self.client.get('/api/v1/blogs/')
    #     data = response.json

    # def test_put_blog(self):
    #     response = self.client.get('/api/v1/blogs/1')
    #     data = response.json

    # def test_remove_blog(self):
    #     response = self.client.get('/api/v1/blogs/1')
    #     data = response.json

    # def test_get_authors(self):
    #     response = self.client.get('/api/v1/blogs/')
    #     data = response.json

    # def test_get_countries(self):
    #     response = self.client.get('/api/v1/blogs/')
    #     data = response.json