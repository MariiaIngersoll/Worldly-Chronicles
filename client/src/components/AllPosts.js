import React from "react"
import { Link } from 'react-router-dom';
// import SinglePost from "./SinglePost"
    
    

function AllPosts( {posts }) {
    // const listOfPosts = posts.map((post) => {
    //     return <SinglePost key = {post.id} post = {post}/>
    // })

    return (
        <div className="all-posts-container">
          <div className="post-list">
            {posts.map((post) => (
              <div className="post" key={post.id}>
                <Link to={`/posts/${post.id}`} className="post-link">
                  <h2>{post.title}</h2>
                  {post.images.length > 0 && (
                    <img
                      src={post.images[0].url} // Display the URL of the first image
                      alt={post.images[0].title} // Alt text for accessibility
                      className="post-image" // You can add any necessary classes
                    />
                  )}
                </Link>
              </div>
            ))}
          </div>
        </div>
      );
    }
export default AllPosts