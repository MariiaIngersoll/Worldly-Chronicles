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
          src="https://media.istockphoto.com/id/1285301614/photo/young-man-arms-outstretched-by-the-sea-at-sunrise-enjoying-freedom-and-life-people-travel.jpg?s=612x612&w=0&k=20&c=0QW6GnkuFNYcPZhy26XVHuTc2avJTK8u6l_1iT0SlZk="
          alt="Travel"
          className="home-image"
        />
      </div>
      </div>
    </div>
  );
}

export default Home;