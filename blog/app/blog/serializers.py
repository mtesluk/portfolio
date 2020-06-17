from app.extensions import ma
from app.blog.models import Blog


class BlogSerializer(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = Blog
        fields = ('id', 'user_id', 'cooperators', 'content', 'photo_names', 'views', 'countries', 'title', 'add_date', 'update_date')

