import React from "react";
import { useParams } from "react-router-dom";

function SinglePost({ posts }) {
  const { postId } = useParams();
  const post = posts.find((post) => post.id === parseInt(postId));

  if (!post) {
    return <div>Loading...</div>;
  }

  return (
    <div className="single-post-container">
      <div className="post-title">
        <h2>{post.title}</h2>
      </div>
      <ul className="post-images">
        {post.images.map((image) => (
          <li key={image.id}>
            <img
              className="post-image"
              src={image.url}
              alt={post.title}
            />
          </li>
        ))}
      </ul>
      <ul className="post-locations">
        {post.locations.map((loc) => (
          <li key={loc.id} className="location">
            <h2>{loc.country}, {loc.city}</h2>
          </li>
        ))}
      </ul>
      <p className="content">{post.content}</p>
    </div>
  );
}

export default SinglePost;
