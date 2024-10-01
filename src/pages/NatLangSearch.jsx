import { useEffect, useState } from "react";
import useOpenAI from "../hooks/useOpenAI";
import GeneralQuery from "../components/GeneralQuery";
import { Space, Textarea } from "@mantine/core";
import ResultsDisplay from "../components/ResultsDisplay";
import LoadingAnimation from "../components/LoadingAnimation";
import { RxMagicWand } from "react-icons/rx";
import Sparkle from "react-sparkle";

const NatLangSearch = ({ googleAPIKey, apiKey }) => {
  const [userInput, setUserInput] = useState("");
  const [debouncedInput, setDebouncedInput] = useState("");
  const [books, setBooks] = useState([]);

  const { keywords, loading, error } = useOpenAI(debouncedInput, apiKey);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedInput(userInput);
    }, 1000);

    return () => {
      clearTimeout(handler);
    };
  }, [userInput]);

  console.log("NatLangSearch - googleAPIKey:", googleAPIKey); // Debug log

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
            top: "-30px",
            right: "-10px",
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
      <div className="Sentence">
        Your words, our magic
        <span>
          <MagicWand />
        </span>
      </div>
      <div className="Sentence"> Speak your mind to find your next read!</div>
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
          onChange={(e) => setUserInput(e.target.value)}
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
            googleAPIKey={googleAPIKey}
            setBooks={setBooks}
          />
        )}
        {books.length > 0 && <ResultsDisplay books={books} />}
      </div>
    </div>
  );
};

export default NatLangSearch;
