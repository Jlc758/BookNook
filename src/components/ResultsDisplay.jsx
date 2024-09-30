import React from "react";
import { Modal } from "@mantine/core";
import BookCard from "./BookCard";
import classes from "../css/ResultsDisplay.module.css";
import PropTypes from "prop-types";
import useShelf from "../hooks/useShelf";
import useModal from "../hooks/useModal";
import useBookActions from "../hooks/useBookActions";

const ResultsDisplay = React.memo(({ books }) => {
  const { shelves, addToShelf, removeFromShelf } = useShelf();
  const {
    modalOpen,
    openModal,
    closeModal,
    renderModalContent,
    modalType,
    handleModalConfirm,
    toggleShelfSelection,
    formatShelfName,
    handleRatingChange,
    selectedRating,
  } = useModal();
  const { handleRatingSelect, renderIcon } = useBookActions(openModal);

  return (
    <div className={classes.resultsContainer}>
      <div className={classes.grid}>
        {books.map((book, index) => (
          <BookCard
            key={`${book.id}_${index}`}
            book={book}
            onRatingSelect={handleRatingSelect}
            renderIcon={renderIcon}
            openModal={openModal}
          />
        ))}
      </div>
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
            : modalType === "CurrentRead"
            ? "Add to Current Read"
            : "Book Options"
        }
        size="auto"
      >
        {renderModalContent(
          addToShelf,
          removeFromShelf,
          shelves,
          handleModalConfirm,
          toggleShelfSelection,
          formatShelfName,
          handleRatingChange,
          selectedRating
        )}
      </Modal>
    </div>
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
