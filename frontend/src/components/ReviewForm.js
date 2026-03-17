import React, { useState } from "react";
import axios from "axios";

function ReviewForm({ itemId, requestId }) {
  const [comments, setComments] = useState("");
  const [rating, setRating] = useState(5);
  const reviewerEmail = localStorage.getItem("email");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async () => {
    if (!comments || !rating) {
      alert("Please provide a rating and comment.");
      return;
    }

    try {
      await axios.post("http://localhost:8080/api/reviews/submit", {
        itemId,
        reviewerEmail,
        comments,
        rating,
        requestId
      });
      setSubmitted(true);
    } catch (err) {
      console.error("❌ Error submitting review", err);
      alert("Failed to submit review.");
    }
  };

  if (submitted) return <p style={{ color: "green" }}>✅ Review submitted!</p>;

  return (
    <div style={{ marginTop: "10px" }}>
      <textarea
        placeholder="Write your review"
        value={comments}
        onChange={(e) => setComments(e.target.value)}
        rows={2}
        style={{ width: "100%", padding: "5px" }}
      />
      <div style={{ marginTop: "5px" }}>
        <label>Rating: </label>
        <select value={rating} onChange={(e) => setRating(e.target.value)}>
          {[5, 4, 3, 2, 1].map((star) => (
            <option key={star} value={star}>{star} ⭐</option>
          ))}
        </select>
      </div>
      <button onClick={handleSubmit} style={{ marginTop: "5px", padding: "5px 10px", background: "green", color: "white", border: "none" }}>
        Submit Review
      </button>
    </div>
  );
}

export default ReviewForm;
