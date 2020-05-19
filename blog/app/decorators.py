from app.blog.services import BlogService
from app.exceptions import NotPermitted


def is_allowed(func):
    def wrapper(*args, **kwargs):
        service = BlogService()
        if service.is_allowed(kwargs['user_id'], kwargs['is_admin'], kwargs['id']):
            return func(*args, **kwargs)
        raise NotPermitted
    return wrapper