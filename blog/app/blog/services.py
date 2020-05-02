from app.blog.models import Blog
from app.extensions import db

class UserService:
    """
    Service to handle user data from auth server
    """
    pass


class BlogService:
    """
    Service to handle blog data and operation
    """

    def get_blog(self, id: int):
        pass

    def get_authors(self):
        pass

    def get_blogs(self, filters: dict):
        pass

    def get_countries(self):
        pass

    def get_most_popular_blogs(self, count: int):
        pass

    def get_most_popular_countries(self, count: int):
        pass

    def get_most_popular_authors(self, count: int):
        pass

    def create_blog(self, data: dict):
        pass

    def set_blog_verified(self):
        pass

    def remove_blog(self, id: int):
        pass

    def update_blog(self, id: int, data: dict):
        blog = Blog.query.get(id)
        for key, value in data.items():
            setattr(blog, key, value)
        db.session.commit()

    def get_photo_names(self, blog_id):
        pass

    def increase_blog_view(self, id: int, num: int = 1):
        blog = Blog.query.get(id)
        data = {'views': blog.views + num}
        self.update_blog(blog.id, data)
