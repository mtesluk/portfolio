import requests

import jwt
from flask import current_app, request, jsonify

from app.extensions import cache
from app.exceptions import NotAuthorized

class AccountService:
    def get_users(self, ids, ordering = None):
        if ids:
            ids = [str(id) for id in ids if isinstance(id, int)]
            id_str = ','.join(ids)

            base_url = current_app.config['AUTH_SERVER']
            url = f'{base_url}/api/v1/users/'
            params = {'ids': id_str}
            if ordering:
                params['ordering'] = ordering
            response = requests.get(url, params=params)
            data = response.json()

            return data
        return []

    @staticmethod
    def is_auth(kwargs):
        auth_header = request.headers.get('Authorization', None)
        if not auth_header:
            return False
        token = auth_header.split(' ')[1]

        try:
            public_key = current_app.config['PUBLIC_AUTH_KEY']
            decoded = jwt.decode(token, public_key, 'RS256')
        except jwt.ExpiredSignatureError:
            return False

        kwargs['user_id'] = decoded['user_id']
        kwargs['is_admin'] = decoded['admin']
        return True
