import React, { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [pendingCount, setPendingCount] = useState(0);

  const username = localStorage.getItem("username");
  const navigate = useNavigate();

  useEffect(() => {
    const count = parseInt(localStorage.getItem("pendingCount")) || 0;
    setPendingCount(count);

    const interval = setInterval(() => {
      const latest = parseInt(localStorage.getItem("pendingCount")) || 0;
      setPendingCount(latest);
    }, 30000); // refresh every 30 seconds

    return () => clearInterval(interval);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("username");
    localStorage.removeItem("email");
    localStorage.removeItem("loginTime");
    localStorage.removeItem("pendingCount");
    navigate("/");
    window.location.reload();
  };

  return (
    <nav className="navbar">
      <div className="navbar-title">
        BorrowBuddy
        {username && (
          <span className="welcome-text">Welcome, {username} 👋</span>
        )}
      </div>

      {/* Hamburger menu icon for mobile */}
      <div className="hamburger" onClick={() => setMenuOpen((prev) => !prev)}>
        ☰
      </div>

      {/* Navigation links */}
      <div className={`navbar-links ${menuOpen ? "show" : ""}`}>
        <NavLink to="/" className="nav-link" onClick={() => setMenuOpen(false)}>Login</NavLink>
        <NavLink to="/register" className="nav-link" onClick={() => setMenuOpen(false)}>Register</NavLink>
        <NavLink to="/home" className="nav-link" onClick={() => setMenuOpen(false)}>Home</NavLink>
        <NavLink to="/add-item" className="nav-link" onClick={() => setMenuOpen(false)}>Add Item</NavLink>
        <NavLink to="/borrow" className="nav-link" onClick={() => setMenuOpen(false)}>Borrow</NavLink>
        <NavLink to="/requests" className="nav-link" onClick={() => setMenuOpen(false)}>My Requests</NavLink>

         <NavLink to="/owner-requests" className="nav-link" onClick={() => setMenuOpen(false)}>
          Owner Panel{" "}
          {pendingCount > 0 && (
            <span style={{
              background: "red",
              color: "white",
              borderRadius: "50%",
              padding: "2px 8px",
              marginLeft: "5px",
              fontSize: "12px"
            }}>
              {pendingCount}
            </span>
          )}
        </NavLink>

        <NavLink to="/items" className="nav-link" onClick={() => setMenuOpen(false)}>Items</NavLink>

        {username && (
          <button onClick={handleLogout} className="logout-button">
            Logout
          </button>
        )}
      </div>
    </nav>
  );
}

export default Navbar;