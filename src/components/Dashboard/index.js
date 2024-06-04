import React, { useState, useEffect } from "react";
import MyList from "./MyList";
import SearchBooks from "./SearchBooks";
import "./index.css";

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
    window.alert("Book added!");

    const updatedUser = { ...user, books: [...user.books, book] };
    setUser(updatedUser);
  };

  // Remove a book from the user's book list
  const handleRemoveBook = (key) => {
    const updatedUser = {
      ...user,
      books: user.books.filter((book) => book.key !== key),
    };
    window.alert("Book removed!");
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
      <div className="dashboard">
        <button onClick={handleLogout}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="30"
            height="30"
            fill="currentColor"
            className="bi bi-box-arrow-right"
            viewBox="0 0 16 16"
          >
            <path
              fillRule="evenodd"
              d="M10 12.5a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v2a.5.5 0 0 0 1 0v-2A1.5 1.5 0 0 0 9.5 2h-8A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-2a.5.5 0 0 0-1 0z"
            />
            <path
              fillRule="evenodd"
              d="M15.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L14.293 7.5H5.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708z"
            />
          </svg>
        </button>
        {/* Toggle between "My List" and "Search Books" */}
        <button
          className="dashboard-button"
          onClick={() => setShowMyList(!showMyList)}
        >
          {showMyList ? (
            <span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="currentColor"
                className="bi bi-search"
                viewBox="0 0 16 16"
              >
                <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0" />
              </svg>{" "}
              Search
            </span>
          ) : (
            <span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="currentColor"
                className="bi bi-book"
                viewBox="0 0 16 16"
              >
                <path d="M1 2.828c.885-.37 2.154-.769 3.388-.893 1.33-.134 2.458.063 3.112.752v9.746c-.935-.53-2.12-.603-3.213-.493-1.18.12-2.37.461-3.287.811zm7.5-.141c.654-.689 1.782-.886 3.112-.752 1.234.124 2.503.523 3.388.893v9.923c-.918-.35-2.107-.692-3.287-.81-1.094-.111-2.278-.039-3.213.492zM8 1.783C7.015.936 5.587.81 4.287.94c-1.514.153-3.042.672-3.994 1.105A.5.5 0 0 0 0 2.5v11a.5.5 0 0 0 .707.455c.882-.4 2.303-.881 3.68-1.02 1.409-.142 2.59.087 3.223.877a.5.5 0 0 0 .78 0c.633-.79 1.814-1.019 3.222-.877 1.378.139 2.8.62 3.681 1.02A.5.5 0 0 0 16 13.5v-11a.5.5 0 0 0-.293-.455c-.952-.433-2.48-.952-3.994-1.105C10.413.809 8.985.936 8 1.783" />
              </svg>{" "}
              My List
            </span>
          )}
        </button>
      </div>
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
    </div>
  );
};

export default Dashboard;
