#!/usr/bin/env python3

# Standard library imports
from random import randint, choice as rc

# Remote library imports
from faker import Faker

fake = Faker()
# Local imports
from app import app
from config import db
from models import User, Post, Comment, Location


if __name__ == '__main__':
    fake = Faker()
    with app.app_context():

        print("Deleting all records...")
        User.query.delete()


        print("Starting seed...")
        # Seed code goes here!
        
        
        users = []

        for i in range(200):
            user = User(
                username = fake.user_name(),
                email = fake.email(),
                countryOfBirth = fake.country()
            )
            db.session.add(user)
            db.session.commit()

        image_urls = [
            'my_phase_4_pictures/470a19df81846d647ee795d46e88a7f2.jpeg',
            'my_phase_4_pictures/Cidade_Maravilhosa.jpeg',
            'my_phase_4_pictures/GettyImages-946087016.webp',
            'my_phase_4_pictures/image.jpeg',
            'my_phase_4_pictures/p9447.jpeg',
            'my_phase_4_pictures/St.-Petersburg-at-night.jpg',
            'my_phase_4_pictures/vgm3jn4xf6mmsanreyjc.webp'

        ]

    # __tablename__ = 'posts'

    # id = db.Column(db.Integer, primary_key=True)
    # title = db.Column(db.String)
    # image = db.Column(db.String)
    # content = db.Column(db.String)
    # createdAt = db.Column(db.DateTime, default=datetime.utcnow)
    # views = db.Column(db.Integer, default=0)

    # user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable = False)
    # comments = db.relationship('Comment', backref = 'post')

    # locations = db.relationship('Location', secondary=post_location_association, back_populates='posts')





