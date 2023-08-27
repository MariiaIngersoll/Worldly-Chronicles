import React from "react";
import { Link } from "react-router-dom";

function Navigation() {
  return (
    <nav className="navbar">
      <div className="nav-center">
        <span className="nav-logo nav-wordly">Wordly-Chronicles</span>
        <div className="nav-links">
          <Link to="/home" className="nav-link">Home</Link>
          <Link to="/posts" className="nav-link">All Posts</Link>
          <Link to='/create/post' className="nav-link">Add Post</Link>
          <Link to="/contact" className="nav-link nav-contact">Contact</Link>
        </div>
      </div>
    </nav>
  );
}

export default Navigation;