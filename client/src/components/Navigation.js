import React from "react";
import { NavLink, useNavigate } from "react-router-dom";

function Navigation({ user, setUser }) {
  const navigate = useNavigate();

  const handleLogOut = () => {
    setUser(null);
    navigate("/");
  };

  return (
    <nav className="navbar">
      <div className="nav-center">
        <span className="nav-logo nav-wordly">Wordly-Chronicles</span>
        <div className="nav-links">
          <NavLink to="/" className="nav-link">
            Home
          </NavLink>
          <NavLink to="/posts" className="nav-link">
            All Posts
          </NavLink>
          <NavLink to="/contact" className="nav-link nav-contact">
            Contact
          </NavLink>
          {user ? (
            <button className="nav-link" onClick={handleLogOut}>
              Log Out
            </button>
          ) : (
            <NavLink to="/" className="nav-link">
              Log In
            </NavLink>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navigation;
