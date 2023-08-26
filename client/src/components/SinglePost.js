import React from "react";
import { useParams } from "react-router-dom";

function SinglePost({ posts }) {
  const { postId } = useParams();
  const post = posts.find((post) => post.id === parseInt(postId));

  if (!post) {
    return <div>Loading...</div>;
  }

  return (
    <div className="card">
      <div className="image">
        <h2>{post.title}</h2>
        <ul>
          {post.images.map((image) => (
            <li key={image.id}>
              <img className="PostImg" src={image.url} alt={post.title} />
            </li>
          ))}
        </ul>
        <ul>
          {post.locations.map((loc) => (
            <li key={loc.id}>
              <h2>{loc.country}, {loc.city}</h2>
            </li>
          ))}
        </ul>
        <p>{post.content}</p>
      </div>
    </div>
  );
}

export default SinglePost;