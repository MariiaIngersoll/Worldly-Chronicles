from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.associationproxy import association_proxy
from datetime import datetime
from config import db

class User(db.Model):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String)
    email = db.Column(db.String)
    lastName = db.Column(db.String)
    countryOfBirth = db.Column(db.String)

    posts = db.relationship('Post', backref = 'users')

class Post(db.Model):
    __tablename__ = 'posts'

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String)
    content = db.Column(db.String)
    createdAt = db.Column(db.DateTime, default=datetime.utcnow)
    views = db.Column(db.Integer, default=0)




