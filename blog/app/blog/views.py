import os

from flask import request, flash, redirect, url_for, send_file, Blueprint, views, Response, jsonify
# from werkzeug.utils import secure_filename
# from .config import ALLOWED_EXTENSIONS

from app.blog.services import BlogService
from app.exceptions import BadRequest
from app.filter import Filter, Equal
from sqlalchemy.exc import OperationalError


blueprint = Blueprint('blog', __name__)

class BlogFilter(Filter):
    user_id = Equal


class BlogViewSet(views.MethodView):
    def get(self, id):
        if not id:
            return self._list()
        return self._retrieve(id)

    def _list(self):
        params = request.args
        filters = BlogFilter(params).to_dict()
        service = BlogService()
        blogs = service.get_blogs(filters)
        return jsonify(blogs)

    def _retrieve(self, id):
        service = BlogService()
        blog = service.get_blog(id)
        if not blog:
            error_msg = 'Blog with provided id was not found'
            raise BadRequest(error_msg)
        return jsonify(blog)

    def post(self):
        try:
            data = request.get_json()
            service = BlogService()
            blog = service.create_blog(data)
            return jsonify(blog), 201
        except (TypeError, OperationalError) as err:
            raise BadRequest(err.args)

    def delete(self, id):
        service = BlogService()
        service.remove_blog(id)
        return jsonify({}), 204

    def put(self, id):
        data = request.get_json()
        service = BlogService()
        blog = service.update_blog(id, data)
        return jsonify(blog)

def authors():
    service = BlogService()
    authors = service.get_authors()
    return jsonify(authors)

def countries():
    service = BlogService()
    countries = service.get_countries()
    return jsonify(countries)

view = BlogViewSet.as_view('blog_view')
blueprint.add_url_rule('/', defaults={'id': None}, view_func=view, methods=['GET',])
blueprint.add_url_rule('/', view_func=view, methods=['POST',])
blueprint.add_url_rule('/<int:id>/', view_func=view, methods=['GET', 'PUT', 'DELETE'])
blueprint.add_url_rule('/authors/', view_func=authors, methods=['GET'])
blueprint.add_url_rule('/countries/', view_func=countries, methods=['GET'])


# @app.route('get_blogs')
# def get_blogs():
#    return "hello world!"

# @app.route('update_blog')
# def update_blog():
#    return "hello world!"

# @blueprint.route('/', methods=['GET'])
# def dsa():
#    return 'a'

# @app.route('/s')
# def logo():
#    return send_file("../j.jpg",
#                     mimetype='image/jpg')

# def allowed_file(filename):
#     return '.' in filename and \
#            filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

# @app.route('/', methods=['GET', 'POST'])
# def upload_file():
#    if request.method == 'POST':
#       # check if the post request has the file part
#       if 'file' not in request.files:
#          flash('No file part')
#          return redirect(request.url)
#       file = request.files['file']
#       # if user does not select file, browser also
#       # submit an empty part without filename
#       if file.filename == '':
#          flash('No selected file')
#          return redirect(request.url)
#       if file and allowed_file(file.filename):
#          filename = secure_filename(file.filename)
#          file.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))
#          return 'saved'
#    return 'asd'