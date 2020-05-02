import unittest

from flask import Flask
from flask_testing import TestCase
from flask_sqlalchemy import SQLAlchemy

from app.config import TestingConfig
from app.blog.services import UserService


class UserServiceTestCase(TestCase):
    def create_app(self):

        app = Flask(__name__)
        app.config.from_object(TestingConfig())

        self.db = SQLAlchemy()
        self.db.init_app(app)

        return app

    def setUp(self):
        self.db.create_all()

    def tearDown(self):
        self.db.session.remove()
        self.db.drop_all()

    # def test_heh(self):
    #     self.assertEqual(1, 1)