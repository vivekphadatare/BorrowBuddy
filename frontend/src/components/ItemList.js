import React, { useEffect, useState } from "react";
import axios from "axios";

function ItemList() {
  const [items, setItems] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [selectedItemId, setSelectedItemId] = useState(null);
  const [loadingItems, setLoadingItems] = useState(true);
  const [loadingReviews, setLoadingReviews] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const fetchItems = async () => {
    setLoadingItems(true);
    setErrorMsg("");
    try {
      const res = await axios.get("http://localhost:8080/api/items/all");
      setItems(res.data);
    } catch (err) {
      console.error("❌ Failed to fetch items", err);
      setErrorMsg("Failed to load items. Please try again later.");
    } finally {
      setLoadingItems(false);
    }
  };

  const fetchReviews = async (itemId) => {
    setLoadingReviews(true);
    setErrorMsg("");
    try {
      const res = await axios.get(`http://localhost:8080/api/reviews/item/${itemId}`);
      setReviews(res.data);
      setSelectedItemId(itemId);
    } catch (err) {
      console.error("❌ Failed to fetch reviews", err);
      setErrorMsg("Failed to load reviews. Please try again later.");
      setSelectedItemId(null);
    } finally {
      setLoadingReviews(false);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  // Render star rating for reviews
  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const halfStar = rating - fullStars >= 0.5;
    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <span key={"full" + i} style={{ color: "#f4c150", fontSize: "1.1rem" }}>
          ★
        </span>
      );
    }
    if (halfStar) {
      stars.push(
        <span key="half" style={{ color: "#f4c150", fontSize: "1.1rem" }}>
          ☆
        </span>
      );
    }
    const emptyStars = 5 - stars.length;
    for (let i = 0; i < emptyStars; i++) {
      stars.push(
        <span key={"empty" + i} style={{ color: "#ccc", fontSize: "1.1rem" }}>
          ★
        </span>
      );
    }
    return stars;
  };

  return (
    <div style={styles.pageWrapper}>
      <div style={styles.card}>
        <h2 style={styles.heading}>📦 Available Items for Borrowing</h2>

        {loadingItems ? (
          <p style={styles.message}>Loading items...</p>
        ) : errorMsg ? (
          <p style={{ ...styles.message, color: "#e53e3e" }}>{errorMsg}</p>
        ) : items.length === 0 ? (
          <p style={styles.message}>No items available for borrowing.</p>
        ) : (
          <div style={{ overflowX: "auto" }}>
            <table style={styles.table}>
              <thead style={styles.thead}>
                <tr>
                  <th style={styles.th}>ID</th>
                  <th style={styles.th}>Name</th>
                  <th style={styles.th}>Description</th>
                  <th style={styles.th}>Owner</th>
                  <th style={styles.th}>Location</th>
                  <th style={styles.th}>Price</th>
                  <th style={styles.th}>Rate Type</th>
                  <th style={styles.th}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {items.map((item) => (
                  <tr key={item.id} style={styles.tr}>
                    <td style={styles.td}>{item.id}</td>
                    <td style={styles.td}>{item.itemName}</td>
                    <td style={styles.td}>{item.description}</td>
                    <td style={styles.td}>{item.ownerEmail}</td>
                    <td style={styles.td}>{item.location}</td>
                    <td style={styles.td}>
                      {typeof item.price === "number" ? `$${item.price.toFixed(2)}` : "N/A"}
                    </td>
                    <td style={styles.td}>{item.rateType}</td>
                    <td style={styles.td}>
                      <button
                        style={styles.button}
                        onClick={() => fetchReviews(item.id)}
                      >
                        See Reviews
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Review Section */}
        {selectedItemId && (
          <div style={styles.reviewSection}>
            <h3 style={{ marginBottom: 12 }}>
              ⭐ Reviews for Item ID: {selectedItemId}
            </h3>

            {loadingReviews ? (
              <p style={styles.message}>Loading reviews...</p>
            ) : reviews.length === 0 ? (
              <p style={styles.message}>No reviews yet.</p>
            ) : (
              <ul style={styles.reviewList}>
                {reviews.map((rev) => (
                  <li key={rev.id} style={styles.reviewItem}>
                    <strong>{rev.reviewerEmail}</strong>: {rev.comments} —{" "}
                    <span>{renderStars(rev.rating)}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}
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
    padding: 40,
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
    color: "#32475b",
    fontWeight: 700,
    fontSize: "2rem",
    marginBottom: 24,
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
    minWidth: 800,
  },
  thead: {
    backgroundColor: "#f2f2f2",
  },
  th: {
    borderBottom: "2px solid #cbd5e0",
    textAlign: "left",
    padding: "12px 16px",
    color: "#4a5568",
    fontWeight: 600,
    fontSize: "1rem",
    whiteSpace: "nowrap",
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
  },
  button: {
    padding: "6px 14px",
    backgroundColor: "#48bb78",
    color: "#fff",
    border: "none",
    borderRadius: 8,
    cursor: "pointer",
    fontWeight: 600,
    fontSize: "0.9rem",
    transition: "background-color 0.2s",
  },
  reviewSection: {
    marginTop: 40,
    paddingTop: 20,
    borderTop: "2px solid #e2e8f0",
    maxHeight: 280,
    overflowY: "auto",
  },
  reviewList: {
    listStyleType: "none",
    padding: 0,
    margin: 0,
    maxHeight: 240,
    overflowY: "auto",
  },
  reviewItem: {
    marginBottom: 12,
    backgroundColor: "#f9fafb",
    padding: 12,
    borderRadius: 12,
    boxShadow: "inset 0 0 6px rgba(0,0,0,0.05)",
  },
};

export default ItemList;
