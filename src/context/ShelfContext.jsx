import { createContext, useState } from "react";
import PropTypes from "prop-types";

export const ShelfContext = createContext();

const ShelfProvider = ({ children }) => {
  const [shelves, setShelves] = useState({
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

  return (
    <ShelfContext.Provider value={{ shelves, addToShelf }}>
      {children}
    </ShelfContext.Provider>
  );
};

ShelfProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ShelfProvider;
