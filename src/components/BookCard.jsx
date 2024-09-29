import { Title } from "@mantine/core";
import Placeholder from "./Placeholder";
import StarRating from "./StarRating";
import BookIcons from "./BookIcons";
import classes from "../css/ResultsDisplay.module.css";
import PropTypes from "prop-types";

const BookCard = ({ book, onRatingSelect, renderIcon, openModal }) => {
  return (
    <div className={classes.bookContainer}>
      <div className={classes.bookContent}>
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
        </div>
        <StarRating book={book} onRatingSelect={onRatingSelect} />
        <Title order={6} className={classes.title}>
          {book.volumeInfo?.title || "Untitled"}
        </Title>
        <Title order={6} className={classes.author}>
          {book.volumeInfo?.authors?.join(", ") || "Unknown Author"}
        </Title>
      </div>
      <div className={classes.iconOverlay}>
        <BookIcons book={book} renderIcon={renderIcon} />
      </div>
    </div>
  );
};

BookCard.propTypes = {
  book: PropTypes.shape({
    id: PropTypes.string.isRequired,
    volumeInfo: PropTypes.shape({
      title: PropTypes.string,
      authors: PropTypes.arrayOf(PropTypes.string),
      imageLinks: PropTypes.shape({
        thumbnail: PropTypes.string,
      }),
    }),
  }).isRequired,
  onRatingSelect: PropTypes.func.isRequired,
  renderIcon: PropTypes.func.isRequired,
  openModal: PropTypes.func.isRequired,
};

export default BookCard;
