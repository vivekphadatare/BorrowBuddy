import React, { useEffect, useState } from "react";
import axios from "axios";
import ReturnReviewForm from "./ReturnReviewForm";// ✅ Ensure this path is correct

function OwnerRequestList() {
  const [requests, setRequests] = useState([]);
  const [reviews, setReviews] = useState({});
  const [returningRequest, setReturningRequest] = useState(null);
  const ownerEmail = localStorage.getItem("email");

  const fetchRequests = async () => {
    try {
      const res = await axios.get(`http://localhost:8080/api/requests/owner/${ownerEmail}`);
      const data = res.data;

      setRequests(data);

      const pendingCount = data.filter((r) => r.status === "Pending").length;
      localStorage.setItem("pendingCount", pendingCount.toString());

      // Fetch reviews only for returned items
      data.forEach((req) => {
        if (req.status === "Returned") {
          fetchReviewForItem(req.itemId);
        }
      });
    } catch (err) {
      console.error("❌ Failed to fetch owner requests", err);
    }
  };

  const fetchReviewForItem = async (itemId) => {
    try {
      const res = await axios.get(`http://localhost:8080/api/reviews/item/${itemId}`);
      if (res.data && res.data.length > 0) {
        setReviews((prev) => ({ ...prev, [itemId]: res.data[0] }));
      }
    } catch (err) {
      console.error(`❌ Failed to fetch review for item ${itemId}`, err);
    }
  };

  const handleStatusUpdate = async (id, newStatus) => {
    const confirm = window.confirm(`Are you sure you want to mark as ${newStatus}?`);
    if (!confirm) return;

    try {
      await axios.put(
        `http://localhost:8080/api/requests/${id}/status`,
        JSON.stringify(newStatus),
        { headers: { "Content-Type": "application/json" } }
      );

      const updated = requests.map((req) =>
        req.id === id ? { ...req, status: newStatus } : req
      );
      setRequests(updated);

      const newPending = updated.filter((r) => r.status === "Pending").length;
      localStorage.setItem("pendingCount", newPending.toString());

      if (newStatus === "Returned") {
        const returnedReq = updated.find((r) => r.id === id);
        if (returnedReq) fetchReviewForItem(returnedReq.itemId);
      }
    } catch (err) {
      console.error("❌ Failed to update status", err);
    }
  };

  useEffect(() => {
    if (ownerEmail) fetchRequests();
    const interval = setInterval(fetchRequests, 60000);
    return () => clearInterval(interval);
  }, [ownerEmail]);

  return (
    <div style={{ padding: "20px", maxWidth: "1000px", margin: "auto" }}>
      <h2>📋 Borrow Requests for Your Items</h2>

      {requests.length === 0 ? (
        <p>No requests found.</p>
      ) : (
        <table border="1" cellPadding="10" cellSpacing="0" width="100%">
          <thead style={{ backgroundColor: "#f2f2f2" }}>
            <tr>
              <th>Request ID</th>
              <th>Item ID</th>
              <th>Borrower Email</th>
              <th>Status</th>
              <th>Action / Review</th>
            </tr>
          </thead>
          <tbody>
            {requests.map((req) => (
              <tr key={req.id}>
                <td>{req.id}</td>
                <td>{req.itemId}</td>
                <td>{req.borrowerEmail}</td>
                <td>{req.status}</td>
                <td>
                  {req.status === "Pending" ? (
                    <>
                      <button
                        onClick={() => handleStatusUpdate(req.id, "Accepted")}
                        style={{ marginRight: "5px", backgroundColor: "green", color: "white" }}
                      >
                        Accept
                      </button>
                      <button
                        onClick={() => handleStatusUpdate(req.id, "Rejected")}
                        style={{ backgroundColor: "red", color: "white" }}
                      >
                        Reject
                      </button>
                    </>
                  ) : req.status === "Accepted" ? (
                    <button
                      onClick={() => setReturningRequest(req)}
                      style={{ backgroundColor: "#007bff", color: "white" }}
                    >
                      Return & Review
                    </button>
                  ) : req.status === "Returned" && reviews[req.itemId] ? (
                    <div style={{ textAlign: "left" }}>
                      <strong>⭐ Rating:</strong> {reviews[req.itemId].rating}/5
                      <br />
                      <strong>💬 Comment:</strong> {reviews[req.itemId].comments}
                    </div>
                  ) : (
                    <i>—</i>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* 🔁 Popup Form to Submit Review and Return */}
      {returningRequest && (
        <ReturnReviewForm
          request={returningRequest}
          onClose={() => setReturningRequest(null)}
          onSubmitted={() => {
            fetchRequests();
            setReturningRequest(null);
          }}
        />
      )}
    </div>
  );
}

export default OwnerRequestList;
