import { useState, useEffect } from "react";

function GeneralSearch() {
  const [search, setSearch] = useState("");
  const [results, setResults] = useState([]);

  const url = "https://www.googleapis.com/books/v1/volumes?q=";
  const key = "AIzaSyDCgsTYsvF-4GZXcxKv-CL9w8IOEtgqxJg";

  const fetchResults = () => {
    fetch(url + search + key);
    console
      .log(url + search + key)

      .then((response) => response.json())
      .then((data) => {
        if (data.items) {
          setResults(data.items);
        } else setResults([]);
      })
      .catch((error) => {
        console.error("Error fetching results", error);
        setResults([]);
      });
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      fetchResults();
    }
  };
}

export default GeneralSearch;
