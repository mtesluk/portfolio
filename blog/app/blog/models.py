from sqlalchemy.sql import func

from app.extensions import db


class Blog(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, nullable=False)
    title = db.Column(db.String(200), nullable=False)
    content = db.Column(db.Text, nullable=False)
    photo_names = db.Column(db.String(300))
    cooperators = db.Column(db.String(200))
    views = db.Column(db.Integer, default=0)
    country = db.Column(db.String(30))
    is_active = db.Column(db.Boolean(), default=False)
    add_date = db.Column(db.DateTime(timezone=True), server_default=func.now())
    update_date = db.Column(db.DateTime(timezone=True), onupdate=func.now())

    def __str__(self):
        return "{} {} {} {}".format(self.id, self.country, self.content[:5], self.user_id)
