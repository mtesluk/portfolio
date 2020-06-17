"""Initial migration.

Revision ID: e293059122fc
Revises: 
Create Date: 2020-05-27 15:24:03.306548

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'e293059122fc'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('blog',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('user_id', sa.Integer(), nullable=False),
    sa.Column('title', sa.String(length=200), nullable=False),
    sa.Column('content', sa.Text(), nullable=False),
    sa.Column('photo_names', sa.String(length=300), nullable=True),
    sa.Column('cooperators', sa.String(length=200), nullable=True),
    sa.Column('views', sa.Integer(), nullable=True),
    sa.Column('country', sa.Text(), nullable=True),
    sa.Column('is_active', sa.Boolean(), nullable=True),
    sa.Column('add_date', sa.DateTime(timezone=True), server_default=sa.text('now()'), nullable=True),
    sa.Column('update_date', sa.DateTime(timezone=True), nullable=True),
    sa.PrimaryKeyConstraint('id')
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('blog')
    # ### end Alembic commands ###