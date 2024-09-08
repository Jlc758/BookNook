import { createContext, useState, useCallback, useMemo } from "react";

export const BookContext = createContext();

const BookProvider = (props) => {
  const [savedBooks, setSavedBooks] = useState({
    currentlyReading: [],
    allBooks: [],
    topTen: [],
    tbr: [],
    loved: [],
    dnf: [],
  });

  const saveBook = useCallback((book, shelf) => {
    setSavedBooks((prev) => ({
      ...prev,
      [shelf]: [...prev[shelf], book],
    }));
  }, []);

  const value = useMemo(
    () => ({ savedBooks, saveBook }),
    [savedBooks, saveBook]
  );

  return (
    <BookContext.Provider value={value}>{props.children}</BookContext.Provider>
  );
};

export default BookProvider;
