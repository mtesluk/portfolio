from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow
from flask_migrate import Migrate
from flask_caching import Cache


db = SQLAlchemy()
ma = Marshmallow()
migrate = Migrate()
cache = Cache(config={'CACHE_TYPE': 'simple'})