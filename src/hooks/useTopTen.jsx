import { useCallback, useMemo } from "react";
import useShelf from "./useShelf";

const useTopTen = () => {
  const { shelves, addToShelf, removeFromShelf } = useShelf();

  const topTenCount = useMemo(() => shelves.TopTen.length, [shelves.TopTen]);

  const addToTopTen = useCallback(
    (book) => {
      if (topTenCount < 10) {
        addToShelf(book, "TopTen");
        addToShelf(book, "AllBooks");
        addToShelf(book, "TBR");
        return true;
      }
      return false;
    },
    [topTenCount, addToShelf]
  );

  const swapTopTenBook = useCallback(
    (oldBook, newBook) => {
      removeFromShelf(oldBook, "TopTen");
      addToShelf(newBook, "TopTen");
      addToShelf(newBook, "AllBooks");
    },
    [removeFromShelf, addToShelf]
  );

  return {
    topTen: shelves.TopTen,
    topTenCount,
    addToTopTen,
    swapTopTenBook,
  };
};

export default useTopTen;
