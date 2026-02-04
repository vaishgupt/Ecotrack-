import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  // Check if user is logged in (has token in localStorage)
  // Check directly so it updates immediately when token changes
  const isLoggedIn = !!localStorage.getItem("token");

  // Function to handle logout
  const handleLogout = () => {
    // Remove token from localStorage
    localStorage.removeItem("token");
    alert("Logged out successfully");
    navigate("/");
  };

  return (
    <nav>
      <h1>EcoTrack</h1>
      <ul>
        <li><Link to="/" className={location.pathname === "/" ? "active" : ""}>🏠 Home</Link></li>
        <li><Link to="/calculate" className={location.pathname === "/calculate" ? "active" : ""}>🧮 Calculator</Link></li>
        {isLoggedIn ? (
          <li>
            <button onClick={handleLogout}>→ Logout</button>
          </li>
        ) : (
          <li><Link to="/login" className={location.pathname === "/login" ? "active" : ""}>→ Login</Link></li>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
