import React from "react"
import { Link } from 'react-router-dom';

function AllPosts( {posts }) {
    return (
        <div className="all-posts-container">
          <div className="post-list">
            {posts.map((post) => (
              <div className="post" key={post.id}>
                <Link to={`/posts/${post.id}`} className="post-link">
                  <h2>{post.title}</h2>
                  {post.images.length > 0 && (
                    <img
                      src={post.images[0].url}
                      alt={post.images[0].title} 
                      className="post-image"
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