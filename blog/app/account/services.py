import requests


class AccountService:
    def get_users(self, ids):
        if ids:
            ids = [str(id) for id in ids] if isinstance(ids[0], int) else ids
            id_str = ','.join(ids)
            url = f'http://127.0.0.1:8000/api/v1/users?ids={id_str}'
            response = requests.get(url)
            return response.json()