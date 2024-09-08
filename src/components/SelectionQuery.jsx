import { useEffect, useRef } from "react";
import propTypes from "prop-types";

const SelectionQuery = ({ apiKey, criteria, setBooks, setIsLoading }) => {
  const prevCriteriaRef = useRef();

  useEffect(() => {
    if (!criteria) return;

    console.log(
      "SelectionQuery: New search triggered with criteria:",
      criteria
    ); // New console log

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
      if (
        JSON.stringify(criteria) === JSON.stringify(prevCriteriaRef.current)
      ) {
        return; // Skip if criteria haven't changed
      }

      setIsLoading(true);
      const baseUrl = "https://www.googleapis.com/books/v1/volumes?q=";
      let queryParts = [];
      let keywordParts = [];

      const {
        selectedGenres,
        selectedRating,
        selectedRep,
        selectedRomanceTrope,
        selectedTrueCrimeTrope,
        selectedThrillerTrope,
        selectedSciFiTrope,
        selectedFantasyTrope,
        maxPageCount,
      } = criteria;

      // Add genres to query (mainCategory) only if selected
      if (selectedGenres && selectedGenres.length > 0) {
        selectedGenres.forEach((genre) => {
          queryParts.push(`subject:"${encodeURIComponent(genre)}"`);
        });
      }
      // Add other criteria as keywords only if they are selected
      const selectedCriteria = [
        selectedRating,
        ...(selectedRep || []),
        ...(selectedRomanceTrope || []),
        ...(selectedTrueCrimeTrope || []),
        ...(selectedThrillerTrope || []),
        ...(selectedSciFiTrope || []),
        ...(selectedFantasyTrope || []),
      ].filter(Boolean);

      if (selectedCriteria.length > 0) {
        keywordParts = selectedCriteria.map(
          (item) => `"${encodeURIComponent(item)}"`
        );
        queryParts.push(`${keywordParts.join("+")}`);
      }

      if (queryParts.length === 0) {
        setBooks([]);
        setIsLoading(false);
        return;
      }

      let query = `${baseUrl}${queryParts.join(
        "&"
      )}&orderBy=relevance&maxResults=40&key=${apiKey}`;

      console.log("Google Books Query: ", query);

      try {
        const fetchedBooks = await fetchBooks(query);
        console.log("API Response: ", fetchedBooks);

        if (!fetchedBooks || fetchedBooks.length === 0) {
          console.log("No items returned from API");
          setBooks([]);
          setIsLoading(false);
          return;
        }

        // Filter books by max page count
        const filteredBooks = fetchedBooks.filter((book) => {
          const bookPageCount = book.volumeInfo?.pageCount;
          if (!bookPageCount || bookPageCount <= 0) return false;

          console.log(
            `Book: ${book.volumeInfo.title}, Pages: ${bookPageCount}, Max: ${maxPageCount}`
          );

          if (maxPageCount && bookPageCount > maxPageCount) {
            console.log(`Filtered out: ${book.volumeInfo.title}`);
            return false;
          }

          return true;
        });

        console.log(
          `Total books: ${fetchedBooks.length}, Filtered books: ${filteredBooks.length}`
        );

        setBooks(filteredBooks);
      } catch (error) {
        console.error("Error fetching books:", error);
        setBooks([]);
      } finally {
        setIsLoading(false);
      }
    };

    handleSearch();
    prevCriteriaRef.current = criteria;
  }, [apiKey, criteria, setBooks, setIsLoading]);

  return null; // No UI to render
};

SelectionQuery.propTypes = {
  apiKey: propTypes.string.isRequired,
  criteria: propTypes.shape({
    selectedGenres: propTypes.arrayOf(propTypes.string),
    selectedRating: propTypes.string,
    selectedRep: propTypes.arrayOf(propTypes.string),
    selectedRomanceTrope: propTypes.arrayOf(propTypes.string),
    selectedTrueCrimeTrope: propTypes.arrayOf(propTypes.string),
    selectedThrillerTrope: propTypes.arrayOf(propTypes.string),
    selectedSciFiTrope: propTypes.arrayOf(propTypes.string),
    selectedFantasyTrope: propTypes.arrayOf(propTypes.string),
    maxPageCount: propTypes.number,
  }),
  setBooks: propTypes.func.isRequired,
  setIsLoading: propTypes.func.isRequired,
};

export default SelectionQuery;
