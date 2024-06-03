import React, { useState } from "react";
import AddReview from "./AddReview";
import EditReview from "./EditReview";

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
      <h2 className="my-title">My Book List</h2>
      {books.length === 0 ? (
        <p>No books added to your list.</p>
      ) : (
        <ul className="book-list">
          {books.map((book) => (
            <li className="book-item" key={book.key}>
              <img src={book.cover} alt={book.title} />
              <div className="my-book-detail">
                <h3>{book.title}</h3>
                <p>
                  <span>Author:</span> {book.author}
                </p>
                <p>
                  <span>First Published:</span> {book.firstPublishYear}
                </p>
                <button className="remove" onClick={() => onRemove(book.key)}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="30"
                    height="30"
                    fill="currentColor"
                    className="bi bi-x-lg"
                    viewBox="0 0 16 16"
                  >
                    <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z" />
                  </svg>
                </button>
                <p>My Reviews</p>
                {user.reviews[book.key] && (
                  <ul className="review-list">
                    {user.reviews[book.key].map((review, index) => (
                      <li key={index}>
                        {`${review.description}`}
                        <button
                          className="edit"
                          onClick={() => handleEditClick(book.key, index)}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            fill="currentColor"
                            className="bi bi-pencil"
                            viewBox="0 0 16 16"
                          >
                            <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325" />
                          </svg>
                        </button>{" "}
                        <button
                          className="delete"
                          onClick={() => onRemoveReview(book.key, index)}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            fill="currentColor"
                            className="bi bi-trash3"
                            viewBox="0 0 16 16"
                          >
                            <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5M11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47M8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5" />
                          </svg>
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
                    <button
                      className="add-review"
                      onClick={() => handleToggleAddReview(book.key)}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="30"
                        height="30"
                        fill="currentColor"
                        className="bi bi-journal-plus"
                        viewBox="0 0 16 16"
                      >
                        <path
                          fillRule="evenodd"
                          d="M8 5.5a.5.5 0 0 1 .5.5v1.5H10a.5.5 0 0 1 0 1H8.5V10a.5.5 0 0 1-1 0V8.5H6a.5.5 0 0 1 0-1h1.5V6a.5.5 0 0 1 .5-.5"
                        />
                        <path d="M3 0h10a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2v-1h1v1a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H3a1 1 0 0 0-1 1v1H1V2a2 2 0 0 1 2-2" />
                        <path d="M1 5v-.5a.5.5 0 0 1 1 0V5h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1zm0 3v-.5a.5.5 0 0 1 1 0V8h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1zm0 3v-.5a.5.5 0 0 1 1 0v.5h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1z" />
                      </svg>
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
