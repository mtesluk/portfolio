from flask.helpers import get_debug_flag

from app.init import create_app
from app.config import DevelopmentConfig, ProductionConfig

CONFIG = DevelopmentConfig if get_debug_flag() else ProductionConfig

app = create_app(CONFIG)
