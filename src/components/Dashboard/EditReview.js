import React, { useState, useEffect } from "react";

const EditReview = ({ initialValues, onSave, onClose }) => {
  const [description, setDescription] = useState("");

  useEffect(() => {
    if (initialValues) {
      setDescription(initialValues.description);
    }
  }, [initialValues]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!description) {
      alert("Please fill in all fields.");
      return;
    }
    onSave({ ...initialValues, description });
    onClose();
  };

  return (
    <div className="edit-review">
      <form onSubmit={handleSubmit}>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>
        <div className="button-container">
          <button className="edit-submit" type="submit">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="currentColor"
              className="bi bi-check-lg"
              viewBox="0 0 16 16"
            >
              <path d="M12.736 3.97a.733.733 0 0 1 1.047 0c.286.289.29.756.01 1.05L7.88 12.01a.733.733 0 0 1-1.065.02L3.217 8.384a.757.757 0 0 1 0-1.06.733.733 0 0 1 1.047 0l3.052 3.093 5.4-6.425z" />
            </svg>
          </button>
          <button className="edit-cancel" onClick={onClose}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="currentColor"
              className="bi bi-x-lg"
              viewBox="0 0 16 16"
            >
              <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z" />
            </svg>
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditReview;
