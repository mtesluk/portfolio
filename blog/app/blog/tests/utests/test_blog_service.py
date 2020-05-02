import unittest

from flask import Flask
from flask_testing import TestCase
from flask_sqlalchemy import SQLAlchemy

from app.config import TestingConfig
from app.blog.services import BlogService
from app.blog.models import Blog
from app.extensions import db


class BlogServiceTestCase(TestCase):
    def create_app(self):

        app = Flask(__name__)
        app.config.from_object(TestingConfig())

        db.init_app(app)
        self.session = db.session

        return app

    def setUp(self):
        db.create_all()
        self.service = BlogService()

    def tearDown(self):
        db.session.remove()
        db.drop_all()

    def test_update_blog(self):
        blog = Blog(user_id=0, content='123')
        self.session.add(blog)
        self.session.commit()

        data = {'views': 4, 'user_id': 2, 'cooperators': '1,3'}
        self.service.update_blog(blog.id, data)

        self.assertEqual(4, blog.views)
        self.assertEqual(2, blog.user_id)
        self.assertEqual('1,3', blog.cooperators)

    def test_increase_blog_views(self):
        blog_1 = Blog(user_id=0, content='123', views=0)
        blog_2 = Blog(user_id=0, content='123', views=0)
        self.session.add(blog_1)
        self.session.add(blog_2)
        self.session.commit()

        self.service.increase_blog_view(blog_1.id)
        self.service.increase_blog_view(blog_2.id, 3)

        self.assertEqual(1, blog_1.views)
        self.assertEqual(3, blog_2.views)

    # def test_get_blog(self):
    #     self.assertEqual(1, 1)

    # def test_get_blog_fail(self):
    #     self.assertEqual(1, 1)

    # def test_get_blogs(self):
    #     self.assertEqual(1, 1)

    # def test_get_authors(self):
    #     self.assertEqual(1, 1)

    # def test_get_countries(self):
    #     self.assertEqual(1, 1)

    # def test_create_blog(self):
    #     self.assertEqual(1, 1)

    # def test_set_blog_verified(self):
    #     self.assertEqual(1, 1)

    # def test_remove_blog(self):
    #     self.assertEqual(1, 1)
