import { useEffect, useState } from "react";
import useOpenAI from "../hooks/useOpenAI";
import GeneralQuery from "../components/GeneralQuery";
import { Space, TextInput } from "@mantine/core";
import { ShelfDisplay } from "../components/ShelfDisplay";
import useSearch from "../hooks/useSearch";
import LoadingAnimation from "../components/LoadingAnimation";

const NatLangSearch = () => {
  const { searchText, setSearchText } = useSearch();
  const [userInput, setUserInput] = useState("");
  const [debouncedInput, setDebouncedInput] = useState("");
  const [books, setBooks] = useState([]);

  const { keywords, loading, error } = useOpenAI(debouncedInput);

  const googleAPIKey = import.meta.env.VITE_GOOGLE_BOOKS_API_KEY;

  useEffect(() => {
    // Update userInput with searchText only if searchText is not empty
    if (searchText) {
      setUserInput(searchText);
    }
  }, [searchText]);

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
      <Space h="md" />
      <div className="GeneralQuery">
        <TextInput
          size="md"
          radius="xl"
          label="What vibe are you looking for in your next read?"
          value={userInput}
          placeholder="enter search query"
          onChange={(e) => {
            setUserInput(e.target.value);
            setSearchText(e.target.value);
          }}
        />

        {loading && (
          <div>
            <LoadingAnimation />
          </div>
        )}
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
};

export default NatLangSearch;
