import os
import ftplib
from typing import Union

from werkzeug.utils import secure_filename
from flask import current_app

from app.extensions import db
from app.blog.models import Blog
from app.blog.serializers import BlogSerializer
from app.account.services import AccountService
from app.exceptions import FileExtensionNotAllowed

class UserService:
    """
    Service to handle user data from auth server
    """
    pass


class BlogService:
    """
    Service to handle blog data and operation
    """

    def upload_files(self, files, prefix_filename=None):
        filenames = []
        with ftplib.FTP(os.environ.get('FTP_HOST', ''), os.environ.get('FTP_USERNAME', ''), os.environ.get('FTP_PASSWORD', '')) as ftp:
            for i, file in enumerate(files):
                filename = file.filename
                filename_ext = self._get_filename_extension(filename)
                if self._allowed_file(filename, filename_ext):
                    filename = '{}_{}.{}'.format(prefix_filename, i, filename_ext) if prefix_filename else filename
                    filename = secure_filename(filename)
                    ftp.storbinary('STOR ' + filename, file)
                    server_name = os.environ.get('FILE_SERVER_NAME', '')
                    file_url = os.path.join(server_name, filename)
                    filenames.append(file_url)
                else:
                    raise FileExtensionNotAllowed
        return filenames

    def _allowed_file(self, filename, filename_ext):
        return filename_ext in current_app.config['ALLOWED_EXTENSIONS']

    def _get_filename_extension(self, filename):
        return filename.rsplit('.', 1)[1].lower() if '.' in filename else 'forbidden_ext'

    def remove_files(self, filenames):
        pass

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

    def get_countries_from_string(self, countries: str):
        seperated_countries = countries.split(';')
        return seperated_countries

    def unpack_countries(self, countries: list, seperator: str = ';'):
        unique_countries = set()
        for country in countries:
            if seperator in country:
                seperated_countries = self.get_countries_from_string(country)
                for country in seperated_countries:
                    unique_countries.add(country)
            else:
                unique_countries.add(country)
        return list(unique_countries)

    def _filter_order_query(self, queryset, filters: dict, ordering: str):
        for key, options in filters.items():
            if options['type'] == 'contains':
                queryset = queryset.filter(getattr(Blog, key).contains(options['value']))
            elif options['type'] == 'equal':
                queryset = queryset.filter(getattr(Blog, key) == options['value'])
        if ordering:
            queryset = queryset.order_by(getattr(Blog, ordering.replace('-', '')).desc()) if '-' in ordering else queryset.order_by(getattr(Blog, ordering))

        return queryset