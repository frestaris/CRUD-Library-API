import React from "react";

const BookInfo = ({ book, onClose }) => {
  return (
    <div className="book-detail">
      <button onClick={onClose}>Close</button>
      <h2>{book.title}</h2>
      <p>
        Author: {book.author_name ? book.author_name.join(", ") : "Unknown"}
      </p>
      <p>First Published: {book.first_publish_year}</p>
      {/* Add more details as needed */}
    </div>
  );
};

export default BookInfo;
