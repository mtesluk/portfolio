from unittest.mock import patch

from flask import Flask
from flask_testing import TestCase

from app.config import TestingConfig
from app.account.services import AccountService
from app.extensions import db
from app.init import create_app


class UserServiceTestCase(TestCase):
    def create_app(self):
        app  = create_app(TestingConfig)
        self.session = db.session
        return app

    def setUp(self):
        db.create_all()
        self.service = AccountService()

    def tearDown(self):
        self.session.remove()
        db.drop_all()

    @patch('app.account.services.requests.get')
    def test_getting_users_id_int(self, patch):
        patch.return_value.json = lambda: [{'username': 'mtesluk', 'id': 0}, {'username': 'kdziubek', 'id': 1}]

        users = self.service.get_users([0,1])

        self.assertEqual(len(users), 2)
        self.assertEqual(users[0]['id'], 0)
        self.assertEqual(users[0]['username'], 'mtesluk')
        self.assertEqual(users[1]['id'], 1)
        self.assertEqual(users[1]['username'], 'kdziubek')

    @patch('app.account.services.requests.get')
    def test_getting_users_id_str(self, patch):
        patch.return_value.json = lambda: [{'username': 'mtesluk', 'id': 0}, {'username': 'kdziubek', 'id': 1}]

        users = self.service.get_users(['0','1'])

        self.assertEqual(len(users), 2)
        self.assertEqual(users[0]['id'], 0)
        self.assertEqual(users[0]['username'], 'mtesluk')
        self.assertEqual(users[1]['id'], 1)
        self.assertEqual(users[1]['username'], 'kdziubek')

    @patch('app.account.services.requests.get')
    def test_getting_users_ids_mix_id_and_str(self, patch):
        patch.return_value.json = lambda: [{'username': 'mtesluk', 'id': 0}, {'username': 'kdziubek', 'id': 1}]

        users = self.service.get_users(['0', 1])

        self.assertEqual(len(users), 2)
        self.assertEqual(users[0]['id'], 0)
        self.assertEqual(users[0]['username'], 'mtesluk')
        self.assertEqual(users[1]['id'], 1)
        self.assertEqual(users[1]['username'], 'kdziubek')

    def test_getting_users_no_ids(self):
        users = self.service.get_users([])

        self.assertEqual(len(users), 0)
