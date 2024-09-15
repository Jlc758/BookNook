import { createContext, useState } from "react";
import PropTypes from "prop-types";

export const ShelfContext = createContext();

export function ShelfProvider({ children }) {
  const [shelves, setShelves] = useState({
    CurrentRead: [],
    AllBooks: [],
    TopTen: [],
    TBR: [],
    Loved: [],
    DNF: [],
  });

  const addToShelf = (book, shelfName) => {
    setShelves((prevShelves) => ({
      ...prevShelves,
      AllBooks: [...new Set([...prevShelves.AllBooks, book])],
      [shelfName]: [...new Set([...prevShelves[shelfName], book])],
    }));
  };

  const removeFromShelf = (book, shelfName) => {
    setShelves((prevShelves) => ({
      ...prevShelves,
      [shelfName]: prevShelves[shelfName].filter((b) => b.id !== book.id),
    }));
  };

  const moveBook = (book, fromShelf, toShelf) => {
    removeFromShelf(book, fromShelf);
    addToShelf(book, toShelf);
  };

  return (
    <ShelfContext.Provider
      value={{ shelves, addToShelf, removeFromShelf, moveBook }}
    >
      {children}
    </ShelfContext.Provider>
  );
}

ShelfProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ShelfProvider;
