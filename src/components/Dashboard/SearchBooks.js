import React, { useState } from "react";

const SearchBooks = ({ onAddBook }) => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const resultsPerPage = 10;

  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `https://openlibrary.org/search.json?q=${query}`
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setResults(data.docs);
      setCurrentPage(1);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  const indexOfLastResult = currentPage * resultsPerPage;
  const indexOfFirstResult = indexOfLastResult - resultsPerPage;
  const currentResults = results.slice(indexOfFirstResult, indexOfLastResult);
  const totalPages = Math.ceil(results.length / resultsPerPage);

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => {
      const previousPage = Math.max(prevPage - 1, 1);
      if (previousPage !== prevPage) {
        window.scrollTo(0, 0);
      }
      return previousPage;
    });
  };

  const handleNextPage = () => {
    setCurrentPage((prevPage) => {
      const nextPage = Math.min(prevPage + 1, totalPages);
      if (nextPage !== prevPage) {
        window.scrollTo(0, 0);
      }
      return nextPage;
    });
  };

  return (
    <div className="navbar">
      <div className="search-bar">
        <form onSubmit={handleSearch}>
          <div className="input-container">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search for books..."
            />
            <button type="submit" className="search-button">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="currentColor"
                className="bi bi-search"
                viewBox="0 0 16 16"
              >
                <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0" />
              </svg>
            </button>
          </div>
        </form>
      </div>
      <div className="loading-container">
        {loading && <span className="loading"></span>}
        {error && <p className="error">Error: {error.message}</p>}
      </div>
      <ul className="book-list">
        {currentResults.map((book) => (
          <li className="book-item" key={book.key}>
            <img
              src={`https://covers.openlibrary.org/b/id/${book.cover_i}-L.jpg`}
              alt={book.title}
            />
            <div className="book-details">
              <h3>{book.title}</h3>
              <p>
                <span>Author:</span>{" "}
                {book.author_name ? book.author_name.join(", ") : "Unknown"}
              </p>
              <p>
                <span>First Published:</span> {book.first_publish_year}
              </p>
              <p>
                <span>Rating:</span> {Number(book.ratings_average).toFixed(1)}
              </p>
              <p>
                <span>Pages:</span> {book.number_of_pages_median}
              </p>
              <button
                onClick={() =>
                  onAddBook({
                    key: book.key,
                    cover: `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`,
                    title: book.title,
                    author: book.author_name
                      ? book.author_name.join(", ")
                      : "Unknown",
                    firstPublishYear: book.first_publish_year,
                  })
                }
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="30"
                  height="30"
                  fill="currentColor"
                  className="bi bi-plus-lg"
                  viewBox="0 0 16 16"
                >
                  <path
                    fillRule="evenodd"
                    d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2"
                  />
                </svg>
              </button>
            </div>
          </li>
        ))}
      </ul>

      {totalPages > 1 && (
        <div className="pagination">
          <button onClick={handlePrevPage} disabled={currentPage === 1}>
            {"<"}
          </button>
          <span>{`Page ${currentPage} of ${totalPages}`}</span>
          <button
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
          >
            {">"}
          </button>
        </div>
      )}
    </div>
  );
};

export default SearchBooks;
