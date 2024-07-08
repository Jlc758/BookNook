import { useState } from "react";

function GeneralSearch() {
  const [search, setSearch] = useState("");

  const url = "https://www.googleapis.com/books/v1/volumes?q=";
  const key = process.env.REACT_APP_GOOGLE_BOOKS_API_KEY;

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
          console.log(data);
        }
      })
      .catch((error) => {
        console.error("Error fetching results", error);
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
    </div>
  );
}

export default GeneralSearch;
