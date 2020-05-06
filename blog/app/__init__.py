from flask import Flask, jsonify

from .config import DevelopmentConfig
from .extensions import db, ma
from .blog import views as blog_views
from .blog import models

app = Flask(__name__)
app.register_blueprint(blog_views.blueprint, url_prefix='/api/v1/blogs')
app.config.from_object(DevelopmentConfig())

db.init_app(app)
ma.init_app(app)
