import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Login from "./components/Login";
import Register from "./components/Register";
import Home from "./components/Home";
import AddItem from "./components/AddItem";
import BorrowForm from "./components/BorrowForm";
import BorrowList from "./components/BorrowList";
import OwnerRequestList from "./components/OwnerRequestList";
import ItemList from "./components/ItemList";
import ProtectedRoute from "./components/ProtectedRoute";
import InactivityHandler from "./components/InactivityHandler"; // ✅ We'll create this

// ✅ Session Timeout Checker
function SessionWatcher() {
  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => {
      const loginTime = localStorage.getItem("loginTime");
      if (loginTime) {
        const now = Date.now();
        const FIVE_MINUTES = 5 * 60 * 1000;

        if (now - loginTime > FIVE_MINUTES) {
          localStorage.clear();
          alert("Session expired. Please login again.");
          navigate("/");
        }
      }
    }, 60000); // check every 1 minute

    return () => clearInterval(interval);
  }, [navigate]);

  return null;
}

function App() {
  return (
    <Router>
      <Navbar />
      <SessionWatcher /> {/* ⏱ Session Timeout */}
      <InactivityHandler timeout={5 * 60 * 1000} /> {/* 💤 Inactivity logout */}

      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/home" element={<Home />} />

        {/* Protected Routes */}
        <Route path="/add-item" element={<ProtectedRoute><AddItem /></ProtectedRoute>} />
        <Route path="/borrow" element={<ProtectedRoute><BorrowForm /></ProtectedRoute>} />
        <Route path="/requests" element={<ProtectedRoute><BorrowList /></ProtectedRoute>} />
        <Route path="/owner-requests" element={<ProtectedRoute><OwnerRequestList /></ProtectedRoute>} />
        <Route path="/items" element={<ProtectedRoute><ItemList /></ProtectedRoute>} />
      </Routes>
    </Router>
  );
}

export default App;
