#!/usr/bin/env python3

# Standard library imports

# Remote library imports
from flask import request, make_response, session
from flask_restful import Resource
from werkzeug.exceptions import NotFound, Unauthorized

# Local imports
from config import app, db, api
# Add your model imports
from models import User, PhotoShoot, Order, Photo, OrderItem

# Views go here!

@app.route('/')
def index():
    return '<h1>Project Server</h1>'

class Users(Resource):
    def post(self):
        request_json = request.get_json()

        new_user = User(
            firstname=request_json['firstname'],
            lastname=request_json['lastname'],
            username=request_json['username'],
            email=request_json['email'],
            password_hash=request_json['password']
        )

        db.session.add(new_user)
        db.session.commit()
        session["user_id"] = new_user.id
        return make_response(new_user.to_dict(rules=("-_password_hash",)), 201)

api.add_resource(Users, "/users")
    
class UserByID(Resource):
    def patch(self, id):
        user = User.query.filter_by(id=id).first()
        
        for attr in request.form:
            setattr(user, attr, request.form[attr])
        
        db.session.add(user)
        db.session.commit()

        user_dict = user.to_dict()

        response = make_response(
            user_dict,
            200
        )

        return response

api.add_resource(UserByID, '/users/<int:id>')

class PhotoShoots(Resource):
    def get(self):
        photo_shoot_list = [ps.to_dict() for ps in PhotoShoot.query.filter(PhotoShoot.user_id == session.get("user_id")).all()]

        response = make_response(
            photo_shoot_list,
            200
        )

        return response
    
api.add_resource(PhotoShoots, '/photo_shoots')

class PhotoShootByID(Resource):
    def get(self, id):
        photo_shoot = PhotoShoot.query.filter_by(id=id).first()
        photo_shoot_dict = photo_shoot.to_dict()

        response = make_response(
            photo_shoot_dict,
            200
        )

        return response

api.add_resource(PhotoShootByID, '/photos/<int:id>')

class Cart(Resource):
    def get(self):
        cart = Order.query.filter(Order.order_purchased == False, Order.user_id == session.get("user_id")).first()

        cart_dict = cart.to_dict()

        response = make_response(
            cart_dict,
            200
        )

        return response

api.add_resource(Cart)

class OrderItems(Resource):
    def post(self):
        request_json = request.get_json()

        new_order_item = OrderItem(
            order_id=request_json['order_id'],
            photo_id=request_json['photo_id']
        )

        db.session.add(new_order_item)
        db.session.commit()
        return make_response(new_order_item.to_dict(), 201)

api.add_resource(OrderItems, '/order_items')

class OrderItemByID(Resource):
    def delete(self, id):
        order_item = OrderItem.query.filter_by(id=id).first()
        db.session.delete(order_item)
        db.session.commit()

        response = make_response("", 204)

        return response
    
api.add_resource(OrderItemByID, '/order_items/<int:id>')

class Checkout(Resource):
    def patch(self, id):
        order = Order.query.filter_by(id=id).first()

        for photo in order.photos:
            order.order_price += photo.photo_price

        order.photo_quantity = len(order.photos)
        order.order_purchased = True

        db.session.add(order)
        db.session.commit()

        new_order = Order(photo_quantity = 0, order_price = 0, order_purchased = False, user_id = session.get("user_id"))

        db.session.add(new_order)
        db.session.commit()

        response = make_response(
            new_order,
            200
        )

        return response

api.add_resource(Checkout, '/checkout')                

class PlacedOrders(Resource):
    def get(self):
        orders = [order.to_dict() for order in Order.query.filter(Order.user_id == session.get("user_id"), Order.order_purchased == True).all()]

        response = make_response(
            orders,
            200
        )

        return response

api.add_resource(PlacedOrders, '/placed_orders')

class OrderByID(Resource):
    def get(self, id):
        order = Order.query.filter_by(id=id).first()

        order_dict = order.to_dict()

        response = make_response(
            order_dict,
            200
        )

        return response
    
api.add_resource(OrderByID, '/orders/<int:id>')

class Login(Resource):
    def post(self):
        user = User.query.filter(User.username == request.get_json().get('username')).first()

        if user and user.authenticate(request.get_json().get('password')):
            session["user_id"] = user.id
            return make_response(user.to_dict(rules=("-_password_hash",)), 200)

api.add_resource(Login, "/login")

class LoggedIn(Resource):
    def get(self):
        user = User.query.filter(User.id == session.get("user_id")).first()
        if user:
            return make_response(user.to_dict(rules=("-_password_hash",)), 200)
        
api.add_resource(LoggedIn, "/logged_in")

class Logout(Resource):
    def delete(self):
        session["user_id"] = None
        return make_response("", 204)

api.add_resource(Logout, "/logout")


if __name__ == '__main__':
    app.run(port=5555, debug=True)

