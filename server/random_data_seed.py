#!/usr/bin/env python3

# Standard library imports
from random import randint, choice as rc

# Remote library imports
from faker import Faker

# Local imports
from app import app
from models import db, User, PhotoShoot, Order, Photo, OrderItem

if __name__ == '__main__':
    # Create and initialize a faker generator
    fake = Faker()
    with app.app_context():
        print("Starting seed...")
        # Seed code goes here!

        # Delete all rows in the users, photo_shoots, orders, photos, order_items tables in order of child model to parent model
        print("Deleting all records...")
        # Update order of deletion so that all child models are deleted prior to their parent models being deleted
        OrderItem.query.delete()
        Photo.query.delete()
        PhotoShoot.query.delete()
        Order.query.delete()
        User.query.delete()
        
        # Seed Users - Note that all test users have a password of "test_password"
        print("Creating users...")
        users = []
        for i in range(10):

            user = User(
                firstname=fake.first_name(),
                lastname=fake.last_name(),
                username=fake.unique.user_name(),
                email=fake.unique.email(),
                password="test_password",
            )

            users.append(user)
        
        db.session.add_all(users)

        # Seed PhotoShoots
        print("Creating photo_shoots...")
        photo_shoots = []
        photographers = ['Nick Sanders', 'Holt Haynesworth']
        for i in range(30):

            photo_shoot = PhotoShoot(
                title=fake.sentence(nb_words=2),
                date=fake.date_time(),
                description=fake.sentence(nb_words=10),
                photographer=rc(photographers),
                user=rc(users)
            )

            photo_shoots.append(photo_shoot)
        
        db.session.add_all(photo_shoots)

        # Seed Orders
        print("Creating orders...")
        orders = []
        for i in range(10):

            order = Order(
                photo_quantity=0,
                order_price=0,
                order_purchased=False,
                user=users[i]
            )

            orders.append(order)
        
        db.session.add_all(orders)

        # Seed Photos
        print("Creating photos...")
        photos = []
        for i in range(60):

            photo = Photo(
                photo_purchased=False,
                photo_price=2.99,
                photo_shoot=rc(photo_shoots)
            )

            photos.append(photo)
        
        db.session.add_all(photos)

        #Seed OrderItems
        print("Creating order_items...")
        order_items = []
        for i in range(20):

            order_item = OrderItem(
                order=rc(orders),
                photo=rc(photos)
            )

            order_items.append(order_item)
        
        db.session.add_all(order_items)

        # Commit changes to DB
        db.session.commit()
        print("Seeding complete.")
