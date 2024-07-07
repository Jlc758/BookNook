import { useCallback, useEffect, useState } from "react";
// import Card from "./Card";

function AllBooks() {
  const [search, setSearch] = useState("");
  const [bookData, setData] = useState([]);
  const url = "https://www.googleapis.com/books/v1/volumes?q=";
  const key = "AIzaSyDCgsTYsvF-4GZXcxKv-CL9w8IOEtgqxJg";

  const bookSearch = useCallback(() => {
    const searchUrl = url + search + "&key=" + key;
    // implement search logic here
    fetch(searchUrl, {
      method: "GET",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not okay");
        }
        return response.json();
      })
      .then((data) => {
        const bookResults = data.items.map((item) => ({
          title: item.volumeInfo.title,
          authors: item.volumeInfo.authors,
          rating: item.volumeInfo.averageRating,
        }));
        setData(bookResults);
        console.log(data);
      })
      .catch((error) => {
        console.error("Issue with fetch operation: ", error);
      });
  }, [url, search, key]);

  useEffect(() => {
    const handleKeyPress = (event) => {
      if (event.key === "Enter") {
        bookSearch();
      }
    };
    document.addEventListener("keypress", handleKeyPress);

    return () => {
      document.removeEventListener("keypress", handleKeyPress);
    };
  }, [bookSearch]);

  return (
    <>
      <h3>This is where the books will be listed</h3>
      <h4>Search:</h4>
      <div className="search">
        <input
          type="text"
          placeholder="Enter Book Name"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button onClick={bookSearch}>go</button>
      </div>
      <h4>Results:</h4>
      <ul>
        {bookData.map((book, index) => (
          <li key={index}>
            Title: {book.title}
            <br />
            Authors: {book.authors.join(", ")} <br />
            Rating: {book.rating}
            <br />
          </li>
        ))}
      </ul>
    </>
  );
}

export default AllBooks;
