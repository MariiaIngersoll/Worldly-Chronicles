#!/usr/bin/env python3
from flask import request, make_response, session, abort
from flask_restful import Resource

from config import app, db, api
from models import User, Post, Image, Location
from ipdb import set_trace

from flask_restful import Resource
from config import api, db
from models import Post

from werkzeug.exceptions import NotFound
from sqlalchemy.exc import IntegrityError


@app.route('/')
def index():
    return '<h1>Welcome to Worldly-Chronicles!</h1>'

class Signup(Resource):
    def post(self):
        json_data = request.get_json()

        username = json_data.get('username')
        email = json_data.get('email')
        password = json_data.get('password')

        if username and password:
            new_user = User(
                username=username,
                email = email,
            )
            new_user.password_hash = password
            db.session.add(new_user)
            db.session.commit()

            session['user_id'] = new_user.id
        
            response = make_response(new_user.to_dict(), 201)
            return response
        

api.add_resource(Signup, "/api/signup/")

class Login(Resource):
    def post(self):
        json_data = request.get_json()
        username = json_data.get('username')
        password = json_data.get('password')
        user = User.query.filter(User.username == username).first()
        
        if user:
            if user.authenticate(password):
                session['user_id'] = user.id
                response = make_response(user.to_dict(), 200)
                return response
        return {'Incorrect username or password'}, 401
    
api.add_resource(Login, '/api/login/')

class CheckSession(Resource):
    def get(self):
        try:
            user = User.query.filter_by(id=session['user_id']).first()
            response = make_response(user.to_dict(), 200)
            return response
        except:
            abort(401, "Please log in")
api.add_resource(CheckSession, '/api/check_session/')

class Logout(Resource):
    def delete(self):
        session['user_id'] = None
        response = make_response('', 204)
        return response
api.add_resource(Logout, '/api/logout/')

@app.route("/users")
class Users(Resource):
    def get(self):
        users = [user.to_dict() for user in User.query.all()]
        response =  make_response(users, 200)  
        return response
    
api.add_resource(Users, '/api/users/')
    

@app.route("/posts")
class PostsResource(Resource):
    def get(self):
        country = request.args.get('country')
        if country:
            posts = [post.to_dict() for post in Post.query.filter(Post.locations.any(country=country))]
        else:
            posts = [post.to_dict() for post in Post.query.all()]

        response = make_response(
            posts, 
            200
        )
        return response
        
    def post(self):
        data = request.get_json()
        title = data.get('title')
        content = data.get('content')
        images = data.get('images', [])
        locations_data = data.get('locations_data', []) 
        user_id = data.get('user_id')

        print("Received Data:", data)

        new_post = Post(
            title=title,
            content=content,
            user_id=user_id
        )
        for url in images:
            new_image = Image(url=url)
            new_post.images.append(new_image)

        for loc_data in locations_data:
            country = loc_data.get("country")
            city = loc_data.get("city")
            location = Location.query.filter_by(country=country, city=city).first()
            if not location:
                location = Location(country=country, city=city)
            new_post.locations.append(location)

        db.session.add(new_post)

        try:
            db.session.commit()
            response = make_response(
                new_post.to_dict(),
                201
            )
            return response
        except Exception as e:
            print("Error:", e)
            db.session.rollback()
            return {"message": "An error occurred while creating the post."}, 500
        

api.add_resource(PostsResource, "/api/posts/", endpoint='posts')

@app.route("/posts/<int:post_id>")
class PostResource(Resource):
    def get(self, post_id):
        post = Post.query.filter_by(id = post_id).first()

        response = make_response(
            post.to_dict(),
            200
        )
        return response
    
    def delete(self, post_id):
        post = Post.query.filter_by(id=post_id).first()
        if post: 
            db.session.delete(post)
            db.session.commit()
            response = make_response(
            "deletion completed",
            204
        )

        return response
        
    def patch(self, post_id):
        form_json = request.get_json()
        post = Post.query.filter_by(id=post_id).first()
        post.title = form_json['title']
        post.content = form_json['content']
    
        db.session.commit()
        
        response = make_response(
            post.to_dict(), 
            200 
        )

        return response

api.add_resource(PostResource, "/api/posts/<int:post_id>", endpoint='post_by_id')
@app.route('/locations') 
class LocationResource(Resource):
    def get(self):
        locations = [location.to_dict() for location in Location.query.all()]
        response = make_response(
            locations,
            200
        )
        return response
    
@app.route('/images')
class ImageResourse(Resource):
    def get(self):
        images = [image.to_dict() for image in Image.query.all()]
        response = make_response(
            images,
            200
        )
        return response
    

api.add_resource(LocationResource, "/api/locations/", endpoint="/locations")
api.add_resource(ImageResourse,"/api/images/", endpoint="/images")



if __name__ == '__main__':
    app.run(port=5555, debug=True)
    
    


