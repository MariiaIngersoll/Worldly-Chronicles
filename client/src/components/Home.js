import React from "react";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="home-container">
      <h1 className="home-title">Welcome to Worldly Chronicles!</h1>
      <p className="home-description">
        Discover exciting travel destinations and explore amazing posts.
      </p>
      <div className="home-links">
        <Link to="/posts" className="home-link">
          Explore All Posts
        </Link>
        <Link to="/locations" className="home-link">
          Check Posts by Location
        </Link>
      </div>
    </div>
  );
}

export default Home;