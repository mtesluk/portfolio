import requests
import json

from django.conf import settings


class FacebookService:
    """
    Service to handle operations with facebook
    """
    URL_DEVELOP = 'https://graph.facebook.com/'

    @staticmethod
    def debug_token(input_token):
        params = {
            'input_token': input_token,
            'access_token': settings.FACEBOOK_DEV_ACCESS_TOKEN
        }
        response = requests.get(FacebookService.URL_DEVELOP + 'debug_token', params=params)
        is_valid = response.status_code == 200
        content = response.content.decode('utf-8')
        content_dict = json.loads(content)
        data = content_dict.get('data', 'token invalid')
        return is_valid, data
