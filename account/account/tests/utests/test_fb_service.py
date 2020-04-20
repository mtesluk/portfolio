from unittest.mock import patch

from django.test import TestCase

from account.services.facebook import FacebookService


class FbServiceTestCase(TestCase):
    @patch('account.services.facebook.requests.get')
    def test_checking_token_with_facebook_pass(self, patch):
        patch.return_value.status_code = 200
        patch.return_value.content = bytes('{"data": "data"}', 'ascii')
        is_valid, data = FacebookService.debug_token('token')
        self.assertTrue(is_valid)
        self.assertEqual(data, 'data')

    @patch('account.services.facebook.requests.get')
    def test_checking_token_with_facebook_wrong(self, patch):
        patch.return_value.status_code = 400
        patch.return_value.content = bytes('{"error": "token not exists"}', 'ascii')
        is_valid, data = FacebookService.debug_token('token')
        self.assertFalse(is_valid)
        self.assertEqual(data, 'token invalid')
