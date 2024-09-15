import { Container, Modal, Title } from "@mantine/core";
import placeholder from "../images/BookCover.jpg";
import classes from "../css/ResultsDisplay.module.css";
import StarRating from "./StarRating";
import PropTypes from "prop-types";
import useShelf from "../hooks/useShelf";
import useModal from "../hooks/useModal";
import { BsBook, BsBookmark, BsBookmarks } from "react-icons/bs";

const ResultsDisplay = ({ books }) => {
  const { shelves, addToShelf } = useShelf();
  const { modalOpen, openModal, closeModal, renderModalContent, modalType } =
    useModal();

  const getModalTitle = () => {
    switch (modalType) {
      case "tbr":
        return "Add to TBR List";
      case "selectShelf":
        return "Select a shelf to save...";
      case "previouslyRead":
        return "Previously Read";
      default:
        return "Book Options";
    }
  };

  return (
    <Container size="xl" py="xl" className={classes.grid}>
      {books.map((book) => (
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
            <BsBookmarks
              className={classes.bsBookmarks}
              onClick={() => openModal(book, "selectShelf")}
            />
            <BsBookmark
              className={classes.bsBookmark}
              onClick={() => openModal(book, "tbr")}
            />
            <BsBook
              className={classes.bsBook}
              onClick={() => openModal(book, "previouslyRead")}
            />
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
        {renderModalContent(addToShelf, shelves, placeholder)}
      </Modal>
    </Container>
  );
};

ResultsDisplay.propTypes = {
  books: PropTypes.array,
};

export default ResultsDisplay;
