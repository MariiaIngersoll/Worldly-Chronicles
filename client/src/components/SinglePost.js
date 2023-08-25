import React, {useState} from "react"

function SinglePost({post}){
    return (
        <div className="singlePost">
            <h2>{post.title}</h2>
            <img src = {post.images} alt= {post.title}></img>
            <p3>{post.content}</p3>
        </div>
    );
}

export default SinglePost