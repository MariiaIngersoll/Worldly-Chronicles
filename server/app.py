#!/usr/bin/env python3

# Standard library imports

# Remote library imports
from flask import request
from flask_restful import Resource
# Local imports
from config import app, db, api
from models import User, Post, Image, Location
from ipdb import set_trace

from flask_restful import Resource
from config import api, db
from models import Post
from flask import request, make_response

@app.route("/posts")
class PostsResource(Resource):
    def get(self):
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
        new_post = Post(
            title=title,
            content=content
        )
        db.session.add(new_post)
        db.session.commit()
        response = make_response(
            new_post.to_dict(),
            201
        )
        return response
    
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


api.add_resource(PostsResource, "/api/posts/", endpoint='posts')
api.add_resource(PostResource, "/api/posts/<int:post_id>/", endpoint='post_by_id')


if __name__ == '__main__':
    app.run(port=5555, debug=True)
    
    


