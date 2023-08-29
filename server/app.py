#!/usr/bin/env python3
from flask import request
from flask_restful import Resource

from config import app, db, api
from models import User, Post, Image, Location
from ipdb import set_trace

from flask_restful import Resource
from config import api, db
from models import Post
from flask import request, make_response

@app.route('/')
def index():
    return '<h1>Worldly Chronicles Back End Development</h1>'


@app.route("/users")
class Users(Resource):
    def get(self):
        users = [user.to_dict() for user in User.query.all()]
        response =  make_response(users, 200)  
        return response
    
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
        locations_data = data.get('locations', []) 
        user_id = data.get('user_id')

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
            return "", 204
        else:
            return {"message": "Post not found!"}, 404
        
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

@app.route('/locations') 
class LocationResource(Resource):
    def get(self):
        locations = [location.to_dict() for location in Location.query.all()]
        response = make_response(
            locations,
            200
        )
        return response
    


api.add_resource(Users, '/api/users/', endpoint='users')
api.add_resource(PostsResource, "/api/posts/", endpoint='posts')
api.add_resource(PostResource, "/api/posts/<int:post_id>/", endpoint='post_by_id')
api.add_resource(LocationResource, "/api/locations/", endpoint="/locations")



if __name__ == '__main__':
    app.run(port=5555, debug=True)
    
    


