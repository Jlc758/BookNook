import { useEffect, useState } from "react";
import useOpenAI from "../hooks/useOpenAI";
import GeneralQuery from "../components/GeneralQuery";
import { TextInput } from "@mantine/core";
import { ShelfDisplay } from "../components/ShelfDisplay";

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

            {books.length > 0 && <ShelfDisplay books={books} />}
          </div>
        )}
      </div>
    </>
  );
}

export default SearchOptions;
