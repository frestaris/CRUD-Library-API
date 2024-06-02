import React, { useState } from "react";

const AddReview = ({ onAddReview, onClose }) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Validate form fields
    if (!name || !description) {
      alert("Please fill in all fields.");
      return;
    }
    // Add the review
    onAddReview({ name, description });
    // Close the modal or navigate away
    onClose();
  };

  return (
    <div>
      <h2>Add Review</h2>
      <form onSubmit={handleSubmit}>
        <label>Name:</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <label>Description:</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>
        <button type="submit">Submit Review</button>
        <button onClick={onClose}>Cancel</button>
      </form>
    </div>
  );
};

export default AddReview;
