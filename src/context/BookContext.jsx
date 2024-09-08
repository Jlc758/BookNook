import {
  createContext,
  useState,
  useCallback,
  useMemo,
  useEffect,
} from "react";

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

  useEffect(() => {
    console.log("Saved books updated:", savedBooks);
  }, [savedBooks]);

  const saveBook = useCallback((book, shelf) => {
    setSavedBooks((prev) => {
      const updatedBooks = {
        ...prev,
        [shelf]: [...prev[shelf], book],
      };
      console.log(`Book saved to ${shelf}:`, book);
      console.log("Updated saved books:", updatedBooks);
      return updatedBooks;
    });
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
