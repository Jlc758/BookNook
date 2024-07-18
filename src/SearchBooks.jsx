import { useState } from "react";
import useOpenAI from "./useOpenAI";
import OpenAI from "openai";

const SearchBooks = () => {
  const [query, setQuery] = useState("");
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const apiKey = import.meta.env.VITE_OPENAI_API_KEY;

  const openai = new OpenAI({
    apiKey: apiKey,
    dangerouslyAllowBrowser: true,
  });

  async function enhanceQueryWithOpenAI() {
    try {
      const response = await openai.chat.completions.create({
        model: "gpt-4-turbo",
        response_format: { type: "json_object" },

        messages: [
          {
            role: "system",
            content:
              "You will be provided with a block of text, and your task is to extract a list of keywords from it and create a response in json format.",
          },
          {
            role: "user",
            content:
              "I'm looking for a fantasy book that is less than 300 pages and is plot-driven with dragons.",
          },
        ],
        temperature: 0.5,
        max_tokens: 64,
        top_p: 1,
      });
      console.log(response);
    } catch (error) {
      console.error("Error:", error.response.data);
    }
  }

  const handleSearch = async () => {
    setLoading(true);
    setError(null);
    const apiKey = import.meta.env.VITE_GOOGLE_BOOKS_API_KEY;
    try {
      const enhancedQuery = await enhanceQueryWithOpenAI(query);
      const response = await fetch(
        `https://www.googleapis.com/books/v1/volumes?q=${enhancedQuery}&key=${apiKey}`
      );
      const data = await response.json();
      setBooks(data.items || []);
      console.log("Google Books Response: ", data);
    } catch (error) {
      setError("Error fetching books");
      console.error("Error fetching books:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <textarea
        type="text"
        id="naturalLanguageSearch"
        rows="3"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Genre, author, length, "
      />
      <button onClick={handleSearch} disabled={loading}>
        {loading ? "Searching..." : "Search"}
      </button>
      <div>
        {books.map((book) => (
          <div key={book.id}>
            <h3>{book.volumeInfo.title}</h3>
            <p>{book.volumeInfo.authors?.join(", ")}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchBooks;

// ********************

//
