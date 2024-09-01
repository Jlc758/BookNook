// Shelves.jsx
import { useState, useEffect } from "react";
import BookTabs from "../components/BookTabs";
import placeholder from "../images/BookCover.jpg";

const Shelves = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    // Fetch books data here
    // This is just an example, replace with your actual data fetching logic
    const fetchBooks = async () => {
      // const response = await fetch('your-api-endpoint');
      // const data = await response.json();
      // setBooks(data);

      // For now, let's use some dummy data
      setBooks([
        {
          id: 1,
          volumeInfo: {
            title: "Book 1",
            imageLinks: { thumbnail: placeholder },
          },
        },
        {
          id: 2,
          volumeInfo: {
            title: "Book 2",
            imageLinks: { thumbnail: placeholder },
          },
        },
        // ... more books
      ]);
    };

    fetchBooks();
  }, []);

  return (
    <>
      <div className="MainContent">
        <BookTabs books={books} />
      </div>
    </>
  );
};

export default Shelves;
