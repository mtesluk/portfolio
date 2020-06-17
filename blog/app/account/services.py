import jwt
import requests
from flask import current_app, request

from app.exceptions import NotAuthorized, LackOfTokenHeader, WrongTokenHeader


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

    def is_auth(self):
        auth_header = self.get_token_header()
        if not auth_header:
            raise LackOfTokenHeader

        try:
            token = auth_header.split(' ')[1]
        except IndexError:
            raise WrongTokenHeader

        try:
            decoded = self.get_token_decoded(token)
        except jwt.ExpiredSignatureError:
            raise NotAuthorized
        except Exception:
            raise NotAuthorized

        return decoded['user_id'], decoded['admin']

    def get_token_header(self):
        return request.headers.get('Authorization', None)

    def get_token_decoded(self, token):
        public_key = current_app.config['PUBLIC_AUTH_KEY']
        return jwt.decode(token, public_key, 'RS256')
