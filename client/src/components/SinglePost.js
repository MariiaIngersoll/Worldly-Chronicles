import React from "react";
import { useParams } from "react-router-dom";

function SinglePost({ posts }) {
  const { postId } = useParams();
  const post = posts.find((post) => post.id === parseInt(postId));

  if (!post) {
    return <div>Loading...</div>;
  }

  const paragraphs = post.content.split("\n");

  return (
    <div className="single-post-container">
      <div className="post-title">
        <h2>{post.title}</h2>
      </div>
      <div className="post-images">
        {post.images.map((image) => (
          <div key={image.id}>
            <img
              className="post-image"
              src={image.url}
              alt={post.title}
            />
          </div>
        ))}
      </div>
      <div>
        <ul className="post-locations">
          {post.locations.map((loc, index) => (
            <li key={loc.id} className="location">
              <h2>{loc.country}, {loc.city}</h2>
            </li>
          ))}
        </ul>
        {paragraphs.map((paragraph, index) => (
          <p key={index} className="content">
            {paragraph}
          </p>
        ))}
      </div>
    </div>
  );
}

export default SinglePost;