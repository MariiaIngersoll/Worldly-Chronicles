"""added a flad attrigbute to Location model

Revision ID: 3e3896f9e80e
Revises: 8367fe9d37ca
Create Date: 2023-08-26 13:54:27.322172

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '3e3896f9e80e'
down_revision = '8367fe9d37ca'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('locations', schema=None) as batch_op:
        batch_op.add_column(sa.Column('flag', sa.String(), nullable=True))

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('locations', schema=None) as batch_op:
        batch_op.drop_column('flag')

    # ### end Alembic commands ###