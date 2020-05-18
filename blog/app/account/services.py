import requests

from flask import current_app, request, jsonify
from app.extensions import cache


class AccountService:
    def get_users(self, ids, ordering = None):
        if ids:
            ids = [str(id) for id in ids if isinstance(id, int)]
            id_str = ','.join(ids)

            base_url = current_app.config['AUTH_SERVER']
            url = f'{base_url}/api/v2/users/'
            params = {'ids': id_str}
            if ordering:
                params['ordering'] = ordering
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
            cached_user_id = cache.get(token)
            if not cached_user_id:
                headers = {'Authorization': auth_header}
                url = f'{base_url}/api/v2/users/is_authenticated/'
                response = requests.get(url, headers=headers)
                if not response.status_code == 200:
                    return jsonify({'message': 'You are not authorized!'}), 401
                data = response.json()
                user_id = data.get('user_id', '')
                cache.set(token, user_id, 3600)
                cached_user_id = user_id
            kwargs['user_id'] = cached_user_id
            return func(*args, **kwargs)
        return wrapper
