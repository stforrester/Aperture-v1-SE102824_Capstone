from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.associationproxy import association_proxy
from sqlalchemy.ext.hybrid import hybrid_property

from config import bcrypt, db

# Models go here!

class User(db.Model, SerializerMixin):
    __tablename__ = 'users'

    # Prevents recursion errors when: 1. User's orders are returned and 2. Users's photo_shoots are returned
    serialize_rules = ('-orders.user', '-photo_shoots.user', )

    id = db.Column(db.Integer, primary_key=True)
    firstname = db.Column(db.String)
    lastname = db.Column(db.String)
    username = db.Column(db.String, unique=True)
    email = db.Column(db.String, unique=True)
    
    _password_hash = db.Column(db.String)

    @hybrid_property
    def password_hash(self):
        return self._password_hash
    
    @password_hash.setter
    def password_hash(self, password):
        password_hash = bcrypt.generate_password_hash(password.encode("utf8"))
        self._pasword_hash = password_hash.decode("utf8")
    
    def authenticate(self, password):
        return bcrypt.check_password_hash(self._password_hash, password.encode("utf8"))
    
    created_at = db.Column(db.DateTime, server_default=db.func.now())
    updated_at = db.Column(db.DateTime, onupdate=db.func.now())

    # Creates relationship allowing a User's associated orders to be returned (One [User] to Many [orders])
    orders = db.relationship('Order', back_populates='user', cascade='all, delete-orphan')
    
    # Creates relationship allowing a User's associated photo_shoots to be returned (One [User] to Many [photo_shoots])
    photo_shoots = db.relationship('PhotoShoot', back_populates='user', cascade='all, delete-orphan')
    
    def __repr__(self):
        return f'<User {self.id} {self.username}>'

class PhotoShoot(db.Model, SerializerMixin):
    __tablename__ = 'photo_shoots'

    # Prevents recursion errors when: 1. PhotoShoot's user is returned and 2. PhotoShoot's photos are returned
    serialize_rules = ('-user.photo_shoots', '-photos.photo_shoot', )

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String)
    date = db.Column(db.DateTime)
    description = db.Column(db.String)
    photographer = db.Column(db.String)

    # Establishes user_id as a foreign key and creates relationship allowing a PhotoShoot's associated user to be returned (One [user] to Many [PhotoShoot])
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    user = db.relationship('User', back_populates='photo_shoots')

    # Creates relationship allowing a PhotoShoot's associated photos to be returned (One [PhotoShoot] to Many [photos])
    photos = db.relationship('Photo', back_populates='photo_shoot', cascade='save-update, merge')

    def __repr__(self):
        return f'<PhotoShoot {self.id} {self.title}>'

class Order(db.Model, SerializerMixin):
    __tablename__ = 'orders'

    # Prevents recursion errors when: 1. Order's user is returned and 2. Order's order_items are returned
    serialize_rules = ('-user.orders', '-order_items.order', )

    id = db.Column(db.Integer, primary_key=True)
    order_date = db.Column(db.DateTime)
    photo_quantity = db.Column(db.Integer)
    order_price = db.Column(db.Float)
    order_purchased = db.Column(db.Boolean)

    # Establishes user_id as a foreign key and creates relationship allowing an Order's associated user to be returned (One [user] to Many [Order])
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    user = db.relationship('User', back_populates='orders')

    # Creates relationship allowing an Order's associated order_items to be returned (One [Order] to Many [order_items])
    order_items = db.relationship('OrderItem', back_populates='order', cascade='all, delete-orphan')

    # Creates Association Proxy allowing an Order's associated photos to be returned via the Order's associated order_items which act as an intermediary (Many [Order] to Many [photos])
    photos = association_proxy('order_items', 'photo', creator=lambda photo_obj: OrderItem(photo=photo_obj))

    def __repr__(self):
        return f'<Order {self.id} {self.order_purchased}>'

class Photo(db.Model, SerializerMixin):
    __tablename__ = 'photos'

    # Prevents recursion errors when: 1. Photo's photo_shoot is returned and 2. Photo's order_items are returned
    serialize_rules = ('-photo_shoot.photos', '-order_items.photo', )

    id = db.Column(db.Integer, primary_key=True)
    cloudinary_link = db.Column(db.String) # need to further research Cloudinary API and implement in model as appropriate
    photo_purchased = db.Column(db.Boolean)
    photo_price = db.Column(db.Float)

    # Establishes photo_shoot_id as a foreign key and creates relationship allowing a Photo's associated photo_shoot to be returned (One [photo_shoot] to Many [Photo])
    photo_shoot_id = db.Column(db.Integer, db.ForeignKey('photo_shoots.id', ondelete='SET NULL')) # Because Photo Objects need to exist even if their parent photo_shoot is deleted (because the photo might be in a user's order) we set this photo_shoot foreign key equal to null upon the parents object's deletion
    photo_shoot = db.relationship('PhotoShoot', back_populates='photos')

    # Creates relationship allowing a Photo's associated order_items to be returned (One [Photo] to Many [order_items])
    order_items = db.relationship('OrderItem', back_populates='photo', cascade='all, delete-orphan')

    # Creates Association Proxy allowing a Photo's associated orders to be returned via the Photo's associated_order_items which act as an intermediary (Many [Photo] to Many [orders])
    orders = association_proxy('order_items', 'order', creator=lambda order_obj: OrderItem(order=order_obj))

    def __repr__(self):
        return f'<Photo {self.id} Cloudinary Link: {self.cloudinary_link}>'

class OrderItem(db.Model, SerializerMixin):
    __tablename__ = 'order_items'

    # Prevents recursion errors when: 1. OrderItem's order is returned and 2. OrderItem's photo is returned
    serialize_rules = ('-order.order_items', '-photo.order_items', )

    id = db.Column(db.Integer, primary_key=True)

    # Establishes order_id as a foreign key and creates relationship allowing an OrderItem's associated order to be returned (One [order] to Many [OrderItem])
    order_id = db.Column(db.Integer, db.ForeignKey('orders.id'))
    order = db.relationship('Order', back_populates='order_items')
    
    # Establishes photo_id as a foreign key an creates relationship allowing an OrderItem's associated photo to be returned (One [photo] to Many [OrderItem])
    photo_id = db.Column(db.Integer, db.ForeignKey('photos.id'))
    photo = db.relationship('Photo', back_populates='order_items')

    def __repr__(self):
        return f'<OrderItem {self.id}, Order: {self.order_id}, Photo: {self.photo_id}>'

