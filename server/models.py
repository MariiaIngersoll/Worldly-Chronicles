from sqlalchemy_serializer import SerializerMixin
from datetime import datetime
from config import db, bcrypt
from sqlalchemy.ext.hybrid import hybrid_property
from sqlalchemy.orm import validates


post_location_association = db.Table('post_location_association',
    db.Column('post_id', db.Integer, db.ForeignKey('posts.id')),
    db.Column('location_id', db.Integer, db.ForeignKey('locations.id'))
)

class User(db.Model, SerializerMixin):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String, nullable = False)
    email = db.Column(db.String)
    _password_hash = db.Column(db.String)

    posts = db.relationship('Post', back_populates = 'user')

    @hybrid_property
    def password_hash(self):
        raise AttributeError('Password hashes may not be viewed.')
    
    @password_hash.setter
    def password_hash(self, password):
        password_hash = bcrypt.generate_password_hash(
            password.encode('utf-8'))
        self._password_hash = password_hash.decode('utf-8')

    def authenticate(self, password):
        return bcrypt.check_password_hash(self._password_hash, password.encode('utf-8'))

    @validates("email")
    def validate_email(self, key, email):
        if "@" not in email:
            raise ValueError("Please provide a valid email")
        return email


    def __repr__(self):
        return f'<User {self.username}>'
    
    serialize_rules = (
        '-_password_hash',
        '-posts',
    )

class Post(db.Model, SerializerMixin):
    __tablename__ = 'posts'

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String)
    content = db.Column(db.String)
    createdAt = db.Column(db.DateTime, default=datetime.utcnow)

    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    user = db.relationship('User', back_populates='posts')
    images = db.relationship('Image', back_populates = 'post')

    locations = db.relationship('Location', secondary=post_location_association, back_populates='posts')

    serialize_rules = (
        '-user_id',
        '-user.email',
        '-user.id',
        '-images.id',
        '-images.post_id',
        '-user.posts',
        '-images.post',
        '-locations.posts',
        '-locations.id',
    )

    def __repr__(self):
        return f'"{self.title}" was created at {self.createdAt} by {self.user_id}'
    
    
class Image(db.Model, SerializerMixin):
    __tablename__ = 'images'

    id = db.Column(db.Integer, primary_key=True)
    url = db.Column(db.String)
    post_id = db.Column(db.Integer, db.ForeignKey('posts.id'))
    post = db.relationship('Post', back_populates='images') 

    def __repr__(self):
        return f'The image  is {self.url}'

class Location(db.Model,SerializerMixin):
    __tablename__ = 'locations'

    id = db.Column(db.Integer, primary_key=True)
    country = db.Column(db.String)
    city = db.Column(db.String)

    posts = db.relationship('Post', secondary=post_location_association, back_populates='locations')

    serialize_rules = (

        "-id",
    )
    def __repr__(self):
        return f'The location is {self.country}'