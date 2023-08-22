#!/usr/bin/env python3

# Standard library imports
from random import randint, choice as rc

# Remote library imports
from faker import Faker

fake = Faker()
# Local imports
from app import app
from models import User, Post, Comment, Location, db


if __name__ == '__main__':
    fake = Faker()
    with app.app_context():
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




