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
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search for books..."
          />
          <button type="submit" className="search-button">
            Search
          </button>
        </form>
      </div>

      {loading && <p className="loading">Loading...</p>}
      {error && <p className="error">Error: {error.message}</p>}
      <ul className="book-list">
        {currentResults.map((book) => (
          <li className="book-item" key={book.key}>
            <img
              src={`https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`}
              alt={book.title}
            />
            <div className="book-details">
              <h3>{book.title}</h3>
              <p>
                Author:{" "}
                {book.author_name ? book.author_name.join(", ") : "Unknown"}
              </p>
              <p>First Published: {book.first_publish_year}</p>
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
                Add
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
