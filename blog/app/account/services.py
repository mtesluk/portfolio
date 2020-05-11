import requests

from flask import current_app, request, jsonify
from app.extensions import cache


class AccountService:
    def get_users(self, ids):
        if ids:
            ids = [str(id) for id in ids if isinstance(id, int)]
            id_str = ','.join(ids)

            base_url = current_app.config['AUTH_SERVER']
            url = f'{base_url}/api/v1/users/'
            params = {'ids': id_str}
            response = requests.get(url, params=params)
            data = response.json()

            return data
        return []

    @staticmethod
    def is_allowed(func):
        def wrapper(*args, **kwargs):
            base_url = current_app.config['AUTH_SERVER']
            auth_header = request.headers.get('Authorization', None)
            if not auth_header:
                return jsonify({'message': 'You are not authorized!'}), 401
            token = auth_header.split(' ')[1]
            cached_token = cache.get(token)
            if not cached_token:
                headers = {'Authorization': auth_header}
                url = f'{base_url}/api/v1/users/is_authenticated/'
                response = requests.get(url, headers=headers)
                if not response.status_code == 200:
                    return jsonify({'message': 'You are not authorized!'}), 401
                cache.set(token, True, 3600)
            return func(*args, **kwargs)
        return wrapper
