import React, { useState, useCallback, useMemo } from "react";
import { Container, Modal, Title } from "@mantine/core";
import Placeholder from "./Placeholder";
import classes from "../css/ResultsDisplay.module.css";
import StarRating from "./StarRating";
import PropTypes from "prop-types";
import useShelf from "../hooks/useShelf";
import useModal from "../hooks/useModal";
import useTopTen from "../hooks/useTopTen";
import {
  SelectShelfIcon,
  TBRIcon,
  PreviouslyReadIcon,
  CurrentReadIcon,
  TopTenIcon,
} from "./Icons";

const ResultsDisplay = React.memo(({ books }) => {
  const {
    shelves,
    addToShelf,
    removeFromShelf,
    updateBookInShelf,
    isBookOnShelf,
  } = useShelf();
  const { modalOpen, openModal, closeModal, renderModalContent, modalType } =
    useModal();
  const [selectedRating, setSelectedRating] = useState({});
  const { addToTopTen, topTenCount, swapTopTenBook } = useTopTen();

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
            addToShelf(book, "CurrentRead");
          }
          break;
        case "previouslyRead":
          if (isBookOnShelf(book, "Completed")) {
            removeFromShelf(book, "Completed");
          } else {
            addToShelf(book, "Completed");
          }
          break;
        case "selectShelf":
          if (isBookOnShelf(book, "AllBooks")) {
            removeFromShelf(book, "AllBooks");
          } else {
            addToShelf(book, "AllBooks");
          }
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

  const handleModalConfirm = useCallback(
    (book, shelfName, bookToRemove) => {
      if (shelfName === "TopTen" && bookToRemove) {
        swapTopTenBook(bookToRemove, book);
      } else {
        addToShelf(book, shelfName);
      }
      const rating = selectedRating[book.id];
      if (rating !== undefined) {
        updateBookInShelf(book, shelfName, { rating });
      }
      closeModal();
    },
    [swapTopTenBook, addToShelf, updateBookInShelf, selectedRating, closeModal]
  );

  const renderedBooks = useMemo(() => {
    return books.map((book) => (
      <div key={book.id} className={classes.bookContainer}>
        <div className={classes.bookRatingTitle}>
          <div className={classes.bookCoverContainer}>
            {book.volumeInfo?.imageLinks?.thumbnail ? (
              <img
                src={book.volumeInfo.imageLinks.thumbnail}
                alt={book.volumeInfo?.title || "Untitled book"}
                className={classes.bookCover}
                onClick={() => openModal(book, "bookDescription")}
              />
            ) : (
              <Placeholder
                className={classes.bookCover}
                onClick={() => openModal(book, "bookDescription")}
              />
            )}
            <div className={classes.shelfIcons}>
              {renderIcon(book, "CurrentRead")}
              {renderIcon(book, "topTen")}
              {renderIcon(book, "selectShelf")}
              {renderIcon(book, "tbr")}
              {renderIcon(book, "previouslyRead")}
            </div>
          </div>
          <StarRating
            book={book}
            rating={selectedRating[book.id] || 0}
            onRatingChange={(newRating) => {
              setSelectedRating((prev) => ({
                ...prev,
                [book.id]: newRating,
              }));
              openModal(book, "selectShelf");
            }}
          />
          <Title order={6} className={classes.title}>
            {book.volumeInfo?.title || "Untitled"}
          </Title>
          <Title order={6} className={classes.author}>
            {book.volumeInfo?.authors?.join(", ") || "Unknown Author"}
          </Title>
        </div>
      </div>
    ));
  }, [books, selectedRating, renderIcon, openModal]);

  return (
    <Container size="xl" py="xl" className={classes.grid}>
      {renderedBooks}
      <Modal
        centered
        opened={modalOpen}
        onClose={closeModal}
        title={
          modalType === "selectShelf"
            ? "Select a shelf to save..."
            : modalType === "previouslyRead"
            ? "Rate and Review"
            : modalType === "bookDescription"
            ? "Book Description"
            : modalType === "topTen"
            ? "Your top ten list is full"
            : "Book Options"
        }
        size="auto"
      >
        {renderModalContent(
          addToShelf,
          removeFromShelf,
          shelves,
          Placeholder,
          handleModalConfirm
        )}
      </Modal>
    </Container>
  );
});

ResultsDisplay.displayName = "ResultsDisplay";

ResultsDisplay.propTypes = {
  books: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      volumeInfo: PropTypes.shape({
        title: PropTypes.string,
        authors: PropTypes.arrayOf(PropTypes.string),
        imageLinks: PropTypes.shape({
          thumbnail: PropTypes.string,
        }),
      }),
    })
  ).isRequired,
};

export default ResultsDisplay;
