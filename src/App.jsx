import { useEffect, useState } from "react";
import useOpenAI from "./useOpenAI";
import GeneralQuery from "./GeneralQuery";
import BookCard from "./BookCard";
import BasicMenu from "./Menu";

function App() {
  const [userInput, setUserInput] = useState("");
  const [debouncedInput, setDebouncedInput] = useState("");
  const [books, setBooks] = useState([]);
  const { keywords, loading, error } = useOpenAI(debouncedInput);

  const googleAPIKey = import.meta.env.VITE_GOOGLE_BOOKS_API_KEY;

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedInput(userInput);
    }, 500);

    return () => {
      clearTimeout(handler);
    };
  }, [userInput]);

  return (
    <>
      <BasicMenu />
      <div className="App">
        <h5>
          Not sure what to read next? <br /> Describe what you&apos;re looking
          for, and we&apos;ll find the perfect book for you!
        </h5>
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
                  key={book.id}
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

export default App;
