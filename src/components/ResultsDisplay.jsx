import { useState } from "react";
import { Container, Modal, Title } from "@mantine/core";
import Placeholder from "./Placeholder";
import classes from "../css/ResultsDisplay.module.css";
import StarRating from "./StarRating";
import PropTypes from "prop-types";
import useShelf from "../hooks/useShelf";
import useModal from "../hooks/useModal";
import {
  BsBook,
  BsBookFill,
  BsBookHalf,
  BsBookmark,
  BsBookmarkCheckFill,
  BsBookmarks,
  BsBookmarksFill,
  BsBookmarkDash,
} from "react-icons/bs";

const SelectShelfIcon = ({ book, bookState, removeFromShelf, openModal }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className={classes.iconContainer}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {bookState.onShelf ? (
        isHovered ? (
          <BsBookmarkDash
            className={classes.icon}
            onClick={() => removeFromShelf(book, "selectShelf")}
          />
        ) : (
          <BsBookmarksFill
            className={classes.icon}
            onClick={() => openModal(book, "selectShelf")}
          />
        )
      ) : (
        <BsBookmarks
          className={classes.icon}
          onClick={() => openModal(book, "selectShelf")}
        />
      )}
    </div>
  );
};

SelectShelfIcon.propTypes = {
  book: PropTypes.shape({
    id: PropTypes.string.isRequired,
    volumeInfo: PropTypes.shape({
      title: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
  bookState: PropTypes.shape({
    onShelf: PropTypes.bool,
  }).isRequired,
  handleIconClick: PropTypes.func.isRequired,
  removeFromShelf: PropTypes.func.isRequired,
  openModal: PropTypes.func.isRequired,
};

const TBRIcon = ({ book, bookState, handleIconClick, removeFromShelf }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className={classes.iconContainer}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {bookState.tbr ? (
        isHovered ? (
          <BsBookmarkDash
            className={classes.icon}
            onClick={() => removeFromShelf(book, "TBR")}
          />
        ) : (
          <BsBookmarkCheckFill
            className={classes.icon}
            onClick={() => handleIconClick(book, "tbr")}
          />
        )
      ) : (
        <BsBookmark
          className={classes.icon}
          onClick={() => handleIconClick(book, "tbr")}
        />
      )}
    </div>
  );
};

TBRIcon.propTypes = {
  book: PropTypes.shape({
    id: PropTypes.string.isRequired,
    volumeInfo: PropTypes.shape({
      title: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
  bookState: PropTypes.shape({
    tbr: PropTypes.bool,
  }).isRequired,
  handleIconClick: PropTypes.func.isRequired,
  removeFromShelf: PropTypes.func.isRequired,
};

const PreviouslyReadIcon = ({
  book,
  bookState,
  removeFromShelf,
  openModal,
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className={classes.iconContainer}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {bookState.prevRead ? (
        isHovered ? (
          <BsBookHalf
            className={classes.icon}
            onClick={() => removeFromShelf(book, "Completed")}
          />
        ) : (
          <BsBookFill
            className={classes.icon}
            onClick={() => openModal(book, "previouslyRead")}
          />
        )
      ) : (
        <BsBook
          className={classes.icon}
          onClick={() => openModal(book, "previouslyRead")}
        />
      )}
    </div>
  );
};

PreviouslyReadIcon.propTypes = {
  book: PropTypes.shape({
    id: PropTypes.string.isRequired,
    volumeInfo: PropTypes.shape({
      title: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
  bookState: PropTypes.shape({
    prevRead: PropTypes.bool,
  }).isRequired,
  handleIconClick: PropTypes.func.isRequired,
  removeFromShelf: PropTypes.func.isRequired,
  openModal: PropTypes.func.isRequired,
};

const ResultsDisplay = ({ books }) => {
  const { shelves, addToShelf, removeFromShelf } = useShelf();
  const { modalOpen, openModal, closeModal, renderModalContent, modalType } =
    useModal();
  const [bookStates, setBookStates] = useState({});

  const getModalTitle = () => {
    switch (modalType) {
      case "selectShelf":
        return "Select a shelf to save...";
      case "previouslyRead":
        return "Rate and Review";
      default:
        return "Book Options";
    }
  };

  const handleIconClick = (book, type) => {
    if (type === "tbr") {
      addToShelf(book, "TBR");
      addToShelf(book, "AllBooks");
      setBookStates((prevStates) => ({
        ...prevStates,
        [book.id]: { ...prevStates[book.id], tbr: true },
      }));
    } else {
      openModal(book, type);
    }
  };

  const handleModalAction = (book, shelfName) => {
    addToShelf(book, shelfName);
    addToShelf(book, "AllBooks");
    setBookStates((prevStates) => ({
      ...prevStates,
      [book.id]: {
        ...prevStates[book.id],
        onShelf: true,
        prevRead: shelfName === "Completed",
      },
    }));
  };

  const handleRemoveFromShelf = (book, shelfName) => {
    removeFromShelf(book, shelfName);
    removeFromShelf(book, "AllBooks");
    setBookStates((prevStates) => ({
      ...prevStates,
      [book.id]: {
        ...prevStates[book.id],
        onShelf:
          shelfName === "selectShelf" ? false : prevStates[book.id]?.onShelf,
        tbr: shelfName === "TBR" ? false : prevStates[book.id]?.tbr,
        prevRead:
          shelfName === "Completed" ? false : prevStates[book.id]?.prevRead,
      },
    }));
  };

  const renderIcon = (book, type) => {
    const bookState = bookStates[book.id] || {};

    switch (type) {
      case "selectShelf":
        return (
          <SelectShelfIcon
            book={book}
            bookState={bookState}
            handleIconClick={handleIconClick}
            removeFromShelf={handleRemoveFromShelf}
            openModal={openModal}
          />
        );
      case "tbr":
        return (
          <TBRIcon
            book={book}
            bookState={bookState}
            handleIconClick={handleIconClick}
            removeFromShelf={handleRemoveFromShelf}
          />
        );
      case "previouslyRead":
        return (
          <PreviouslyReadIcon
            book={book}
            bookState={bookState}
            handleIconClick={handleIconClick}
            removeFromShelf={handleRemoveFromShelf}
            openModal={openModal}
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
                  src={book.volumeInfo?.imageLinks?.thumbnail || Placeholder}
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
        size="auto"
      >
        {renderModalContent(handleModalAction, shelves, Placeholder)}
      </Modal>
    </Container>
  );
};

ResultsDisplay.propTypes = {
  books: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      volumeInfo: PropTypes.shape({
        title: PropTypes.string.isRequired,
        imageLinks: PropTypes.shape({
          thumbnail: PropTypes.string,
        }),
      }).isRequired,
    })
  ).isRequired,
};

export default ResultsDisplay;
