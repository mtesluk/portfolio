import os

from flask import request, flash, redirect, url_for, send_file, Blueprint
from werkzeug.utils import secure_filename
# from .config import ALLOWED_EXTENSIONS


blueprint = Blueprint('blog', __name__)


# @app.route('set_blog')
# def set_blog():
#    return "hello world!"

# @app.route('get_blog')
# def get_blog():
#    return "hello world!"

# @app.route('get_blogs')
# def get_blogs():
#    return "hello world!"

# @app.route('update_blog')
# def update_blog():
#    return "hello world!"

@blueprint.route('/', methods=['GET'])
def dsa():
   return 'a'

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