import { useEffect, useState } from "react";
import PropTypes from "prop-types";

const GeneralQuery = ({ keywords, apiKey, setBooks }) => {
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!keywords) return;

    const fetchAllBooks = async (initialQuery) => {
      let allBooks = [];
      let query = initialQuery;

      while (query) {
        const response = await fetch(query);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();

        if (data.items) {
          allBooks = [...allBooks, ...data.items];
        }

        if (data.nextPageToken) {
          query = `${initialQuery}&pageToken=${data.nextPageToken}`;
        } else {
          query = null;
        }
      }

      return allBooks;
    };

    const handleSearch = async () => {
      try {
        const { title, author, mainCategory, pageCount, ...restKeywords } =
          keywords || {};

        let queryParts = [];

        let stopwords = ["and", "the", "or"];

        if (title) {
          queryParts.push(`intitle:"${encodeURIComponent(title)}"`);
        }
        if (author) {
          queryParts.push(`inauthor:"${encodeURIComponent(author)}"`);
        }
        if (mainCategory) {
          queryParts.push(`subject:"${encodeURIComponent(mainCategory)}"`);
        }

        if (queryParts.length === 0) {
          // Combine remaining keywords into a single query string
          const remainingKeywords = Object.values(restKeywords)
            .filter(
              (keyword) => keyword && !stopwords.includes(keyword.toLowerCase())
            )
            .map(encodeURIComponent)
            .join("+");

          if (remainingKeywords) {
            queryParts.push(remainingKeywords);
          }
        }

        let query = `https://www.googleapis.com/books/v1/volumes?q=${queryParts.join(
          "+"
        )}&maxResults=40`;

        // Append the API key
        query += `&key=${apiKey}`;

        console.log("Query URL:", query); // For debugging

        const response = await fetch(query);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();

        console.log("API Response:", data);

        if (!data.items || data.items.length === 0) {
          console.log("No items returned from API");
          setBooks([]);
          return;
        }

        const keywordsArray = [
          ...Object.values(restKeywords),
          title,
          author,
          mainCategory,
        ]
          .filter(Boolean)
          .flatMap((keyword) => keyword.split(" "))
          .filter(
            (keyword) =>
              keyword.trim() !== "" &&
              !stopwords.includes(keyword.toLowerCase())
          );

        console.log("Keywords Array:", keywordsArray);
        console.log("Total books before filtering:", data.items.length);

        // Filter results based on pageCount and description containing keywords
        const filteredBooks = data.items.filter((book) => {
          const bookPageCount = book.volumeInfo?.pageCount;
          const bookDescription = book.volumeInfo?.description || "";
          const bookTitle = book.volumeInfo?.title || "";

          const pageCountCheck =
            !pageCount || (bookPageCount && bookPageCount <= pageCount);

          const keywordCheck =
            keywordsArray.length === 0 ||
            keywordsArray.some(
              (keyword) =>
                bookDescription.toLowerCase().includes(keyword.toLowerCase()) ||
                bookTitle.toLowerCase().includes(keyword.toLowerCase())
            );

          console.log(`Book: ${bookTitle}`);
          console.log(
            `  Page Count: ${bookPageCount}, Required: ${pageCount}, Pass: ${pageCountCheck}`
          );
          console.log(`  Keyword Check: ${keywordCheck}`);
          console.log(
            `  Keywords found:`,
            keywordsArray.filter(
              (keyword) =>
                bookDescription.toLowerCase().includes(keyword.toLowerCase()) ||
                bookTitle.toLowerCase().includes(keyword.toLowerCase())
            )
          );
          console.log(`  Description: ${bookDescription.slice(0, 100)}...`);

          return pageCountCheck && keywordCheck;
        });

        console.log("Filtered books:", filteredBooks.length);
        console.log(
          "Filtered books details:",
          filteredBooks.map((book) => ({
            title: book.volumeInfo?.title,
            pageCount: book.volumeInfo?.pageCount,
            keywordsFound: keywordsArray.filter(
              (keyword) =>
                (book.volumeInfo?.description || "")
                  .toLowerCase()
                  .includes(keyword.toLowerCase()) ||
                (book.volumeInfo?.title || "")
                  .toLowerCase()
                  .includes(keyword.toLowerCase())
            ),
          }))
        );
      } catch (error) {
        console.error("Error fetching data:", error);
        setError("Failed to fetch books. Please try again.");
        setBooks([]);
      }
    };

    handleSearch();
  }, [keywords, apiKey, setBooks]);

  if (error) return <div>Error: {error}</div>;
};

GeneralQuery.propTypes = {
  keywords: PropTypes.shape({
    title: PropTypes.string,
    author: PropTypes.string,
    mainCategory: PropTypes.string,
    pageCount: PropTypes.number,
  }),
  apiKey: PropTypes.string.isRequired,
  cover: PropTypes.string,
  setBooks: PropTypes.func.isRequired,
};

export default GeneralQuery;
