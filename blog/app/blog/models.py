from app.extensions import db


class Blog(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer)
    cooperators = db.Column(db.String(200), nullable=True)
    content = db.Column(db.Text, nullable=False)
    photo_names = db.Column(db.String(300), nullable=True)
    views = db.Column(db.Integer, default=0, nullable=False)
    country = db.Column(db.String(30), nullable=True)
    is_active = db.Column(db.Boolean(), default=False)

    def __str__(self):
        return "{} {} {} {}".format(self.id, self.country, self.content[:5], self.user_id)
