from unittest.mock import patch

from flask import Flask
from flask_testing import TestCase

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
        blog_data = self.service.update_blog(blog.id, data)

        self.assertEqual(4, blog.views)
        self.assertEqual(2, blog.user_id)
        self.assertEqual('1,3', blog.cooperators)
        self.assertEqual(4, blog_data['views'])
        self.assertEqual(2, blog_data['user_id'])
        self.assertEqual('1,3', blog_data['cooperators'])

    def test_increase_blog_views(self):
        blog_1 = Blog(user_id=0, content='123', views=0)
        blog_2 = Blog(user_id=0, content='123', views=0)
        self.session.add_all([blog_1, blog_2])
        self.session.commit()

        self.service.increase_blog_view(blog_1.id)
        self.service.increase_blog_view(blog_2.id, 3)

        self.assertEqual(1, blog_1.views)
        self.assertEqual(3, blog_2.views)

    def test_get_blog(self):
        blog = Blog(user_id=0, content='123')
        self.session.add(blog)
        self.session.commit()

        blog_data = self.service.get_blog(blog.id)

        self.assertEqual(blog_data['id'], blog.id)
        self.assertEqual(blog_data['user_id'], blog.user_id)
        self.assertEqual(blog_data['cooperators'], blog.cooperators)
        self.assertEqual(blog_data['content'], blog.content)
        self.assertEqual(blog_data['photo_names'], blog.photo_names)
        self.assertEqual(blog_data['views'], blog.views)
        self.assertEqual(blog_data['country'], blog.country)
        self.assertEqual(blog_data.get('is_active', 'no_key'), 'no_key')

    def test_get_blog_fail(self):
        blog_data = self.service.get_blog(1)
        self.assertEqual(blog_data, {})

    def test_get_blogs(self):
        blog_1 = Blog(user_id=0, content='123', views=2)
        blog_2 = Blog(user_id=1, content='456', views=3)
        blog_3 = Blog(user_id=1, content='678', views=7)
        self.session.add_all([blog_1, blog_2, blog_3])
        self.session.commit()

        filters = {'content': {'type': 'contains', 'value': '4'}}
        blogs_data = self.service.get_blogs(filters)
        self.assertEqual(len(blogs_data), 1)
        self.assertEqual(blogs_data[0]['content'], '456')

        filters = {'content': {'type': 'equal', 'value': '123'}}
        blogs_data = self.service.get_blogs(filters)
        self.assertEqual(blogs_data[0]['content'], '123')
        self.assertEqual(len(blogs_data), 1)

        filters = {'content': {'type': 'contains', 'value': '6'}}
        ordering = '-views'
        blogs_data = self.service.get_blogs(filters, ordering)
        self.assertEqual(blogs_data[0]['content'], '678')
        self.assertEqual(blogs_data[1]['content'], '456')
        self.assertEqual(len(blogs_data), 2)

        filters = {}
        ordering = 'views'
        blogs_data = self.service.get_blogs(filters, ordering)
        self.assertEqual(blogs_data[0]['content'], '123')
        self.assertEqual(blogs_data[1]['content'], '456')
        self.assertEqual(blogs_data[2]['content'], '678')

    def test_get_countries(self):
        blog_1 = Blog(user_id=0, content='123', country='Poland')
        blog_2 = Blog(user_id=1, content='456', country='Poland')
        blog_3 = Blog(user_id=1, content='678', country='Germany')
        self.session.add_all([blog_1, blog_2, blog_3])
        self.session.commit()

        countries = self.service.get_countries()

        self.assertEqual(len(countries), 2)
        self.assertIn('Poland', countries)
        self.assertIn('Germany', countries)

    @patch('app.account.services.AccountService.get_users')
    def test_get_authors(self, patch):
        patch.return_value = [{'username': 'mtesluk', 'id': 0}, {'username': 'kdziubek', 'id': 1}]
        blog_1 = Blog(user_id=0, content='123', country='Poland')
        blog_2 = Blog(user_id=1, content='456', country='Poland')
        blog_3 = Blog(user_id=1, content='678', country='Germany')
        self.session.add_all([blog_1, blog_2, blog_3])
        self.session.commit()

        authors = self.service.get_authors()
        self.assertEqual(len(authors), 2)
        self.assertEqual(authors[0]['id'], 0)
        self.assertEqual(authors[0]['username'], 'mtesluk')
        self.assertEqual(authors[1]['id'], 1)
        self.assertEqual(authors[1]['username'], 'kdziubek')

    def test_create_blog(self):
        data = {'content': '123', 'user_id': 0}
        blog_data = self.service.create_blog(data)

        self.assertEqual(Blog.query.filter_by(content='123').first().user_id, data['user_id'])
        self.assertEqual(blog_data['user_id'], data['user_id'])
        self.assertEqual(blog_data['content'], data['content'])
        self.assertEqual(blog_data['views'], 0)

    def test_set_blog_verified(self):
        blog = Blog(user_id=0, content='123')
        self.session.add(blog)
        self.session.commit()

        self.assertEqual(blog.is_active, False)

        self.service.set_blog_verified(blog.id)

        self.assertEqual(blog.is_active, True)

    def test_remove_blog(self):
        blog = Blog(user_id=0, content='123')
        self.session.add(blog)
        self.session.commit()
        blog_id = blog.id

        blog_data = self.service.remove_blog(blog_id)

        self.assertEqual(Blog.query.get(blog_id), None)
