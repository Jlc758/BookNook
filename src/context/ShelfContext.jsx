import {
  createContext,
  useCallback,
  useEffect,
  useState,
  useMemo,
} from "react";
import PropTypes from "prop-types";

export const ShelfContext = createContext();

const validShelves = {
  CurrentRead: [],
  AllBooks: [],
  TopTen: [],
  TBR: [],
  Loved: [],
  Completed: [],
  DNF: [],
};

const ShelfProvider = ({ children }) => {
  const [shelves, setShelves] = useState(() => {
    const savedShelves = localStorage.getItem("shelves");
    return savedShelves ? JSON.parse(savedShelves) : validShelves;
  });

  const [ratings, setRatings] = useState(() => {
    const savedRatings = localStorage.getItem("bookRatings");
    return savedRatings ? JSON.parse(savedRatings) : {};
  });

  useEffect(() => {
    localStorage.setItem("shelves", JSON.stringify(shelves));
  }, [shelves]);

  useEffect(() => {
    localStorage.setItem("bookRatings", JSON.stringify(ratings));
  }, [ratings]);

  const getValidShelfNames = useCallback(() => Object.keys(shelves), []);

  const isBookOnShelf = useCallback(
    (book, shelfName) => {
      return shelves[shelfName].some((shelfBook) => shelfBook.id === book.id);
    },
    [shelves]
  );

  const addToShelf = useCallback(
    (book, shelfName) => {
      if (!getValidShelfNames().includes(shelfName)) {
        console.warn(`Attempted to add book to invalid shelf: ${shelfName}`);
        return;
      }

      setShelves((prevShelves) => {
        const updatedShelf = [...new Set([...prevShelves[shelfName], book])];
        const updatedAllBooks = [...new Set([...prevShelves.AllBooks, book])];

        if (updatedShelf.length > prevShelves[shelfName].length) {
          console.log(`Added "${book.volumeInfo?.title}" to: ${shelfName}`);
          console.log(
            `${shelfName} now contains: ${updatedShelf.length} books`
          );
        }

        return {
          ...prevShelves,
          [shelfName]: updatedShelf,
          AllBooks: updatedAllBooks,
        };
      });
    },
    [getValidShelfNames]
  );

  const removeFromShelf = useCallback(
    (book, shelfName) => {
      if (!getValidShelfNames().includes(shelfName)) {
        console.warn(
          `Attempted to remove book from invalid shelf: ${shelfName}`
        );
        return;
      }

      setShelves((prevShelves) => {
        const updatedShelf = prevShelves[shelfName].filter(
          (b) => b.id !== book.id
        );
        const updatedAllBooks =
          shelfName === "AllBooks"
            ? prevShelves.AllBooks.filter((b) => b.id !== book.id)
            : prevShelves.AllBooks;

        return {
          ...prevShelves,
          [shelfName]: updatedShelf,
          AllBooks: updatedAllBooks,
        };
      });
    },
    [getValidShelfNames]
  );

  const moveBook = useCallback(
    (book, fromShelf, toShelf) => {
      removeFromShelf(book, fromShelf);
      addToShelf(book, toShelf);
    },
    [removeFromShelf, addToShelf]
  );

  const updateBookInShelf = useCallback(
    (book, shelfName, updates) => {
      if (!getValidShelfNames().includes(shelfName)) {
        console.warn(`Attempted to update book on invalid shelf: ${shelfName}`);
        return;
      }

      setShelves((prevShelves) => ({
        ...prevShelves,
        [shelfName]: prevShelves[shelfName].map((b) =>
          b.id === book.id ? { ...b, ...updates } : b
        ),
      }));
    },
    [getValidShelfNames]
  );

  const logShelfContents = useCallback(
    (shelfName) => {
      if (!getValidShelfNames().includes(shelfName)) {
        console.warn(
          `Attempted to log contents of invalid shelf: ${shelfName}`
        );
        return;
      }

      console.log(`Books in ${shelfName}:`);
      shelves[shelfName].forEach((book, index) => {
        console.log(
          `${index + 1}. "${book.volumeInfo?.title}" by ${
            book.volumeInfo?.authors?.join(", ") || "Unknown Author"
          }`
        );
      });
      console.log(`Total books in ${shelfName}: ${shelves[shelfName].length}`);
    },
    [getValidShelfNames, shelves]
  );

  const updateBookRating = useCallback((bookId, rating) => {
    setRatings((prevRatings) => ({
      ...prevRatings,
      [bookId]: rating,
    }));
  }, []);

  const getBookRating = useCallback(
    (bookId) => {
      return ratings[bookId] || 0;
    },
    [ratings]
  );

  const contextValue = useMemo(
    () => ({
      shelves,
      addToShelf,
      removeFromShelf,
      moveBook,
      getValidShelfNames,
      updateBookInShelf,
      isBookOnShelf,
      logShelfContents,
      updateBookRating,
      getBookRating,
    }),
    [
      shelves,
      addToShelf,
      removeFromShelf,
      moveBook,
      getValidShelfNames,
      updateBookInShelf,
      isBookOnShelf,
      logShelfContents,
      updateBookRating,
      getBookRating,
    ]
  );

  return (
    <ShelfContext.Provider value={contextValue}>
      {children}
    </ShelfContext.Provider>
  );
};

ShelfProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ShelfProvider;
