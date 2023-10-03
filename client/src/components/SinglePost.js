import React from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function SinglePost({ posts, handleDelete }) {
  const { postId } = useParams();
  const post = posts.find((post) => post.id === parseInt(postId));

  const navigate = useNavigate()
  if (!post) {
    return <div>Loading...</div>;
  }

  const handleDeletePost = (postId) => {
    handleDelete(postId);
    navigate("/posts");
  };

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
        <div className="deleteBtnContainer">
          <button className="deleteBtn" onClick={() => handleDeletePost(post.id)}> Delete</button>
        </div>
         
      </div>
     
    </div>
  );
}

export default SinglePost;