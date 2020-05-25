from unittest.mock import patch

from flask import Flask
from flask_testing import TestCase
from sqlalchemy.exc import OperationalError

from app.config import TestingConfig
from app.blog.services import BlogService
from app.blog.models import Blog
from app.extensions import db
from app.init import create_app


class BlogServiceTestCase(TestCase):
    def create_app(self):
        app  = create_app(TestingConfig)
        self.session = db.session
        return app

    def setUp(self):
        db.create_all()
        self.service = BlogService()

    def tearDown(self):
        db.session.remove()
        db.drop_all()

    def test_is_user_allowed(self):
        blog = Blog(user_id=0, content='123', title='title')
        self.session.add(blog)
        self.session.commit()

        is_allowed = self.service.is_allowed(0, False, blog.id)

        self.assertTrue(is_allowed)

    def test_is_superuser_allowed(self):
        blog = Blog(user_id=0, content='123', title='title')
        self.session.add(blog)
        self.session.commit()

        is_allowed = self.service.is_allowed(1, True, blog.id)

        self.assertTrue(is_allowed)

    def test_is_superuser_allowed_but_no_content(self):
        is_allowed = self.service.is_allowed(1, True, 0)

        self.assertFalse(is_allowed)

    def test_is_user_not_allowed(self):
        blog = Blog(user_id=0, content='123', title='title')
        self.session.add(blog)
        self.session.commit()

        is_allowed = self.service.is_allowed(2, False, blog.id)

        self.assertFalse(is_allowed)

    def test_is_user_allowed_with_str(self):
        blog = Blog(user_id=0, content='123', title='title')
        self.session.add(blog)
        self.session.commit()

        is_allowed = self.service.is_allowed('0', False, blog.id)

        self.assertTrue(is_allowed)

    def test_is_user_not_allowed_with_Str(self):
        blog = Blog(user_id=0, content='123', title='title')
        self.session.add(blog)
        self.session.commit()

        is_allowed = self.service.is_allowed('2', False, blog.id)

        self.assertFalse(is_allowed)

    def test_update_blog(self):
        blog = Blog(user_id=0, content='123', title='title')
        self.session.add(blog)
        self.session.commit()

        data = {'views': 4, 'user_id': 2, 'cooperators': '1,3', 'title': 'new_title'}
        blog_data = self.service.update_blog(blog.id, data)

        self.assertEqual(4, blog.views)
        self.assertEqual(2, blog.user_id)
        self.assertEqual('1,3', blog.cooperators)
        self.assertEqual('new_title', blog.title)
        self.assertEqual(4, blog_data['views'])
        self.assertEqual(2, blog_data['user_id'])
        self.assertEqual('1,3', blog_data['cooperators'])
        self.assertEqual('new_title', blog_data['title'])

    def test_update_blog_with_null_as_data(self):
        blog = Blog(user_id=0, content='123', title='title')
        self.session.add(blog)
        self.session.commit()

        blog_data = self.service.update_blog(blog.id, None)

        self.assertEqual(0, blog.views)
        self.assertEqual(0, blog.user_id)
        self.assertEqual(0, blog_data['views'])
        self.assertEqual(0, blog_data['user_id'])

    def test_update_blog_with_none_blog(self):
        blog = Blog(user_id=0, content='123', title='title')
        self.session.add(blog)
        self.session.commit()

        blog_data = self.service.update_blog(4)

        self.assertEqual({}, blog_data)

    def test_update_blog_with_wrong_key(self):
        blog = Blog(user_id=0, content='123', title='title')
        self.session.add(blog)
        self.session.commit()

        data = {'user_idd': 2}
        blog_data = self.service.update_blog(blog.id, data)

        self.assertEqual(0, blog.views)
        self.assertEqual(0, blog.user_id)
        self.assertEqual(0, blog_data['views'])
        self.assertEqual(0, blog_data['user_id'])

    def test_increase_blog_views_by_1(self):
        blog = Blog(user_id=0, content='123', views=0, title='title')
        self.session.add(blog)
        self.session.commit()

        self.service.increase_blog_view(blog.id)

        self.assertEqual(1, blog.views)

    def test_increase_blog_views_by_3(self):
        blog = Blog(user_id=0, content='123', views=0, title='title')
        self.session.add(blog)
        self.session.commit()

        self.service.increase_blog_view(blog.id, 3)

        self.assertEqual(3, blog.views)

    def test_increase_blog_views_by_3_str_passed(self):
        blog = Blog(user_id=0, content='123', views=0, title='title')
        self.session.add(blog)
        self.session.commit()

        self.service.increase_blog_view(blog.id, '3')

        self.assertEqual(3, blog.views)

    def test_get_blog(self):
        blog = Blog(user_id=0, content='123', title='title')
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
        self.assertEqual(blog_data['title'], blog.title)
        self.assertEqual(blog_data.get('is_active', 'no_key'), 'no_key')

    def test_get_blog_fail(self):
        blog_data = self.service.get_blog(1)
        self.assertEqual(blog_data, {})

    def test_get_blogs_containing_content(self):
        blog_1 = Blog(user_id=0, content='123', views=2, title='title')
        blog_2 = Blog(user_id=1, content='456', views=3, title='title')
        blog_3 = Blog(user_id=1, content='678', views=7, title='title')
        self.session.add_all([blog_1, blog_2, blog_3])
        self.session.commit()

        filters = {'content': {'type': 'contains', 'value': '4'}}
        blogs_data = self.service.get_blogs(filters)

        self.assertEqual(len(blogs_data), 1)
        self.assertEqual(blogs_data[0]['content'], '456')

    def test_get_blogs_having_equal_content(self):
        blog_1 = Blog(user_id=0, content='123', views=2, title='title')
        blog_2 = Blog(user_id=1, content='456', views=3, title='title')
        blog_3 = Blog(user_id=1, content='678', views=7, title='title')
        self.session.add_all([blog_1, blog_2, blog_3])
        self.session.commit()

        filters = {'content': {'type': 'equal', 'value': '123'}}
        blogs_data = self.service.get_blogs(filters)

        self.assertEqual(blogs_data[0]['content'], '123')
        self.assertEqual(len(blogs_data), 1)

    def test_get_blogs_containing_content_with_ordering_desc(self):
        blog_1 = Blog(user_id=0, content='123', views=2, title='title')
        blog_2 = Blog(user_id=1, content='456', views=3, title='title')
        blog_3 = Blog(user_id=1, content='678', views=7, title='title')
        self.session.add_all([blog_1, blog_2, blog_3])
        self.session.commit()

        filters = {'content': {'type': 'contains', 'value': '6'}}
        ordering = '-views'
        blogs_data = self.service.get_blogs(filters, ordering)

        self.assertEqual(blogs_data[0]['content'], '678')
        self.assertEqual(blogs_data[1]['content'], '456')
        self.assertEqual(len(blogs_data), 2)

    def test_get_blogs_equal_user_id(self):
        blog_1 = Blog(user_id=0, content='123', views=2, title='title')
        blog_2 = Blog(user_id=1, content='456', views=3, title='title')
        blog_3 = Blog(user_id=1, content='678', views=7, title='title')
        self.session.add_all([blog_1, blog_2, blog_3])
        self.session.commit()

        filters = {'user_id': {'type': 'equal', 'value': '1'}}
        blogs_data = self.service.get_blogs(filters)

        self.assertEqual(len(blogs_data), 2)
        self.assertEqual(blogs_data[0]['content'], '456')
        self.assertEqual(blogs_data[1]['content'], '678')

    def test_get_blogs_with_asc_ordering(self):
        blog_1 = Blog(user_id=0, content='123', views=2, title='title')
        blog_2 = Blog(user_id=1, content='456', views=3, title='title')
        blog_3 = Blog(user_id=1, content='678', views=7, title='title')
        self.session.add_all([blog_1, blog_2, blog_3])
        self.session.commit()

        filters = {}
        ordering = 'views'
        blogs_data = self.service.get_blogs(filters, ordering)

        self.assertEqual(blogs_data[0]['content'], '123')
        self.assertEqual(blogs_data[1]['content'], '456')
        self.assertEqual(blogs_data[2]['content'], '678')

    def test_get_blogs_with_null_as_filter(self):
        blog_1 = Blog(user_id=0, content='123', views=2, title='title')
        blog_2 = Blog(user_id=1, content='456', views=3, title='title')
        blog_3 = Blog(user_id=1, content='678', views=7, title='title')
        self.session.add_all([blog_1, blog_2, blog_3])
        self.session.commit()

        blogs_data = self.service.get_blogs(None)

        self.assertEqual(len(blogs_data), 3)

    def test_get_blogs_with_null_as_ordering(self):
        blog_1 = Blog(user_id=0, content='123', views=2, title='title')
        blog_2 = Blog(user_id=1, content='456', views=3, title='title')
        blog_3 = Blog(user_id=1, content='678', views=7, title='title')
        self.session.add_all([blog_1, blog_2, blog_3])
        self.session.commit()

        blogs_data = self.service.get_blogs({}, None)

        self.assertEqual(len(blogs_data), 3)

    def test_get_blogs_with_wrong_filter(self):
        blog_1 = Blog(user_id=0, content='123', views=2, title='title')
        blog_2 = Blog(user_id=1, content='456', views=3, title='title')
        blog_3 = Blog(user_id=1, content='678', views=7, title='title')
        self.session.add_all([blog_1, blog_2, blog_3])
        self.session.commit()

        filters = {'contentt': {'type': 'contains', 'value': '6'}}
        self.assertRaises(AttributeError, self.service.get_blogs, filters)

    def test_get_blog_countries(self):
        blog_1 = Blog(user_id=0, content='123', country='Poland', title='title')
        blog_2 = Blog(user_id=1, content='456', country='Poland', title='title')
        blog_3 = Blog(user_id=1, content='678', country='Germany', title='title')
        self.session.add_all([blog_1, blog_2, blog_3])
        self.session.commit()

        countries = self.service.get_countries()

        self.assertEqual(len(countries), 2)
        self.assertIn('Poland', countries)
        self.assertIn('Germany', countries)

    def test_get_blog_countries_with_null(self):
        blog_1 = Blog(user_id=0, content='123', country='Poland', title='title')
        blog_2 = Blog(user_id=1, content='456', country='Poland', title='title')
        blog_3 = Blog(user_id=1, content='678', title='title')
        self.session.add_all([blog_1, blog_2, blog_3])
        self.session.commit()

        countries = self.service.get_countries()

        self.assertEqual(len(countries), 1)
        self.assertIn('Poland', countries)

    @patch('app.account.services.AccountService.get_users')
    def test_get_authors(self, patch):
        patch.return_value = [{'username': 'mtesluk', 'id': 0}, {'username': 'kdziubek', 'id': 1}]
        blog_1 = Blog(user_id=0, content='123', country='Poland', title='title')
        blog_2 = Blog(user_id=1, content='456', country='Poland', title='title')
        blog_3 = Blog(user_id=1, content='678', country='Germany', title='title')
        self.session.add_all([blog_1, blog_2, blog_3])
        self.session.commit()

        authors = self.service.get_authors()

        self.assertEqual(len(authors), 2)
        self.assertEqual(authors[0]['id'], 0)
        self.assertEqual(authors[0]['username'], 'mtesluk')
        self.assertEqual(authors[1]['id'], 1)
        self.assertEqual(authors[1]['username'], 'kdziubek')

    def test_create_blog(self):
        data = {'content': '123', 'user_id': 0, 'title': 'title'}
        blog_data = self.service.create_blog(data)

        self.assertEqual(Blog.query.filter_by(content='123').first().user_id, data['user_id'])
        self.assertEqual(blog_data['user_id'], data['user_id'])
        self.assertEqual(blog_data['content'], data['content'])
        self.assertEqual(blog_data['views'], 0)
        self.assertEqual(blog_data['title'], data['title'])

    def test_create_blog_no_user_input(self):
        data = {'content': '123'}
        self.assertRaises(OperationalError, self.service.create_blog, data)

    def test_create_blog_no_content(self):
        data = {'user_id': 1}
        self.assertRaises(OperationalError, self.service.create_blog, data)

    def test_set_blog_verified(self):
        blog = Blog(user_id=0, content='123', title='title')
        self.session.add(blog)
        self.session.commit()

        self.assertEqual(blog.is_active, False)

        self.service.set_blog_verified(blog.id)

        self.assertEqual(blog.is_active, True)

    def test_remove_blog(self):
        blog = Blog(user_id=0, content='123', title='title')
        self.session.add(blog)
        self.session.commit()
        blog_id = blog.id

        self.service.remove_blog(blog_id)

        self.assertEqual(Blog.query.get(blog_id), None)

    def test_remove_blog_fail(self):
        blog = Blog(user_id=0, content='123', title='title')
        self.session.add(blog)
        self.session.commit()
        blog_id = blog.id

        self.assertEqual(Blog.query.get(2), None)
        self.service.remove_blog(2)

        self.assertTrue(Blog.query.get(blog_id))
