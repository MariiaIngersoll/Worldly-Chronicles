from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.associationproxy import association_proxy
from datetime import datetime
from config import db
from ipdb import set_trace


post_location_association = db.Table('post_location_association',
    db.Column('post_id', db.Integer, db.ForeignKey('posts.id')),
    db.Column('location_id', db.Integer, db.ForeignKey('locations.id'))
)

class User(db.Model):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String, nullable = False)
    email = db.Column(db.String, unique=True, nullable = False)
    countryOfBirth = db.Column(db.String)

    comments = db.relationship('Comment', backref = 'user')
    posts = db.relationship('Post', backref = 'user')

    def __repr__(self):
        return f'{self.username}'

class Post(db.Model):
    __tablename__ = 'posts'

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String)
    image = db.Column(db.String)
    content = db.Column(db.String)
    createdAt = db.Column(db.DateTime, default=datetime.utcnow)
    views = db.Column(db.Integer, default=0)

    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable = False)
    comments = db.relationship('Comment', backref = 'post')
    images = db.relationship('Image', backref = 'post')

    locations = db.relationship('Location', secondary=post_location_association, back_populates='posts')

    def __repr__(self):
        return f'"{self.title}" was created at {self.createdAt} by {self.user_id}'
    
class Image(db.Model):
    __tablename__ = 'images'

    id = db.Column(db.Integer, primary_key=True)
    url = db.Column(db.String)
    post_id = db.Column(db.Integer, db.ForeignKey('posts.id'))

class Comment(db.Model):
    __tablename__ = 'comments'

    id = db.Column(db.Integer, primary_key=True)
    content = db.Column(db.String)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    post_id = db.Column(db.Integer, db.ForeignKey('posts.id'))

class Location(db.Model):
    __tablename__ = 'locations'

    id = db.Column(db.Integer, primary_key=True)
    country = db.Column(db.String)
    city = db.Column(db.String)

    posts = db.relationship('Post', secondary=post_location_association, back_populates='locations')









