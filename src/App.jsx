import { useState } from "react";
import UseOpenAI from "./UseOpenAI";
import GeneralQuery from "./GeneralQuery";

function App() {
  const [searchResults, setSearchResults] = useState(null);
  const [userInput, setUserInput] = useState("");

  const handleSearch = async () => {
    try {
      // Get structured search parameters from OpenAI
      const params = await UseOpenAI({ userInput });

      // Perform the book search using the structured parameters
      const results = await GeneralQuery(params);

      // Update the state with the search results
      setSearchResults(results);
    } catch (error) {
      console.error("Error during search:", error);
    }
  };

  return (
    <div className="App">
      <h5>
        {" "}
        Not sure what to read next? <br /> Describe what you&apos;re looking
        for, and we&apos;ll find the perfect book for you!
      </h5>
      <input
        type="text"
        value={userInput}
        onChange={(e) => setUserInput(e.target.value)}
        placeholder="Enter your search query"
      />
      <button onClick={handleSearch}>Search</button>
      {searchResults && (
        <div>
          <h2>Search Results</h2>
          <pre>{JSON.stringify(searchResults, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}

export default App;
