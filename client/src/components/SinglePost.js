import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

function SinglePost({ handleDelete }) {
  const [post, setPost] = useState({});
  const { postId } = useParams();

  const navigate = useNavigate();

  useEffect(() => {
    fetch(`/api/posts/${postId}`)
      .then((response) => response.json())
      .then((data) => {
        setPost(data);
      })
      .catch((error) => {
        console.error("Error fetching post data:", error);
      });
  }, [postId]);

  if (!post || post.id !== parseInt(postId)) {
    return <div>Loading...</div>;
  }

  const handleDeletePost = (postId) => {
    handleDelete(postId);
    navigate("/");
  };

  const paragraphs = post.content.split("\n");

  return (
    <div className="single-post-container">
      <div className="post-title">
        <h2 className="posth2">{post.title}</h2>
      </div>
      <div className="post-images">
        {post.images.map((image) => (
          <div key={image.id}>
            <img className="post-image" src={image.url} alt={post.title} />
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
        <div className="btn-container">
          <button className="shared-btn-style deleteBtn" onClick={() => handleDeletePost(post.id)}> Delete</button>
          <Link to={`/posts/edit/${post.id}`} className="shared-btn-style updateLink">Update</Link>
        </div>
      </div>
    </div>
  );
}

export default SinglePost;