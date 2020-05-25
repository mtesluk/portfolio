import requests

from flask import current_app, request, jsonify
from app.extensions import cache
from app.exceptions import NotAuthorized


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
    def is_auth(kwargs):
        base_url = current_app.config['AUTH_SERVER']
        auth_header = request.headers.get('Authorization', None)
        if not auth_header:
            return False
        token = auth_header.split(' ')[1]
        cached_user_id = cache.get('{}_id'.format(token))
        cached_user_is_admin = cache.get('{}_admin'.format(token))
        if not cached_user_id:
            headers = {'Authorization': auth_header}
            url = f'{base_url}/api/v2/users/is_authenticated/'
            response = requests.get(url, headers=headers)
            if not response.status_code == 200:
                return False
            data = response.json()
            user_id = data.get('user_id', '')
            is_admin = data.get('is_admin', False)
            cache.set('{}_id'.format(token), user_id, 3600)
            cache.set('{}_admin'.format(token), is_admin, 3600)
            cached_user_id = user_id
            cached_user_is_admin = is_admin
        kwargs['user_id'] = cached_user_id
        kwargs['is_admin'] = cached_user_is_admin
        return True
