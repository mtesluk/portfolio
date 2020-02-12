

class Site(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(80), unique=True, nullable=False)
    longitude = db.Column(db.Float(), unique=True, nullable=False)
    latitude = db.Column(db.Float(), nullable=True)