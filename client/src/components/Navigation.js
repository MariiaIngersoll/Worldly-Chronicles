import React from "react";
import { NavLink, useNavigate } from "react-router-dom";

function Navigation() {

  return (
    <nav className="navbar">
      <div className="nav-center">
        <span className="nav-logo nav-wordly">Wordly-Chronicles</span>
        <div className="nav-links">
          <NavLink to="/home" className="nav-link" >Home</NavLink>
          <NavLink to="/posts" className="nav-link" >All Posts</NavLink>
          <NavLink to='/create/post' className="nav-link" >Add Post</NavLink>
          <NavLink to="/contact" className="nav-link nav-contact" >Contact</NavLink>
        </div>
      </div>
    </nav>
  );
}

export default Navigation;