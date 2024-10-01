import { useEffect } from "react";
import propTypes from "prop-types";

const GeneralQuery = ({ googleAPIKey, keywords, setBooks }) => {
  const baseUrl = "https://www.googleapis.com/books/v1/volumes?q=";

  useEffect(() => {
    if (!keywords || !googleAPIKey) return;

    const fetchBooks = async (query) => {
      try {
        const response = await fetch(query);
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        return data.items || [];
      } catch (error) {
        console.error("Error fetching books: ", error);
        return [];
      }
    };

    const handleSearch = async () => {
      try {
        const { title, mainCategory, keywords: additionalKeywords } = keywords;

        let queryParts = [];

        if (title) queryParts.push(`intitle:"${encodeURIComponent(title)}"`);
        if (mainCategory)
          queryParts.push(`subject:"${encodeURIComponent(mainCategory)}"`);

        // Process additional keywords
        if (additionalKeywords && additionalKeywords.length > 0) {
          const uniqueKeywords = additionalKeywords.filter(
            (keyword) =>
              keyword.toLowerCase() !== mainCategory?.toLowerCase() &&
              !keyword
                .toLowerCase()
                .split(" ")
                .every((word) => mainCategory?.toLowerCase().includes(word))
          );
          queryParts.push(
            ...uniqueKeywords.map(
              (keyword) => `+${encodeURIComponent(keyword)}`
            )
          );
        }

        // Ensure queryParts is not empty
        if (queryParts.length === 0) {
          console.error("No valid query parts found.");
          setBooks([]);
          return;
        }

        let query = `${baseUrl}${queryParts.join(
          ""
        )}&orderBy=relevance&maxResults=40&key=${googleAPIKey}`;

        console.log("Google Books Query: ", query);

        const books = await fetchBooks(query);

        console.log("API Response: ", books);

        if (!books || books.length === 0) {
          console.log("No items returned from API");
          setBooks([]);
          return;
        }

        setBooks(books);
      } catch (error) {
        console.error("Error fetching data: ", error);
        setBooks([]);
      }
    };

    handleSearch();
  }, [googleAPIKey, keywords, setBooks]);

  return null; // No UI to render
};

GeneralQuery.propTypes = {
  keywords: propTypes.shape({
    title: propTypes.string,
    mainCategory: propTypes.string,
    keywords: propTypes.arrayOf(propTypes.string),
  }),
  googleAPIKey: propTypes.string.isRequired,
  setBooks: propTypes.func.isRequired,
};

export default GeneralQuery;
