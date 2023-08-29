import React from "react";
import { Link } from "react-router-dom";

function Home() {

  return (
    <div className="home-container">
      <h1 className="home-title">Welcome to Worldly Chronicles!</h1>
      <p className="home-paragraph"> Join us on a journey through captivating narratives that bring the world's most stunning places to life. Our blog lets you explore iconic landmarks, tranquil escapes, and cultural treasures without leaving your seat.</p>
      <div className="home-links">
        <Link to="/posts" className="home-link">
          Explore All Posts
        </Link>
        <Link to="/locations" className="home-link">
          Check Posts by Location
        </Link>
        <div className="home-image">
        <img
          src="https://cdn.divein.com/wp-content/uploads/Travel/travel-quotes-featured.jpg"
          alt="Travel"
          className="home-image"
        />
      </div>
      </div>
    </div>
  );
}

export default Home;