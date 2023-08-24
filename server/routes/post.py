from flask_restful import Resource
from config import api , db
from models import Post
from flask import request, make_response

class PostsResource(Resource):
    def get(self):
        posts = [post.to_dict() for post in Post.query.all()]
        return posts, 200
    
    def post(self):
        data = request.get_json()
        title = data.get('title')
        content = data.get('content')
        new_post = Post(
            title = title,
            content = content
        )
        db.session.add(new_post)
        db.session.commit()
        response = make_response(
            new_post.to_dict(),
            201
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

    
api.add_resource(PostsResource, "/posts")

