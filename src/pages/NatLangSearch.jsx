import { useEffect, useState } from "react";
import useOpenAI from "../hooks/useOpenAI";
import GeneralQuery from "../components/GeneralQuery";
import { Space, Textarea } from "@mantine/core";
import ResultsDisplay from "../components/ResultsDisplay";
import useSearch from "../hooks/useSearch";
import LoadingAnimation from "../components/LoadingAnimation";
import { RxMagicWand } from "react-icons/rx";
import Sparkle from "react-sparkle";

const NatLangSearch = () => {
  const { searchText, setSearchText } = useSearch();
  const [userInput, setUserInput] = useState("");
  const [debouncedInput, setDebouncedInput] = useState("");
  const [books, setBooks] = useState([]);

  const { keywords, loading, error } = useOpenAI(debouncedInput);

  const googleAPIKey = "AIzaSyCxYIJMd88bE8_DBPWaUSaL633NlHks8jc";

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

  const MagicWand = () => {
    return (
      <div
        style={{
          position: "relative",
          display: "in-line block",
          paddingLeft: "10px",
        }}
      >
        <RxMagicWand />
        <div
          style={{
            position: "relative",
            top: "-30px", // Adjust this value to move it up
            right: "-10px", // Adjust this value to move it right
            overflow: "visible",
          }}
        >
          <Sparkle
            count={3}
            overflowPx={8}
            flicker={false}
            fadeOutSpeed={20}
            color={"var(--mantine-color-rose-2)"}
          />
        </div>
      </div>
    );
  };

  const SentencesLabel = (
    <div className="SentenceLabel">
      <p className="Sentence">
        Your words, our magic
        <MagicWand />
      </p>
      <p className="Sentence"> Speak your mind to find your next read!</p>
    </div>
  );

  return (
    <div className="NatLangSearch">
      <Space h="md" />

      <div className="SentencesWrapper">
        {SentencesLabel}
        <Textarea
          className="NatLangTextArea"
          radius="xl"
          value={userInput}
          autosize="true"
          minRows={2}
          placeholder="enter search query"
          onChange={(e) => {
            setUserInput(e.target.value);
            setSearchText(e.target.value);
          }}
        />
      </div>

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
