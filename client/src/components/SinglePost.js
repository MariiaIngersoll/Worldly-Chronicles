import React, {useState} from "react"

function SinglePost({post}){
    return (
        <li className="card">
        <div className="image">   
            <h2>{post.title}</h2>
        </div>
    </li>
    )
}

export default SinglePost