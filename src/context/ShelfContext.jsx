import { createContext, useEffect, useState } from "react";
import PropTypes from "prop-types";

export const ShelfContext = createContext();

export function ShelfProvider({ children }) {
  const [shelves, setShelves] = useState(() => {
    const savedShelves = localStorage.getItem("shelves");
    return savedShelves
      ? JSON.parse(savedShelves)
      : {
          CurrentRead: [],
          AllBooks: [],
          TopTen: [],
          TBR: [],
          Loved: [],
          Completed: [],
          DNF: [],
        };
  });

  useEffect(() => {
    // Save shelves to localStorage whenever they change
    localStorage.setItem("shelves", JSON.stringify(shelves));
    console.log("Updated shelves:", shelves);
  }, [shelves]);

  const addToShelf = (book, shelfName) => {
    setShelves((prevShelves) => {
      const newShelves = {
        ...prevShelves,
        AllBooks: [...new Set([...prevShelves.AllBooks, book])],
        [shelfName]: [...new Set([...prevShelves[shelfName], book])],
      };
      console.log(`Added "${book.volumeInfo?.title}" to: ${shelfName}`);
      console.log(`${shelfName} now contains:`, newShelves[shelfName]);
      return newShelves;
    });
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
