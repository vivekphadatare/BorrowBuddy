import React from "react";
import { useNavigate } from "react-router-dom"; // assuming you use react-router

function Home() {
  const navigate = useNavigate();

  const images = [
    "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=facearea&w=400&h=400&q=80",
    "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80",
    "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=400&q=80",
    "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80",
  ];

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "Inter, Arial, sans-serif",
        padding: "20px",
      }}
    >
      <div
        style={{
          background: "#fff",
          padding: "48px 32px",
          borderRadius: "20px",
          boxShadow: "0 8px 32px rgba(44, 62, 80, 0.08)",
          maxWidth: "430px",
          width: "100%",
          textAlign: "center",
        }}
      >
        {/* Shaped Image Boxes */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "16px",
            marginBottom: "32px",
            flexWrap: "wrap",
          }}
        >
          <div
            style={{
              width: 65,
              height: 65,
              borderRadius: "50%",
              overflow: "hidden",
              boxShadow: "0 2px 8px rgba(68,31,95,0.10)",
            }}
          >
            <img
              src={images[0]}
              alt="Community member"
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          </div>
          <div
            style={{
              width: 65,
              height: 65,
              borderRadius: 12,
              overflow: "hidden",
              boxShadow: "0 2px 8px rgba(68,220,88,0.10)",
            }}
          >
            <img
              src={images[1]}
              alt="Tools and equipment"
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          </div>
          <div
            style={{
              width: 80,
              height: 45,
              borderRadius: 16,
              overflow: "hidden",
              boxShadow: "0 2px 8px rgba(192,249,94,0.10)",
            }}
          >
            <img
              src={images[2]}
              alt="Books and borrowables"
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          </div>
          <div
            style={{
              width: 75,
              height: 50,
              borderRadius: "70% / 50%",
              overflow: "hidden",
              boxShadow: "0 2px 8px rgba(237,34,218,0.10)",
            }}
          >
            <img
              src={images[3]}
              alt="Abstract community sharing"
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          </div>
        </div>

        {/* Main content */}
        <div style={{ fontSize: "2.5rem", marginBottom: 14 }}>🏡</div>
        <h2
          style={{
            marginBottom: 16,
            color: "#32475b",
            fontWeight: 700,
            letterSpacing: "0.5px",
          }}
        >
          Welcome to BorrowBuddy!
        </h2>
        <p
          style={{
            color: "#576574",
            marginBottom: 30,
            fontSize: "1.07rem",
            lineHeight: 1.6,
          }}
        >
          This is your dashboard/home page after login.
          <br />
          Explore, connect, and manage your borrowings easily.
        </p>

        {/* Register & Login Buttons */}
        <div style={{ display: "flex", justifyContent: "center", gap: "16px" }}>
          <button
            onClick={() => navigate("/register")}
            style={{
              padding: "10px 20px",
              borderRadius: 9,
              border: "2px solid #48bb78",
              background: "transparent",
              color: "#48bb78",
              fontWeight: 600,
              fontSize: "1rem",
              cursor: "pointer",
              transition: "background 0.2s, color 0.2s",
              minWidth: "120px",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "#48bb78";
              e.currentTarget.style.color = "#fff";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "transparent";
              e.currentTarget.style.color = "#48bb78";
            }}
          >
            Register
          </button>

          <button
            onClick={() => navigate("/Login")}
            style={{
              padding: "10px 20px",
              borderRadius: 9,
              border: "2px solid #32475b",
              background: "transparent",
              color: "#32475b",
              fontWeight: 600,
              fontSize: "1rem",
              cursor: "pointer",
              transition: "background 0.2s, color 0.2s",
              minWidth: "120px",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "#32475b";
              e.currentTarget.style.color = "#fff";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "transparent";
              e.currentTarget.style.color = "#32475b";
            }}
          >
            Log In
          </button>
        </div>
      </div>
    </div>
  );
}

export default Home;
