import React, { useState, useEffect } from "react";

const EditReview = ({ initialValues, onSave, onClose, reviewIndex }) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    if (initialValues) {
      setName(initialValues.name);
      setDescription(initialValues.description);
    }
  }, [initialValues]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !description) {
      alert("Please fill in all fields.");
      return;
    }
    onSave({ ...initialValues, name, description });
    onClose();
  };

  return (
    <div>
      <h2>Edit Review</h2>
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
        <button type="submit">Update Review</button>
        <button onClick={onClose}>Cancel</button>
      </form>
    </div>
  );
};

export default EditReview;
