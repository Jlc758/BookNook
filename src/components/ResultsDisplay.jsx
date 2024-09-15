import { useState } from "react";
import { Container, Modal, Title } from "@mantine/core";
import placeholder from "../images/BookCover.jpg";
import classes from "../css/ResultsDisplay.module.css";
import StarRating from "./StarRating";
import PropTypes from "prop-types";
import useShelf from "../hooks/useShelf";
import useModal from "../hooks/useModal";
import {
  BsBook,
  BsBookFill,
  BsBookmark,
  BsBookmarkCheckFill,
  BsBookmarks,
  BsBookmarksFill,
} from "react-icons/bs";

const ResultsDisplay = ({ books }) => {
  const { shelves, addToShelf } = useShelf();
  const { modalOpen, openModal, closeModal, renderModalContent, modalType } =
    useModal();
  const [bookStates, setBookStates] = useState({});

  const getModalTitle = () => {
    switch (modalType) {
      case "selectShelf":
        return "Select a shelf to save...";
      case "previouslyRead":
        return "Previously Read";
      default:
        return "Book Options";
    }
  };

  const handleIconClick = (book, type) => {
    if (type === "tbr") {
      handleModalAction(book, type);
    } else {
      openModal(book, type);
    }
  };

  const handleModalAction = (book, newState) => {
    setBookStates((prevStates) => ({
      ...prevStates,
      [book.id]: {
        ...prevStates[book.id],
        [newState]: !prevStates[book.id]?.[newState],
      },
    }));
  };

  const renderIcon = (book, type) => {
    const bookState = bookStates[book.id] || {};

    switch (type) {
      case "selectShelf":
        return bookState.onShelf ? (
          <BsBookmarksFill
            className={classes.bsBookmarks}
            onClick={() => handleIconClick(book, "selectShelf")}
          />
        ) : (
          <BsBookmarks
            className={classes.bsBookmarks}
            onClick={() => handleIconClick(book, "selectShelf")}
          />
        );
      case "tbr":
        return bookState.tbr ? (
          <BsBookmarkCheckFill
            className={classes.bsBookmark}
            onClick={() => handleIconClick(book, "tbr")}
          />
        ) : (
          <BsBookmark
            className={classes.bsBookmark}
            onClick={() => handleIconClick(book, "tbr")}
          />
        );
      case "previouslyRead":
        return bookState.prevRead ? (
          <BsBookFill
            className={classes.bsBook}
            onClick={() => handleIconClick(book, "previouslyRead")}
          />
        ) : (
          <BsBook
            className={classes.bsBook}
            onClick={() => handleIconClick(book, "previouslyRead")}
          />
        );
      default:
        return null;
    }
  };

  return (
    <Container size="xl" py="xl" className={classes.grid}>
      {books &&
        books.length > 0 &&
        books.map((book) => (
          <div key={book.id} className={classes.bookContainer}>
            <div className={classes.bookRatingTitle}>
              <div className={classes.bookCoverContainer}>
                <img
                  src={book.volumeInfo?.imageLinks?.thumbnail || placeholder}
                  alt={book.volumeInfo?.title}
                  className={classes.bookCover}
                />
              </div>
              <StarRating />
              <Title order={6} className={classes.title}>
                {book.volumeInfo?.title}
              </Title>
            </div>
            <div className={classes.shelfIcons}>
              {renderIcon(book, "selectShelf")}
              {renderIcon(book, "tbr")}
              {renderIcon(book, "previouslyRead")}
            </div>
          </div>
        ))}

      <Modal
        centered
        opened={modalOpen}
        onClose={closeModal}
        title={getModalTitle()}
        size={"auto"}
      >
        {renderModalContent(
          addToShelf,
          shelves,
          placeholder,
          handleModalAction
        )}
      </Modal>
    </Container>
  );
};

ResultsDisplay.propTypes = {
  books: PropTypes.array,
};

export default ResultsDisplay;
