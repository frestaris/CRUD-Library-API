import React, { useState } from "react";
import AddReview from "./AddReview";
import EditReview from "./EditReview";
import "./MyList.css";

const MyList = ({
  books,
  onRemove,
  onAddReview,
  onRemoveReview,
  onEditReview,
  user,
}) => {
  const [showAddReview, setShowAddReview] = useState(null);
  const [showEditReview, setShowEditReview] = useState(null);
  const [editReviewData, setEditReviewData] = useState(null);
  const [reviewIndex, setReviewIndex] = useState(null); // Add reviewIndex state

  const handleToggleAddReview = (key) => {
    setShowAddReview(key);
  };

  const handleEditClick = (bookKey, index) => {
    const reviewToEdit = user.reviews[bookKey][index];
    setEditReviewData(reviewToEdit);
    setShowEditReview(bookKey);
    setReviewIndex(index); // Set reviewIndex when editing
  };

  return (
    <div>
      <h2>My Book List</h2>
      {books.length === 0 ? (
        <p>No books added to your list.</p>
      ) : (
        <ul className="book-list">
          {books.map((book) => (
            <li className="book-item" key={book.key}>
              <img src={book.cover} alt={book.title} />
              <div className="book-details">
                <h3>{book.title}</h3>
                <p>Author: {book.author}</p>
                <p>First Published: {book.firstPublishYear}</p>
                <button onClick={() => onRemove(book.key)}>Remove</button>
                <p>REVIEWS</p>
                {user.reviews[book.key] && (
                  <ul>
                    {user.reviews[book.key].map((review, index) => (
                      <li key={index}>
                        {`${review.name} - ${review.description}`}
                        <button
                          onClick={() => handleEditClick(book.key, index)}
                        >
                          Edit
                        </button>{" "}
                        <button onClick={() => onRemoveReview(book.key, index)}>
                          Delete
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
                <div className="review">
                  {showAddReview === book.key ? (
                    <AddReview
                      onAddReview={(review) => {
                        onAddReview(book.key, review);
                        setShowAddReview(null);
                      }}
                      onClose={() => setShowAddReview(null)}
                    />
                  ) : (
                    <button onClick={() => handleToggleAddReview(book.key)}>
                      Add Review
                    </button>
                  )}
                  {showEditReview === book.key && (
                    <EditReview
                      initialValues={editReviewData}
                      onSave={(updatedReview) => {
                        onEditReview(book.key, reviewIndex, updatedReview); // Pass reviewIndex here
                        setShowEditReview(null);
                        setEditReviewData(null);
                      }}
                      onClose={() => {
                        setShowEditReview(null);
                        setEditReviewData(null);
                      }}
                    />
                  )}
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MyList;
