import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

function Login() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setMessage("");
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:8080/api/users/login", formData);
      if (res.data) {
        localStorage.setItem("username", res.data.name);
        localStorage.setItem("loginTime", Date.now());
        localStorage.setItem("email", res.data.email);

        setIsError(false);
        setMessage("✅ Login successful!");
        navigate("/home");
      }
    } catch (err) {
      console.error(err);
      setIsError(true);
      setMessage("❌ Login failed. Please check your credentials.");
    }
  };

  return (
    <div style={styles.pageWrapper}>
      <div style={styles.card}>
        <h2 style={styles.heading}>Login</h2>
        <form onSubmit={handleSubmit} style={styles.form}>
          <input
            name="email"
            type="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
            style={styles.input}
          />
          <input
            name="password"
            type="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
            style={styles.input}
          />
          <button type="submit" style={styles.button}>
            Login
          </button>
        </form>
        {message && (
          <p style={{ ...styles.message, color: isError ? "#e63946" : "#2a9d8f" }}>
            {message}
          </p>
        )}
        <p style={styles.registerText}>
          Don't have an account? <Link to="/register" style={styles.link}>Register here</Link>
        </p>
      </div>
    </div>
  );
}

const styles = {
  pageWrapper: {
    minHeight: "100vh",
    background: "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    fontFamily: "'Inter', Arial, sans-serif",
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 32,
    boxShadow: "0 8px 32px rgba(44, 62, 80, 0.1)",
    width: "100%",
    maxWidth: 400,
    boxSizing: "border-box",
    textAlign: "center",
  },
  heading: {
    marginBottom: 24,
    color: "#32475b",
    fontWeight: 700,
    fontSize: "1.8rem",
  },
  form: {
    display: "flex",
    flexDirection: "column",
  },
  input: {
    padding: "12px 15px",
    marginBottom: 20,
    borderRadius: 10,
    border: "1.5px solid #b0bec5",
    fontSize: "1rem",
    outline: "none",
    fontFamily: "inherit",
    transition: "border-color 0.3s ease",
  },
  button: {
    background: "linear-gradient(90deg, #48bb78 0%, #2f855a 100%)",
    color: "#fff",
    fontSize: "1.1rem",
    fontWeight: "700",
    border: "none",
    borderRadius: 12,
    padding: "12px 0",
    cursor: "pointer",
    boxShadow: "0 4px 15px rgba(72, 187, 120, 0.4)",
    transition: "background 0.3s ease",
  },
  message: {
    marginTop: 20,
    fontWeight: 600,
    fontSize: "1rem",
  },
  registerText: {
    marginTop: 18,
    fontSize: "0.95rem",
    color: "#576574",
  },
  link: {
    color: "#48bb78",
    textDecoration: "none",
  },
};

export default Login;
