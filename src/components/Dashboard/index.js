import React, { useState, useEffect } from "react";
import MyList from "./MyList";
import SearchBooks from "./SearchBooks";
import BookInfo from "./BookInfo";

// Dashboard component manages user state and toggles between displaying the book list and search functionality
const Dashboard = ({ setIsAuthenticated, currentUser }) => {
  // Initialize user state from local storage or with default values
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem(`user_${currentUser.email}`)) || {
      books: [],
      reviews: {}, // Reviews are stored here
    }
  );

  // State to control whether "My List" or "Search Books" view is shown
  const [showMyList, setShowMyList] = useState(false);

  // State to manage the currently selected book for displaying details
  const [selectedBook, setSelectedBook] = useState(null);

  useEffect(() => {
    // Update local storage whenever user state changes
    localStorage.setItem(`user_${currentUser.email}`, JSON.stringify(user));
  }, [user, currentUser]);

  useEffect(() => {
    // Load user data from local storage when component mounts or currentUser changes
    const storedUser = JSON.parse(
      localStorage.getItem(`user_${currentUser.email}`)
    ) || {
      books: [],
      reviews: {},
    };
    setUser(storedUser);
  }, [currentUser]);

  // Handle logout by setting isAuthenticated to false
  const handleLogout = () => {
    setIsAuthenticated(false);
  };

  // Add a book to the user's book list
  const handleAddBook = (book) => {
    const isBookInList = user.books.some((b) => b.key === book.key);

    if (isBookInList) {
      alert("This book is already in your list.");
      return;
    }

    const updatedUser = { ...user, books: [...user.books, book] };
    setUser(updatedUser);
  };

  // Remove a book from the user's book list
  const handleRemoveBook = (key) => {
    const updatedUser = {
      ...user,
      books: user.books.filter((book) => book.key !== key),
    };
    setUser(updatedUser);
  };

  // EDIT REVIEW
  const handleEditReview = (bookKey, reviewIndex, updatedReview) => {
    const updatedReviews = { ...user.reviews };
    updatedReviews[bookKey][reviewIndex] = updatedReview;
    setUser((prevUser) => ({
      ...prevUser,
      reviews: updatedReviews,
    }));
  };

  // Remove a review for a specific book
  const handleRemoveReview = (bookKey, reviewIndex) => {
    const updatedReviews = { ...user.reviews };
    updatedReviews[bookKey] = user.reviews[bookKey].filter(
      (_, index) => index !== reviewIndex
    );
    setUser((prevUser) => ({
      ...prevUser,
      reviews: updatedReviews,
    }));
  };

  // Add a review for a specific book
  const handleAddReview = (bookKey, review) => {
    const updatedReviews = {
      ...user.reviews,
      [bookKey]: [...(user.reviews[bookKey] || []), review],
    };
    setUser((prevUser) => ({
      ...prevUser,
      reviews: updatedReviews,
    }));
  };

  return (
    <div className="App">
      {/* Logout button */}
      <button onClick={handleLogout}>Logout</button>
      {/* Toggle between "My List" and "Search Books" */}
      <button onClick={() => setShowMyList(!showMyList)}>
        {showMyList ? "Search Books" : "My List"}
      </button>
      {showMyList ? (
        // Show MyList component if showMyList is true
        <MyList
          books={user.books}
          onRemove={handleRemoveBook} // Pass the remove book function
          onRemoveReview={handleRemoveReview} // Pass the remove review function
          onAddReview={handleAddReview} // Pass the function to add reviews
          onEditReview={handleEditReview} // Pass the edit review function
          user={user} // Pass user data to MyList component
          setUser={setUser} // Pass setUser function to MyList component
          currentUser={currentUser} // Pass currentUser to MyList component
        />
      ) : (
        // Show SearchBooks component if showMyList is false
        <SearchBooks
          onAddBook={handleAddBook}
          selectedBook={selectedBook}
          setSelectedBook={setSelectedBook}
        />
      )}
      {/* Show BookInfo component if a book is selected */}
      {selectedBook && (
        <BookInfo
          book={selectedBook}
          onClose={() => setSelectedBook(null)}
          onAddReview={(review) => handleAddReview(selectedBook.key, review)} // Pass the function to add reviews
        />
      )}
    </div>
  );
};

export default Dashboard;
