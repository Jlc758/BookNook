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
          const keywordArray = additionalKeywords
            .split(",")
            .map((k) => k.trim());
          const uniqueKeywords = keywordArray.filter(
            (keyword) =>
              keyword.toLowerCase() !== mainCategory?.toLowerCase() &&
              !keyword
                .toLowerCase()
                .split(" ")
                .every((word) => mainCategory?.toLowerCase().includes(word))
          );
          queryParts.push(...uniqueKeywords.map(encodeURIComponent));
        }

        let query = `${baseUrl}${queryParts.join(
          "+"
        )}&orderBy=relevance&maxResults=40&key=${apiKey}`;

        console.log("Google Books Query: ", query);
        console.log(keywords);

        const books = await fetchBooks(query);

        console.log("API Response: ", books);

        if (!books || books.length === 0) {
          console.log("No items returned from API");
          setBooks([]);
          return;
        }

        const filteredBooks = books.filter((book) => {
          const bookPageCount = book.volumeInfo?.pageCount;

          const pageCountCheck =
            !pageCount || (bookPageCount && bookPageCount <= pageCount);

          return pageCountCheck;
        });

        setBooks(filteredBooks);
      } catch (error) {
        console.error("Error fetching data: ", error);
        setBooks([]);
      }
    };

    handleSearch();
  }, [apiKey, keywords, setBooks]);

  return;
};

GeneralQuery.propTypes = {
  keywords: propTypes.shape({
    title: propTypes.string,
    author: propTypes.string,
    mainCategory: propTypes.string,
    pageCount: propTypes.number,
    keywords: propTypes.string,
  }),
  apiKey: propTypes.string.isRequired,
  setBooks: propTypes.func.isRequired,
};

export default GeneralQuery;
