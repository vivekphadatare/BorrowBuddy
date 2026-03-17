import React, { useState } from "react";
import axios from "axios";

function AddItem() {
  const [formData, setFormData] = useState({
    itemName: "",
    description: "",
    category: "",
    ownerEmail: localStorage.getItem("email") || "",
    location: "",
    price: "",
    rateType: "per hour" // default
  });

  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setMessage(""); // Clear previous messages on input change
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8080/api/items/add", formData);
      setIsError(false);
      setMessage("✅ Item added successfully!");
      setFormData({
        itemName: "",
        description: "",
        category: "",
        ownerEmail: localStorage.getItem("email") || "",
        location: "",
        price: "",
        rateType: "per hour"
      });
    } catch (error) {
      console.error(error);
      setIsError(true);
      setMessage("❌ Failed to add item.");
    }
  };

  return (
    <div style={styles.pageWrapper}>
      <div style={styles.card}>
        <h2 style={styles.heading}>Add Your Item to BorrowBuddy</h2>
        <form onSubmit={handleSubmit} style={styles.form}>
          {/* Item Name */}
          <label htmlFor="itemName" style={styles.label}>
            Item Name <span style={{ color: "#e63946" }}>*</span>
          </label>
          <input
            id="itemName"
            name="itemName"
            type="text"
            placeholder="Enter item name"
            value={formData.itemName}
            onChange={handleChange}
            required
            style={styles.input}
          />

          {/* Description */}
          <label htmlFor="description" style={styles.label}>
            Description <span style={{ color: "#e63946" }}>*</span>
          </label>
          <textarea
            id="description"
            name="description"
            placeholder="Brief description of the item"
            value={formData.description}
            onChange={handleChange}
            required
            rows={3}
            style={{ ...styles.input, resize: "vertical" }}
          />

          {/* Category */}
          <label htmlFor="category" style={styles.label}>
            Category <span style={{ color: "#e63946" }}>*</span>
          </label>
          <input
            id="category"
            name="category"
            type="text"
            placeholder="E.g., Tools, Electronics, Books"
            value={formData.category}
            onChange={handleChange}
            required
            style={styles.input}
          />

          {/* Location */}
          <label htmlFor="location" style={styles.label}>
            Detailed Location <span style={{ color: "#e63946" }}>*</span>
          </label>
          <input
            id="location"
            name="location"
            type="text"
            placeholder="Where is the item located?"
            value={formData.location}
            onChange={handleChange}
            required
            style={styles.input}
          />

          {/* Price */}
          <label htmlFor="price" style={styles.label}>
            Cost <span style={{ color: "#e63946" }}>*</span>
          </label>
          <input
            id="price"
            name="price"
            type="number"
            step="0.1"
            min="0"
            placeholder="Price (e.g., 50.0)"
            value={formData.price}
            onChange={handleChange}
            required
            style={styles.input}
          />

          {/* Rate Type */}
          <label htmlFor="rateType" style={styles.label}>
            Rate Type <span style={{ color: "#e63946" }}>*</span>
          </label>
          <select
            id="rateType"
            name="rateType"
            value={formData.rateType}
            onChange={handleChange}
            required
            style={styles.select}
          >
            <option value="per hour">Per Hour</option>
            <option value="per day">Per Day</option>
          </select>

          <button type="submit" style={styles.button}>
            Add Item
          </button>
        </form>

        {message && (
          <p style={{ color: isError ? "#e63946" : "#2a9d8f", marginTop: 20, fontWeight: "600" }}>
            {message}
          </p>
        )}
      </div>
    </div>
  );
}

// Styling object for inline styles
const styles = {
  pageWrapper: {
    minHeight: "100vh",
    padding: "20px",
    background: "linear-gradient(135deg, #d0e8f2 0%, #a6c1ee 100%)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontFamily: "'Inter', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
  },
  card: {
    background: "#fff",
    borderRadius: 20,
    boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
    padding: 32,
    maxWidth: 500,
    width: "100%",
  },
  heading: {
    marginBottom: 24,
    textAlign: "center",
    color: "#264653",
    fontWeight: 700,
    fontSize: "1.8rem",
  },
  form: {
    display: "flex",
    flexDirection: "column",
  },
  label: {
    marginBottom: 6,
    fontWeight: 600,
    color: "#264653",
  },
  input: {
    padding: "10px 14px",
    fontSize: "1rem",
    borderRadius: 8,
    border: "1.5px solid #b0bec5",
    marginBottom: 18,
    outline: "none",
    transition: "border-color 0.3s ease",
    fontFamily: "inherit",
  },
  select: {
    padding: "10px 14px",
    fontSize: "1rem",
    borderRadius: 8,
    border: "1.5px solid #b0bec5",
    marginBottom: 24,
    outline: "none",
    fontFamily: "inherit",
  },
  button: {
    background: "linear-gradient(90deg, #48bb78 0%, #2f855a 100%)",
    color: "#fff",
    fontWeight: "700",
    fontSize: "1.1rem",
    padding: "12px 0",
    border: "none",
    borderRadius: 12,
    cursor: "pointer",
    boxShadow: "0 4px 15px rgba(72, 187, 120, 0.4)",
    transition: "background 0.3s ease",
  },
};

export default AddItem;
