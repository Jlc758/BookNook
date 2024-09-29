import { useEffect, useState } from "react";
import useOpenAI from "../hooks/useOpenAI";
import GeneralQuery from "../components/GeneralQuery";
import { Space, Textarea } from "@mantine/core";
import ResultsDisplay from "../components/ResultsDisplay";
import useSearch from "../hooks/useSearch";
import LoadingAnimation from "../components/LoadingAnimation";
import { RxMagicWand } from "react-icons/rx";

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

  const SentencesLabel = (
    <div className="SentenceLabel">
      <span>Your words, our magic </span>
      <RxMagicWand style={{ height: "20px" }} />
      <span> Speak your mind to find your next read!</span>
    </div>
  );

  return (
    <div className="NatLangSearch">
      <Space h="md" />
      <Textarea
        size="md"
        radius="xl"
        label={SentencesLabel}
        value={userInput}
        placeholder="enter search query"
        onChange={(e) => {
          setUserInput(e.target.value);
          setSearchText(e.target.value);
        }}
      />

      <div className="searchContent">
        {loading && (
          <div>
            <LoadingAnimation />
          </div>
        )}
        {error && <div>Error: {error}</div>}
        {keywords && (
          <GeneralQuery
            keywords={keywords}
            apiKey={googleAPIKey}
            setBooks={setBooks}
          />
        )}
        {books.length > 0 && <ResultsDisplay books={books} />}
      </div>
    </div>
  );
};

export default NatLangSearch;
