ALLOWED_EXTENSIONS = {'txt', 'pdf', 'png', 'jpg', 'jpeg', 'gif'}


class Config(object):
    DEBUG = False
    TESTING = False
    AUTH_SERVER = 'http://127.0.0.1:8000'


class ProductionConfig(Config):
    SQLALCHEMY_DATABASE_URI = "mysql://root:root@127.0.0.1:3306/blog_prod"
    SQLALCHEMY_ECHO = True
    SQLALCHEMY_TRACK_MODIFICATIONS = False


class DevelopmentConfig(Config):
    DEBUG = True
    SQLALCHEMY_DATABASE_URI = "mysql://root:root@127.0.0.1:3306/blog"
    SQLALCHEMY_ECHO = True
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    UPLOAD_FOLDER = '/home/mtesluk/portfolio/blog'


class TestingConfig(Config):
    TESTING = False
    SQLALCHEMY_DATABASE_URI = "mysql://root:root@127.0.0.1:3306/blog_test"
    SQLALCHEMY_ECHO = False
    SQLALCHEMY_TRACK_MODIFICATIONS = False
