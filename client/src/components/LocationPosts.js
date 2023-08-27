import React, { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';

function LocationPosts() {
  const { country } = useParams();
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetch(`http://127.0.0.1:5555/api/posts?country=${country}`)
      .then((response) => response.json())
      .then((postData) => {
        console.log(postData); // Check the fetched posts data in the console
        setPosts(postData);
      })
      .catch((error) => {
        console.error("Error fetching posts:", error);
      });
  }, [country]);

  return (
    <div>
      <h2>Posts for {country}</h2>
      <ul>
        {posts.map((post) => (
          <li key={post.id}>
            <h3>{post.title}</h3>
            <p>{post.content}</p>
            {/* Render other post details here */}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default LocationPosts;


