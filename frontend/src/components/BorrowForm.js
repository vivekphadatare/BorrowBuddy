import React, { useState, useEffect } from "react";
import axios from "axios";

function BorrowForm() {
  const [itemId, setItemId] = useState("");
  const [borrowerEmail, setBorrowerEmail] = useState(localStorage.getItem("email") || "");
  const [ownerEmail, setOwnerEmail] = useState("");
  useEffect(() => {
  const email = localStorage.getItem("email");
  console.log("Stored Email:", localStorage.getItem("email"));

  if (email) {
    setBorrowerEmail(email);
  }
}, []);

  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);


  const handleBorrow = async () => {

    console.log("Values:", itemId, borrowerEmail, ownerEmail);
    
    if (!itemId || !borrowerEmail || !ownerEmail) {
      setIsError(true);
      setMessage("❗ All fields are required.");
      return;
    }

    try {

         console.log("Sending Data:", {
  itemId,
  borrowerEmail,
  ownerEmail,
});

      await axios.post("http://localhost:8080/api/requests/create", {
        itemId,
        borrowerEmail,
        ownerEmail,
      });

   


      setIsError(false);
      setMessage("✅ Borrow request sent successfully!");
      setItemId("");
      setOwnerEmail("");
    } catch (error) {
      console.error("❌ Error sending borrow request", error);
      setIsError(true);
      setMessage("❌ Failed to send borrow request. Please try again.");
    }
  };

  return (
    <div style={styles.pageWrapper}>
      <div style={styles.card}>
        <h2 style={styles.heading}>📨 Send Borrow Request</h2>

        <label htmlFor="itemId" style={styles.label}>
          Item ID <span style={{ color: "#e63946" }}>*</span>
        </label>
        <input
          id="itemId"
          type="number"
          value={itemId}
          onChange={(e) => setItemId(e.target.value)}
          placeholder="Enter Item ID"
          style={styles.input}
        />

        <label htmlFor="borrowerEmail" style={styles.label}>
          Borrower Email <span style={{ color: "#e63946" }}>*</span>
        </label>
        <input
          id="borrowerEmail"
          type="email"
          value={borrowerEmail}
          onChange={(e) => setBorrowerEmail(e.target.value)}
          placeholder="Your Email"
          style={styles.input}
        />

        <label htmlFor="ownerEmail" style={styles.label}>
          Owner Email <span style={{ color: "#e63946" }}>*</span>
        </label>
        <input
          id="ownerEmail"
          type="email"
          value={ownerEmail}
          onChange={(e) => setOwnerEmail(e.target.value)}
          placeholder="Owner Email"
          style={styles.input}
        />

        <button onClick={handleBorrow} style={styles.button}>
          Send Request
        </button>

        {message && (
          <p style={{ 
            marginTop: 16,
            fontWeight: "600",
            color: isError ? "#e63946" : "#2a9d8f",
          }}>
            {message}
          </p>
        )}
      </div>
    </div>
  );
}

const styles = {
  pageWrapper: {
    minHeight: "100vh",
    padding: "24px 16px",
    background: "linear-gradient(135deg, #d0e8f2 0%, #a6c1ee 100%)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontFamily: "'Inter', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
  },
  card: {
    backgroundColor: "#fff",
    maxWidth: 480,
    width: "100%",
    borderRadius: 20,
    boxShadow: "0 10px 40px rgba(0, 0, 0, 0.1)",
    padding: 32,
    boxSizing: "border-box",
  },
  heading: {
    marginBottom: 28,
    textAlign: "center",
    color: "#264653",
    fontWeight: 700,
    fontSize: "1.8rem",
  },
  label: {
    display: "block",
    marginBottom: 6,
    fontWeight: 600,
    color: "#264653",
  },
  input: {
    width: "100%",
    padding: "12px 14px",
    fontSize: "1rem",
    borderRadius: 8,
    border: "1.5px solid #b0bec5",
    marginBottom: 24,
    outline: "none",
    transition: "border-color 0.3s ease",
    fontFamily: "inherit",
  },
  button: {
    width: "100%",
    padding: "14px 0",
    fontSize: "1.1rem",
    fontWeight: 700,
    color: "#fff",
    background: "linear-gradient(90deg, #48bb78 0%, #2f855a 100%)",
    border: "none",
    borderRadius: 12,
    cursor: "pointer",
    boxShadow: "0 6px 15px rgba(72, 187, 120, 0.4)",
    transition: "background 0.3s ease",
  },
};

export default BorrowForm;
