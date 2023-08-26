import React from "react"
import { Link } from 'react-router-dom';
// import SinglePost from "./SinglePost"
    
    

function AllPosts( {posts }) {
    // const listOfPosts = posts.map((post) => {
    //     return <SinglePost key = {post.id} post = {post}/>
    // })

    return (
        <div>
          {posts.map((post) => (
            <div key={post.id}>
              <Link to={`/posts/${post.id}`}>
                <h2>{post.title}</h2>
              </Link>
            </div>
          ))}
        </div>
      );
    }
export default AllPosts