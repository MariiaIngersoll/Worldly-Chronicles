import React from "react";

function SinglePost({ post }) {
  console.log("Post:", post); // Add this line to check the data received for the post

  return (
    <div className="card">
      <div className="image">
        <h2>{post.title}</h2>
        <ul>
          {post.images.map((image) => (
            <li key={image.id}>
              <img className = "PostImg" src={image.url} alt={post.title} />
            </li>
          ))}
        </ul>
        <ul>
        {post.locations.map((loc) => (
            <div key={loc.id}>
                <h2>{loc.country}, {loc.city}</h2>
        
            </div>
            ))}
        </ul>
        <p>{post.content}</p>
      </div>
    </div>
  );
}

export default SinglePost;




