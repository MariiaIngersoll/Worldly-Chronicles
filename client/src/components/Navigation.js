import React from "react";
import { Link } from "react-router-dom";

function Navigation() {
  return (
    <nav className="navbar">
      <ul className="nav-list">
        <li>
          <Link to="/home" className="nav-link">Home</Link>
        </li>
        <li>
          <Link to="/posts" className="nav-link">All Posts</Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navigation;