from app.blog.services import BlogService
from app.account.services import AccountService
from app.exceptions import NotPermitted, NotAuthorized


def is_allowed(func):
    def wrapper(*args, **kwargs):
        service = BlogService()
        print(11111111111)
        print(kwargs)
        if service.is_allowed(kwargs['user_id'], kwargs['is_admin'], kwargs['id']):
            return func(*args, **kwargs)
        raise NotPermitted
    return wrapper

def is_auth(func):
    def wrapper(*args, **kwargs):
        print(1111111111111111111111)
        service = AccountService()
        if service.is_auth(kwargs):
            return func(*args, **kwargs)
        raise NotAuthorized
    return wrapper