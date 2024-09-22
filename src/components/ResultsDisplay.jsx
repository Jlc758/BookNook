import { useState } from "react";
import { Container, Modal, Title } from "@mantine/core";
import Placeholder from "./Placeholder";
import classes from "../css/ResultsDisplay.module.css";
import StarRating from "./StarRating";
import PropTypes from "prop-types";
import useShelf from "../hooks/useShelf";
import useModal from "../hooks/useModal";
import {
  SelectShelfIcon,
  TBRIcon,
  PreviouslyReadIcon,
  CurrentReadIcon,
  TopTenIcon,
} from "./Icons";

const ResultsDisplay = ({ books }) => {
  const { shelves, addToShelf, removeFromShelf, updateBookInShelf } =
    useShelf();
  const { modalOpen, openModal, closeModal, renderModalContent, modalType } =
    useModal();
  const [bookStates, setBookStates] = useState({});
  const [selectedRating, setSelectedRating] = useState({});

  const getModalTitle = () => {
    switch (modalType) {
      case "selectShelf":
        return "Select a shelf to save...";
      case "previouslyRead":
        return "Rate and Review";
      case "bookDescription":
        return "Book Description";
      case "topTen":
        return "Your top ten list is full";
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
        [book.etag]: { ...prevStates[book.etag], tbr: true },
      }));
    } else if (type === "topTen") {
      const topTenCount = shelves.TopTen.length;
      if (topTenCount < 10) {
        addToShelf(book, "TopTen");
        addToShelf(book, "AllBooks");
        setBookStates((prevStates) => ({
          ...prevStates,
          [book.etag]: { ...prevStates[book.etag], topTen: true },
        }));
      } else if (topTenCount === 10) {
        openModal(book, "topTen", topTenCount);
      }
    } else {
      openModal(book, type);
    }
  };

  const handleRemoveFromShelf = (book, shelfName) => {
    removeFromShelf(book, shelfName);
    removeFromShelf(book, "AllBooks");
    setBookStates((prevStates) => ({
      ...prevStates,
      [book.etag]: {
        ...prevStates[book.etag],
        [shelfName.toLowerCase()]: false,
        onShelf: false, // Set to false as we're removing from AllBooks
      },
    }));
  };

  const handleBookCoverClick = (book) => {
    openModal(book, "bookDescription");
  };

  const handleRatingChange = (book, newRating) => {
    setSelectedRating((prevRating) => ({
      ...prevRating,
      [book.etag]: newRating,
    }));
    openModal(book, "selectShelf");
  };

  const handleModalConfirm = (book, shelfName) => {
    addToShelf(book, shelfName);
    addToShelf(book, "AllBooks");

    const rating = selectedRating[book.etag];
    if (rating !== undefined) {
      updateBookInShelf(book, shelfName, { rating });
    }

    setBookStates((prevStates) => ({
      ...prevStates,
      [book.etag]: {
        ...prevStates[book.etag],
        [shelfName.toLowerCase()]: true,
      },
    }));
    closeModal();
  };

  const isOnAnyShelf = (bookState) => {
    return Object.values(bookState).some((value) => value === true);
  };

  const renderIcon = (book, type) => {
    const bookState = bookStates[book.etag] || {};
    const onShelf = isOnAnyShelf(bookState);

    switch (type) {
      case "selectShelf":
        return (
          <SelectShelfIcon
            book={book}
            bookState={{ onShelf: onShelf }}
            handleIconClick={handleIconClick}
            removeFromShelf={handleRemoveFromShelf}
            openModal={openModal}
          />
        );
      case "tbr":
        return (
          <TBRIcon
            book={book}
            bookState={{ tbr: bookState.tbr || false }}
            handleIconClick={handleIconClick}
            removeFromShelf={handleRemoveFromShelf}
          />
        );
      case "CurrentRead":
        return (
          <CurrentReadIcon
            book={book}
            bookState={{ CurrentRead: bookState.CurrentRead || false }}
            handleIconClick={handleIconClick}
            removeFromShelf={handleRemoveFromShelf}
            openModal={openModal}
          />
        );
      case "topTen":
        return (
          <TopTenIcon
            book={book}
            bookState={{ topTen: bookState.topTen || false }}
            handleIconClick={handleIconClick}
            removeFromShelf={handleRemoveFromShelf}
            openModal={openModal}
            topTenCount={shelves.TopTen.length}
          />
        );
      case "previouslyRead":
        return (
          <PreviouslyReadIcon
            book={book}
            bookState={{ previouslyRead: bookState.previouslyRead || false }}
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
          <div key={book.etag} className={classes.bookContainer}>
            <div className={classes.bookRatingTitle}>
              <div className={classes.bookCoverContainer}>
                {book.volumeInfo?.imageLinks?.thumbnail ? (
                  <img
                    src={book.volumeInfo.imageLinks.thumbnail}
                    alt={book.volumeInfo?.title}
                    className={classes.bookCover}
                    onClick={() => handleBookCoverClick(book)}
                  />
                ) : (
                  <Placeholder
                    className={classes.bookCover}
                    onClick={() => handleBookCoverClick(book)}
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
                rating={selectedRating[book.etag] || 0}
                onRatingChange={handleRatingChange}
              />
              <Title order={6} className={classes.title}>
                {book.volumeInfo?.title}
              </Title>
              <Title order={6} className={classes.author}>
                {book.volumeInfo?.authors}
              </Title>
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
