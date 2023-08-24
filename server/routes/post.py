from flask_restful import Resource
from config import api , db
from models import Post
from flask import request

class PostsResource(Resource):
    def get(self):
        posts = [post.to_dict() for post in Post.query.all()]
        return posts, 200
    
    def post(self):
        data = request.get_json()
        title = data.get('title')
        content = data.get('content')
        post = Post(
            title = title,
            content = content
        )

        return post, 201
    
    
    
api.add_resource(PostsResource, "/posts")

