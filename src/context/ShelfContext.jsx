import { createContext, useEffect, useState } from "react";
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

  useEffect(() => {
    localStorage.setItem("shelves", JSON.stringify(shelves));
  }, [shelves]);

  const getValidShelfNames = () => Object.keys(shelves);

  const addToShelf = (book, shelfName) => {
    if (!getValidShelfNames().includes(shelfName)) {
      console.warn(`Attempted to add book to invalid shelf: ${shelfName}`);
      return;
    }

    setShelves((prevShelves) => {
      const updatedShelf = [...new Set([...prevShelves[shelfName], book])];

      if (updatedShelf.length > prevShelves.length) {
        console.log(`Added "${book.volumeInfo?.title}" to: ${shelfName}`);
        console.log(`${shelfName} now contains: ${updatedShelf.length} books`);
      }

      return {
        ...prevShelves,
        [shelfName]: updatedShelf,
      };
    });
  };

  const removeFromShelf = (book, shelfName) => {
    if (!getValidShelfNames().includes(shelfName)) {
      console.warn(`Attempted to remove book from invalid shelf: ${shelfName}`);
      return;
    }

    setShelves((prevShelves) => ({
      ...prevShelves,
      [shelfName]: prevShelves[shelfName].filter(
        (book) => book.etag !== book.etag
      ),
    }));
  };

  const moveBook = (book, fromShelf, toShelf) => {
    removeFromShelf(book, fromShelf);
    addToShelf(book, toShelf);
  };

  return (
    <ShelfContext.Provider
      value={{
        shelves,
        addToShelf,
        removeFromShelf,
        moveBook,
        getValidShelfNames,
      }}
    >
      {children}
    </ShelfContext.Provider>
  );
};

ShelfProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ShelfProvider;
