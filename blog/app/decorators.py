from app.blog.services import BlogService
from app.account.services import AccountService
from app.exceptions import NotPermitted, NotAuthorized


def is_auth(func):
    def wrapper(*args, **kwargs):
        service = AccountService()
        user_id, is_admin = service.is_auth()
        kwargs['user_id'] = user_id
        kwargs['is_admin'] = is_admin
        return func(*args, **kwargs)
    return wrapper

def is_allowed(func):
    def wrapper(*args, **kwargs):
        service = BlogService()
        if service.is_allowed(kwargs.get('user_id', ''), kwargs.get('is_admin', ''), kwargs.get('id', '')):
            return func(*args, **kwargs)
        raise NotPermitted
    return wrapper
