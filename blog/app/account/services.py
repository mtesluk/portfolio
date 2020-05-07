import requests

from flask import current_app


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