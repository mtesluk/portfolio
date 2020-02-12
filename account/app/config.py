import os
basedir = os.path.abspath(os.path.dirname(__file__))

class Config(object):
    DEBUG = False
    SECRET_KEY = '123fgdft4u7755h4gdfdshth4'


class ProductionConfig(Config):
    DEBUG = False


class DevelopmentConfig(Config):
    DEVELOPMENT = True
    DEBUG = True

    # Database
    SQLALCHEMY_DATABASE_URI = 'postgresql+psycopg2://admin:pleasehackme@1.1.1.1:1738/imamoron'
    SQLALCHEMY_USERNAME='admin'
    SQLALCHEMY_PASSWORD='pleasehackme'
    SQLALCHEMY_DATABASE_NAME='imamoron'
    SQLALCHEMY_TABLE='passwords_table'
    SQLALCHEMY_DB_SCHEMA='public'
    SQLALCHEMY_TRACK_MODIFICATIONS = False
