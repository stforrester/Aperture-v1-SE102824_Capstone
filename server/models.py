from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.associationproxy import association_proxy

from config import db

# Models go here!
class User(db.Model, SerializerMixin):
    __tablename__ = 'users'

    serialize_rules = ('-orders.user', '-photo_shoots.user', )

    id = db.Column(db.Integer, primary_key=True)
    firstname = db.Column(db.String)
    lastname = db.Column(db.String)
    username = db.Column(db.String, unique=True)
    email = db.Column(db.String, unique=True)
    password = db.Column(db.String)
    created_at = db.Column(db.DateTime, server_default=db.func.now())
    updated_at = db.Column(db.DateTime, onupdate=db.func.now())

    orders = db.relationship('Order', back_populates='user', cascade='all, delete-orphan')
    
    photo_shoots = db.relationship('PhotoShoot', back_populates='user', cascade='all, delete-orphan')
    
    def __repr__(self):
        return f'<User {self.id} {self.username}>'

class Order(db.Model, SerializerMixin):
    __tablename__ = 'orders'

    serialize_rules = ('-user.orders', '-order_items.order', )

    id = db.Column(db.Integer, primary_key=True)
    order_date = db.Column(db.DateTime)
    photo_quantity = db.Column(db.Integer)
    order_price = db.Column(db.Float)
    order_purchased = db.Column(db.Boolean)

    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    user = db.relationship('User', back_populates='orders')

    order_items = db.relationship('OrderItem', back_populates='order', cascade='all, delete-orphan')

    def __repr__(self):
        return f'<Order {self.id} {self.order_purchaed}>'

class PhotoShoot(db.Model, SerializerMixin):
    __tablename__ = 'photo_shoots'

    serialize_rules = ('-user.photo_shoots', '-photos.photo_shoot', )

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String)
    date = db.Column(db.DateTime)
    description = db.Column(db.String)
    photographer = db.Column(db.String)

    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    user = db.relationship('User', back_populates='photo_shoots')

    photos = db.relationship('Photo', back_populates='photo_shoot', cascade='save-update, merge')

    def __repr__(self):
        return f'<PhotoShoot {self.id} {self.title}>'

class Photo(db.Model, SerializerMixin):
    __tablename__ = 'photos'

    serialize_rules = ('-photo_shoot.photos', '-order_items.photo', )

    id = db.Column(db.Integer, primary_key=True)
    cloudinary_link = db.Column(db.String)
    photo_purchased = db.Column(db.Boolean)
    photo_price = db.Column(db.Float)

    photo_shoot_id = db.Column(db.Integer, db.ForeignKey('photo_shoots.id'))
    photo_shoot = db.relationship('PhotoShoot', back_populates='photos')

    order_items = db.relationship('OrderItem', back_populates='photo', cascade='all, delete-orphan')

    def __repr__(self):
        return f'<Photo {self.id} Cloudinary Link: {self.cloudinary_link}>'

class OrderItem(db.Model, SerializerMixin):
    __tablename__ = 'order_items'

    serialize_rules = ('-order.order_items', '-photo.order_items', )

    id = db.Column(db.Integer, primary_key=True)

    order_id = db.Column(db.Integer, db.ForeignKey('orders.id'))
    order = db.relationship('Order', back_populates='order_items')
    
    photo_id = db.Columne(db.Integer, db.ForeignKey('photos.id'))
    photo = db.relationship('Photo', back_populates='order_items')

    def __repr__(self):
        return f'<OrderItem {self.id}, Order: {self.order_id}, Photo: {self.photo_id}>'

