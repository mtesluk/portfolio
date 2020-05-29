import os


class Config(object):
    DEBUG = False
    TESTING = False
    AUTH_SERVER = os.environ.get('AUTH_SERVER', '')
    ALLOWED_EXTENSIONS = ('txt', 'pdf', 'png', 'jpg', 'jpeg', 'gif')
    RATELIMIT_DEFAULT = '200 per day;10 per second'
    MAX_CONTENT_LENGTH = 16 * 1024 * 1024     # 16 megabytes


class ProductionConfig(Config):
    SECRET_KEY = os.environ.get('BLOG_SECRET_KEY', '')
    SQLALCHEMY_DATABASE_URI = os.environ.get('BLOG_SQL_URI', '')
    SQLALCHEMY_ECHO = True
    SQLALCHEMY_TRACK_MODIFICATIONS = False


class DevelopmentConfig(Config):
    SECRET_KEY = os.environ.get('BLOG_SECRET_KEY', '')
    SQLALCHEMY_DATABASE_URI = os.environ.get('BLOG_SQL_URI', '')
    SQLALCHEMY_ECHO = True
    SQLALCHEMY_TRACK_MODIFICATIONS = False


class TestingConfig(Config):
    SQLALCHEMY_DATABASE_URI = os.environ.get('BLOG_SQL_TESTING', '')
    SQLALCHEMY_ECHO = False
    SQLALCHEMY_TRACK_MODIFICATIONS = False
