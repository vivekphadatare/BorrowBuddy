import React, { useEffect, useState } from "react";
import axios from "axios";
import ReturnReviewForm from "./ReturnReviewForm"; // ✅ make sure the path is correct

function BorrowList() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [returningRequest, setReturningRequest] = useState(null); // ✅ for Return modal
  const userEmail = localStorage.getItem("email");

  useEffect(() => {
    if (!userEmail) {
      setLoading(false);
      return;
    }

    setLoading(true);
    axios
      .get(`http://localhost:8080/api/requests/borrower/${userEmail}`)
      .then((res) => {
        setRequests(res.data);
        setError(null);
      })
      .catch((err) => {
        console.error("❌ Failed to fetch borrow requests", err);
        setError("Failed to load borrow requests. Please try again.");
      })
      .finally(() => setLoading(false));
  }, [userEmail]);

  const renderStatusBadge = (status) => {
    let bgColor = "#ddd";
    let color = "#444";

    switch (status?.toLowerCase()) {
      case "pending":
        bgColor = "#f9d342";
        color = "#5a4500";
        break;
      case "approved":
        bgColor = "#48bb78";
        color = "#1a3c12";
        break;
      case "rejected":
        bgColor = "#e53e3e";
        color = "#520000";
        break;
      case "returned":
        bgColor = "#3182ce";
        color = "#ffffff";
        break;
      default:
        bgColor = "#90a4ae";
        color = "#263238";
    }

    return (
      <span
        style={{
          backgroundColor: bgColor,
          color,
          borderRadius: "12px",
          padding: "4px 12px",
          fontWeight: "600",
          fontSize: "0.9rem",
          whiteSpace: "nowrap",
        }}
      >
        {status}
      </span>
    );
  };

  return (
    <div style={styles.pageWrapper}>
      <div style={styles.card}>
        <h2 style={styles.heading}>📋 My Borrow Requests</h2>

        {loading ? (
          <p style={styles.message}>Loading borrow requests...</p>
        ) : error ? (
          <p style={{ ...styles.message, color: "#e53e3e" }}>{error}</p>
        ) : requests.length === 0 ? (
          <p style={styles.message}>You have no borrow requests yet.</p>
        ) : (
          <div style={{ overflowX: "auto" }}>
            <table style={styles.table}>
              <thead>
                <tr>
                  <th style={styles.th}>Request ID</th>
                  <th style={styles.th}>Item ID</th>
                  <th style={styles.th}>Owner Email</th>
                  <th style={styles.th}>Status</th>
                  <th style={styles.th}>Action</th>
                </tr>
              </thead>
              <tbody>
                {requests.map((req) => (
                  <tr key={req.id} style={styles.tr}>
                    <td style={styles.td}>{req.id}</td>
                    <td style={styles.td}>{req.itemId}</td>
                    <td style={styles.td}>{req.ownerEmail}</td>
                    <td style={styles.td}>{renderStatusBadge(req.status)}</td>
                    <td style={styles.td}>
                      {req.status.toLowerCase() === "approved" && (
                        <button
                          onClick={() => setReturningRequest(req)}
                          style={{
                            padding: "6px 10px",
                            backgroundColor: "#2b9348",
                            color: "white",
                            border: "none",
                            borderRadius: "5px",
                            cursor: "pointer",
                          }}
                        >
                          Return
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* ✅ Modal for Return + Review */}
      {returningRequest && (
        <ReturnReviewForm
          request={returningRequest}
          onClose={() => setReturningRequest(null)}
          onSubmitted={() => {
            setReturningRequest(null);
            window.location.reload(); // or re-fetch data
          }}
        />
      )}
    </div>
  );
}

const styles = {
  pageWrapper: {
    minHeight: "100vh",
    background: "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)",
    display: "flex",
    justifyContent: "center",
    alignItems: "flex-start",
    padding: "40px 16px",
    fontFamily: "'Inter', Arial, sans-serif",
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 20,
    boxShadow: "0 8px 32px rgba(44, 62, 80, 0.08)",
    maxWidth: 1000,
    width: "100%",
    padding: 32,
    boxSizing: "border-box",
  },
  heading: {
    marginBottom: 24,
    color: "#32475b",
    fontWeight: 700,
    fontSize: "2rem",
    textAlign: "center",
  },
  message: {
    textAlign: "center",
    fontSize: "1.1rem",
    color: "#576574",
    fontWeight: 500,
  },
  table: {
    borderCollapse: "collapse",
    width: "100%",
    minWidth: 600,
  },
  th: {
    borderBottom: "2px solid #cbd5e0",
    textAlign: "left",
    padding: "12px 16px",
    color: "#4a5568",
    fontWeight: 600,
    fontSize: "1rem",
  },
  td: {
    borderBottom: "1px solid #e2e8f0",
    padding: "12px 16px",
    color: "#2d3748",
    fontSize: "0.95rem",
    verticalAlign: "middle",
  },
  tr: {
    transition: "background-color 0.2s ease",
    cursor: "default",
  },
};

export default BorrowList;
