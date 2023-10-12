import React, { useEffect, useState } from "react";
import { Link, useParams } from 'react-router-dom';

function LocationPosts() {
  const { country } = useParams();
  const [posts, setPosts] = useState([]);
  
  useEffect(() => {
    fetch(`/api/locations/${country}`)
      .then((response) => response.json())
      .then((postData) => {
        console.log(postData); 
        setPosts(postData);
      })
      .catch((error) => {
        console.error("Error fetching posts:", error);
      });
  }, [country]);
  return (
    <div className="locations-container">
      <h2>Posts about {country}</h2>
      <div className="country-grid">
        {posts.map((post) => (
          <div key={post.id} className="country-card">
            <Link to={`/posts/${post.id}`}>
              <h3>{post.title}</h3>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default LocationPosts;

