import { useEffect, useRef } from "react";
import propTypes from "prop-types";

const SelectionQuery = ({ apiKey, criteria, setBooks, setIsLoading }) => {
  const prevCriteriaRef = useRef();

  useEffect(() => {
    if (!criteria) return;

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
        pageCount,
      } = criteria;

      // Add genres to query (mainCategory)
      selectedGenres.forEach((genre) => {
        queryParts.push(`subject:"${encodeURIComponent(genre)}"`);
      });

      // Add all other criteria (except maxPageCount) as keywords
      [
        selectedRating,
        selectedRep,
        selectedRomanceTrope,
        selectedTrueCrimeTrope,
        selectedThrillerTrope,
        selectedSciFiTrope,
        selectedFantasyTrope,
      ]
        .filter(Boolean)
        .forEach((item) => {
          keywordParts.push(`"${encodeURIComponent(item)}"`);
        });

      // Add keywords to query if there are any
      if (keywordParts.length > 0) {
        queryParts.push(`intitle:${keywordParts.join("+")}`);
      }

      if (queryParts.length === 0) {
        setBooks([]);
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

        const filteredBooks = fetchedBooks.filter((book) => {
          const bookPageCount = book.volumeInfo?.pageCount;
          if (!bookPageCount || bookPageCount <= 0) return false;

          const minPageCount = pageCount?.min ?? null;
          const maxPageCount = pageCount?.max ?? null;

          if (minPageCount !== null && bookPageCount < minPageCount)
            return false;
          if (maxPageCount !== null && bookPageCount > maxPageCount)
            return false;

          return true;
        });

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
    pageCount: propTypes.shape({
      min: propTypes.number,
      max: propTypes.number,
    }),
  }),
  setBooks: propTypes.func.isRequired,
  setIsLoading: propTypes.func.isRequired,
};

export default SelectionQuery;
