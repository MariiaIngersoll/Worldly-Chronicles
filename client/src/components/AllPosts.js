import React from "react"
import SinglePost from "./SinglePost"
    
    

function AllPosts( {posts }) {
    const listOfPosts = posts.map((post) => {
        return <SinglePost key = {post.id} post = {post}/>
    })
    console.log(posts)
    return (
        <div>
          <h1>{listOfPosts}</h1>
        </div>
      );
} 
export default AllPosts