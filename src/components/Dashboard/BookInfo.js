import React from "react";

const BookInfo = ({ book, onClose }) => {
  return (
    <div className="book-detail">
      <button onClick={onClose}>Close</button>
      <h2 className="book-title">{book.title}</h2>
      <p className="book-author">
        Author: {book.author_name ? book.author_name.join(", ") : "Unknown"}
      </p>
      <p className="book-published">
        First Published: {book.first_publish_year}
      </p>
      {/* Add more details as needed */}
    </div>
  );
};

export default BookInfo;
