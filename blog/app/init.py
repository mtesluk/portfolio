from flask import Flask

from app.config import ProductionConfig
from app.extensions import db, ma, migrate, cache
from app.blog import views as blog_views
from app.blog import models
from app.errors import errors


def create_app(config):
    app = Flask(__name__)
    app.register_blueprint(blog_views.blueprint, url_prefix='/api/v3/blogs')
    app.register_blueprint(errors)
    app.config.from_object(config)

    db.init_app(app)
    ma.init_app(app)
    migrate.init_app(app, db)
    cache.init_app(app)

    return app
