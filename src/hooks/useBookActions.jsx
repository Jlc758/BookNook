import { useCallback } from "react";
import useShelf from "./useShelf";
import useTopTen from "./useTopTen";
import {
  SelectShelfIcon,
  TBRIcon,
  PreviouslyReadIcon,
  CurrentReadIcon,
  TopTenIcon,
} from "../components/Icons";

const useBookActions = (openModal) => {
  const { addToShelf, removeFromShelf, isBookOnShelf, updateBookRating } =
    useShelf();
  const { addToTopTen, topTenCount } = useTopTen();

  const handleIconClick = useCallback(
    (book, type) => {
      switch (type) {
        case "tbr":
          if (isBookOnShelf(book, "TBR")) {
            removeFromShelf(book, "TBR");
          } else {
            addToShelf(book, "TBR");
          }
          break;
        case "topTen":
          if (isBookOnShelf(book, "TopTen")) {
            removeFromShelf(book, "TopTen");
          } else if (topTenCount < 10) {
            addToTopTen(book);
          } else {
            openModal(book, "topTen");
          }
          break;
        case "CurrentRead":
          if (isBookOnShelf(book, "CurrentRead")) {
            removeFromShelf(book, "CurrentRead");
          } else {
            openModal(book, "CurrentRead");
          }
          break;
        case "previouslyRead":
          openModal(book, "previouslyRead");
          break;
        case "selectShelf":
          openModal(book, "selectShelf");
          break;
        default:
          console.warn(`Unhandled icon type: ${type}`);
      }
    },
    [
      isBookOnShelf,
      removeFromShelf,
      addToShelf,
      addToTopTen,
      topTenCount,
      openModal,
    ]
  );

  const handleRatingSelect = useCallback(
    (book, rating) => {
      updateBookRating(book.id, rating);
      openModal(book, "previouslyRead", { initialRating: rating });
    },
    [updateBookRating, openModal]
  );

  const renderIcon = useCallback(
    (book, type) => {
      const props = {
        book,
        bookState: {
          tbr: isBookOnShelf(book, "TBR"),
          topTen: isBookOnShelf(book, "TopTen"),
          CurrentRead: isBookOnShelf(book, "CurrentRead"),
          previouslyRead: isBookOnShelf(book, "Completed"),
          onShelf: isBookOnShelf(book, "AllBooks"),
        },
        handleIconClick,
      };

      switch (type) {
        case "selectShelf":
          return <SelectShelfIcon {...props} />;
        case "tbr":
          return <TBRIcon {...props} />;
        case "CurrentRead":
          return <CurrentReadIcon {...props} />;
        case "topTen":
          return <TopTenIcon {...props} />;
        case "previouslyRead":
          return <PreviouslyReadIcon {...props} />;
        default:
          return null;
      }
    },
    [isBookOnShelf, handleIconClick]
  );

  return { handleIconClick, handleRatingSelect, renderIcon };
};

export default useBookActions;
