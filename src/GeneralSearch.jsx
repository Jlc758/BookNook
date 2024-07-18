import { useState } from "react";

function GeneralSearch() {
  const [search, setSearch] = useState("");
  const [results, setResults] = useState([]);

  const url = "https://www.googleapis.com/books/v1/volumes?q=";
  const key = import.meta.env.VITE_GOOGLE_BOOKS_API_KEY;

  const fetchResults = () => {
    fetch(url + search + "&key=" + key)
      .then((response) => response.json())
      .then((data) => {
        if (data.items) {
          const bookResults = data.items.map((item) => ({
            title: item.volumeInfo.title,
            authors: item.volumeInfo.authors,
            rating: item.volumeInfo.averageRating,
          }));
          setResults(bookResults); //This updates the state with the new results
          console.log(data);
        } else {
          setResults([]);
        } //This clears results if no items found
      })
      .catch((error) => {
        console.error("Error fetching results", error);
        setResults([]); //This clears the results if there's an error
      });
  };

  const handleClick = () => {
    fetchResults();
    console.log("Searching");
  };

  return (
    <div>
      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search for books"
      />
      <button onClick={handleClick}>Search</button>
      <div>
        {results.map((book, index) => (
          <div key={index}>
            <h2>{book.title}</h2>
            <p>{book.authors && book.authors.join(", ")}</p>
            <p>Rating: {book.rating}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default GeneralSearch;
