import { useEffect } from "react";
import propTypes from "prop-types";

const GeneralQuery = ({ apiKey, keywords, setBooks }) => {
  const baseUrl = "https://www.googleapis.com/books/v1/volumes?q=";

  useEffect(() => {
    if (!keywords) return;

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
        const {
          title,
          author,
          mainCategory,
          pageCount,
          keywords: additionalKeywords,
        } = keywords || {};

        let queryParts = [];

        if (title) queryParts.push(`intitle:"${encodeURIComponent(title)}"`);
        if (author) queryParts.push(`inauthor:"${encodeURIComponent(author)}"`);
        if (mainCategory)
          queryParts.push(`subject:"${encodeURIComponent(mainCategory)}"`);

        // Process additional keywords
        if (additionalKeywords) {
          let keywordArray;
          if (Array.isArray(additionalKeywords)) {
            keywordArray = additionalKeywords;
          } else if (typeof additionalKeywords === "string") {
            keywordArray = additionalKeywords.split(",").map((k) => k.trim());
          } else {
            console.error(
              "Unexpected type for additionalKeywords:",
              typeof additionalKeywords
            );
            keywordArray = [];
          }

          const uniqueKeywords = keywordArray.filter(
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
        )}&orderBy=relevance&maxResults=40&key=${apiKey}`;

        console.log("Google Books Query: ", query);

        const books = await fetchBooks(query);

        console.log("API Response: ", books);

        if (!books || books.length === 0) {
          console.log("No items returned from API");
          setBooks([]);
          return;
        }

        const filteredBooks = books.filter((book) => {
          const bookPageCount = book.volumeInfo?.pageCount;
          if (!bookPageCount || bookPageCount <= 0) return false;

          const minPageCount = pageCount?.min ?? null;
          const maxPageCount = pageCount?.max ?? null;

          // This logic works for all cases:
          // - "less than X pages": only maxPageCount is set
          // - "more than X pages": only minPageCount is set
          // - "around X pages": both minPageCount and maxPageCount are set
          // - exact page count: minPageCount equals maxPageCount
          if (minPageCount !== null && bookPageCount < minPageCount)
            return false;
          if (maxPageCount !== null && bookPageCount > maxPageCount)
            return false;

          return true;
        });

        setBooks(filteredBooks);
      } catch (error) {
        console.error("Error fetching data: ", error);
        setBooks([]);
      }
    };

    handleSearch();
  }, [apiKey, keywords, setBooks]);

  return null; // No UI to render
};

GeneralQuery.propTypes = {
  keywords: propTypes.shape({
    title: propTypes.string,
    author: propTypes.string,
    mainCategory: propTypes.string,
    pageCount: propTypes.shape({
      min: propTypes.number,
      max: propTypes.number,
    }),
    keywords: propTypes.oneOfType([
      propTypes.string,
      propTypes.arrayOf(propTypes.string),
    ]),
  }),
  apiKey: propTypes.string.isRequired,
  setBooks: propTypes.func.isRequired,
};

export default GeneralQuery;
