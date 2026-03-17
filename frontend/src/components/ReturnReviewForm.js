import React, { useState } from "react";
import axios from "axios";

const ReturnReviewForm = ({ request, onClose, onSubmitted }) => {
  const [comments, setComments] = useState("");
  const [rating, setRating] = useState(5);
  const reviewerEmail = localStorage.getItem("email");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!comments) {
      alert("Please write a review comment.");
      return;
    }

    try {
      setLoading(true);

      // Update request status
      await axios.put(
        `http://localhost:8080/api/requests/${request.id}/status`,
        JSON.stringify("Returned"),
        { headers: { "Content-Type": "application/json" } }
      );

      // Submit review
      await axios.post("http://localhost:8080/api/reviews/submit", {
        itemId: request.itemId,
        reviewerEmail,
        comments,
        rating,
        requestId: request.id,
      });

      alert("Item Returned & Review Submitted!");
      onSubmitted();
    } catch (error) {
      console.error("Error:", error);
      alert("Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={overlayStyle}>
      <div style={popupStyle}>
        <h3>Return Item & Submit Review</h3>

        <p><b>Item ID:</b> {request.itemId}</p>
        <p><b>Borrower:</b> {request.borrowerEmail}</p>

        <textarea
          placeholder="Write review..."
          value={comments}
          onChange={(e) => setComments(e.target.value)}
          style={{ width: "100%", marginBottom: "10px" }}
        />

        <select
          value={rating}
          onChange={(e) => setRating(e.target.value)}
          style={{ marginBottom: "10px" }}
        >
          {[5, 4, 3, 2, 1].map((r) => (
            <option key={r} value={r}>
              {r} ⭐
            </option>
          ))}
        </select>

        <br />

        <button onClick={handleSubmit} disabled={loading}>
          {loading ? "Submitting..." : "Submit"}
        </button>

        <button onClick={onClose} style={{ marginLeft: "10px" }}>
          Cancel
        </button>
      </div>
    </div>
  );
};

const overlayStyle = {
  position: "fixed",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  backgroundColor: "rgba(0,0,0,0.5)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};

const popupStyle = {
  backgroundColor: "white",
  padding: "20px",
  borderRadius: "8px",
  width: "350px",
};

export default ReturnReviewForm;
