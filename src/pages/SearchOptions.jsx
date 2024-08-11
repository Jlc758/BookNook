import { useEffect, useState } from "react";
import useOpenAI from "../hooks/useOpenAI";
import GeneralQuery from "../components/GeneralQuery";
import BookCard from "../components/BookCard";
import { v4 as uuidv4 } from "uuid";
import { TextInput } from "@mantine/core";

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
        <TextInput
          size="md"
          radius="xl"
          label="What vibe are you looking for in your next read?"
          placeholder="enter search query"
          onChange={(e) => setUserInput(e.target.value)}
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
