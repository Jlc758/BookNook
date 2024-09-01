import { useEffect } from "react";
import propTypes from "prop-types";

const SelectionQuery = ({ apiKey, criteria, setBooks }) => {
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
      const baseUrl = "https://www.googleapis.com/books/v1/volumes?q=";
      let queryParts = [];

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

      selectedGenres.forEach((genre) => {
        queryParts.push(`subject:"${encodeURIComponent(genre)}"`);
      });

      const allKeywords = [
        ...selectedRating,
        ...selectedRep,
        ...selectedRomanceTrope,
        ...selectedTrueCrimeTrope,
        ...selectedThrillerTrope,
        ...selectedSciFiTrope,
        ...selectedFantasyTrope,
      ];

      allKeywords.forEach((keyword) => {
        queryParts.push(`+"${encodeURIComponent(keyword)}"`);
      });

      if (queryParts.length === 0) {
        setBooks([]);
        return;
      }

      let query = `${baseUrl}${queryParts.join(
        "&"
      )}&orderBy=relevance&maxResults=40&key=${apiKey}`;

      try {
        const fetchedBooks = await fetchBooks(query);

        const filteredBooks = fetchedBooks.filter((book) => {
          const bookPageCount = book.volumeInfo?.pageCount;
          if (!bookPageCount || bookPageCount <= 0) return false;
          if (
            maxPageCount !== "any" &&
            bookPageCount > parseInt(maxPageCount)
          ) {
            return false;
          }
          return true;
        });

        setBooks(filteredBooks);
      } catch (error) {
        console.error("Error fetching books:", error);
        setBooks([]);
      }
    };

    handleSearch();
  }, [apiKey, criteria, setBooks]);

  return null; // No UI to render
};

SelectionQuery.propTypes = {
  apiKey: propTypes.string.isRequired,
  criteria: propTypes.shape({
    selectedGenres: propTypes.arrayOf(propTypes.string),
    selectedRating: propTypes.arrayOf(propTypes.string),
    selectedRep: propTypes.arrayOf(propTypes.string),
    selectedRomanceTrope: propTypes.arrayOf(propTypes.string),
    selectedTrueCrimeTrope: propTypes.arrayOf(propTypes.string),
    selectedThrillerTrope: propTypes.arrayOf(propTypes.string),
    selectedSciFiTrope: propTypes.arrayOf(propTypes.string),
    selectedFantasyTrope: propTypes.arrayOf(propTypes.string),
    maxPageCount: propTypes.string,
  }),
  setBooks: propTypes.func.isRequired,
};

export default SelectionQuery;
