from typing import Union

from app.extensions import db
from app.blog.models import Blog
from app.blog.serializers import BlogSerializer
from app.account.services import AccountService

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
        blog = Blog.query.get(id)
        serializer = BlogSerializer()
        blog_data = serializer.dump(blog)
        return blog_data

    def get_blogs(self, filters: dict = None, ordering: str = None, size = None):
        filters = filters if filters else {}
        queryset = self._filter_order_query(Blog.query, filters, ordering)
        queryset = queryset.limit(int(size)) if size else queryset
        serializer = BlogSerializer(many=True)
        blogs = serializer.dump(queryset)
        return blogs

    def create_blog(self, data: dict):
        blog = Blog(**data)
        db.session.add(blog)
        db.session.commit()
        serializer = BlogSerializer()
        blog_data = serializer.dump(blog)
        return blog_data

    def update_blog(self, id: int, data: dict = None):
        blog = Blog.query.get(id)
        data = data if data else {}
        for key, value in data.items():
            setattr(blog, key, value)
        db.session.commit()
        serializer = BlogSerializer()
        blog_data = serializer.dump(blog)
        return blog_data

    def remove_blog(self, id: int):
        blog = Blog.query.get(id)
        if blog:
            db.session.delete(blog)
            db.session.commit()

    def is_allowed(self, id: int, is_admin: bool, blog_id: Union[int, str]):
        blog = Blog.query.get(blog_id)
        if blog:
            blog_user_id = blog.user_id
            return is_admin or blog_user_id == int(id)
        else:
            return False

    def get_authors(self, filters: dict = None, ordering: str = None, limit: str = None):
        queryset = db.session.query(Blog.user_id).distinct()
        queryset = self._filter_order_query(queryset, filters if filters else {}, ordering)
        queryset = queryset.limit(limit) if limit else queryset

        authors_id = [user_id for user_id, in queryset]
        user_service = AccountService()
        authors = user_service.get_users(authors_id)
        return authors

    def get_countries(self, filters: dict = None, ordering: str = None, limit: str = None):
        queryset = db.session.query(Blog.country).distinct()
        queryset = self._filter_order_query(queryset, filters if filters else {}, ordering)
        queryset = queryset.limit(limit) if limit else queryset
        countries = [country for country, in queryset if country]
        return countries

    def set_blog_verified(self, id: int):
        blog = Blog.query.get(id)
        self.update_blog(blog.id, {'is_active': True})

    def get_photo_names(self, blog_id):
        pass

    def increase_blog_view(self, id: int, num: int = 1):
        blog = Blog.query.get(id)
        if blog:
            num = num if isinstance(num, int) else int(num)
            data = {'views': blog.views + num}
            self.update_blog(blog.id, data)

    def _filter_order_query(self, queryset, filters: dict, ordering: str):
        for key, options in filters.items():
            if options['type'] == 'contains':
                queryset = queryset.filter(getattr(Blog, key).contains(options['value']))
            elif options['type'] == 'equal':
                queryset = queryset.filter(getattr(Blog, key) == options['value'])
        if ordering:
            queryset = queryset.order_by(getattr(Blog, ordering.replace('-', '')).desc()) if '-' in ordering else queryset.order_by(getattr(Blog, ordering))

        return queryset