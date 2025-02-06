from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.associationproxy import association_proxy

from config import db

# Models go here!
class User(db.Model, SerializerMixin):
    __tablename__ = 'users'

    serialize_rules = ('-photo_shoots.user',)

    id = db.Column(db.Integer, primary_key=True)
    firstname = db.Column(db.String)
    lastname = db.Column(db.String)
    username = db.Column(db.String, unique=True)
    email = db.Column(db.String, unique=True)
    password = db.Column(db.String)

    photo_shoots = db.relationship('PhotoShoot', back_populates='user', cascade='all, delete-orphan')
    

    def __repr__(self):
        return f'<User {self.username}>'

class PhotoShoot(db.Model, SerializerMixin):
    __tablename__ = 'photo_shoots'

    serialize_rule = ('-users.photo_shoots',)

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String)
    date = db.Column(db.DateTime)
    description = db.Column(db.String)
    photographer = db.Column(db.String)

    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    user = db.relationship('User', back_populates='photo_shoots')


    

