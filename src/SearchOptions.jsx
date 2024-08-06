import { useEffect, useState } from "react";
import useOpenAI from "./useOpenAI";
import GeneralQuery from "./GeneralQuery";
import BookCard from "./BookCard";
import { v4 as uuidv4 } from "uuid";

function SearchOptions() {
  const [userInput, setUserInput] = useState("");
  const [debouncedInput, setDebouncedInput] = useState("");
  const [books, setBooks] = useState([]);

  const { keywords, loading, error } = useOpenAI(debouncedInput);

  const googleAPIKey = import.meta.env.VITE_GOOGLE_BOOKS_API_KEY;

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedInput(userInput);
    }, 1000);

    return () => {
      clearTimeout(handler);
    };
  }, [userInput]);

  useEffect(() => {
    console.log("Books state updated: ", books);
  }, [books]);

  return (
    <>
      <div className="GeneralQuery">
        <h5>What vibe are you looking for in your next read?</h5>
        <input
          type="textarea"
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          placeholder="Enter your search query"
        />

        {loading && <div>Loading...</div>}
        {error && <div>Error: {error}</div>}
        {keywords && (
          <div>
            <GeneralQuery
              keywords={keywords}
              apiKey={googleAPIKey}
              setBooks={setBooks} // Ensure setBooks is passed as a prop
            />
            <div className="bookCards">
              {books.map((book) => (
                <BookCard
                  key={uuidv4()}
                  title={book.volumeInfo.title}
                  authors={book.volumeInfo.authors?.join(", ")}
                  pageCount={book.volumeInfo.pageCount}
                  categories={book.volumeInfo.categories?.join(", ")}
                  cover={book.volumeInfo.imageLinks?.thumbnail}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default SearchOptions;
