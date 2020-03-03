import requests
import json


class FacebookService:
    URL_DEVELOP = 'https://graph.facebook.com/'

    @staticmethod
    def debug_token(access_token, input_token):
        params = {
            'input_token': input_token,
            'access_token': access_token
        }
        response = requests.get(FacebookService.URL_DEVELOP + 'debug_token', params=params)
        is_valid = response.status_code == 200
        data = json.loads(response.content.decode('utf-8'))['data']
        return is_valid, data
