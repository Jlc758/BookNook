import PropTypes from "prop-types";
import PlaceholderCover from "../images/BookCover.jpg";

const BookCard = ({ title, authors, pageCount, categories, cover }) => {
  return (
    <div className="book-card">
      {cover && (
        <img
          src={cover}
          alt={`${title} cover`}
          placeholder={PlaceholderCover}
        />
      )}
      <h3>{title}</h3>
      {authors && <p>Authors: {authors}</p>}
      {pageCount && <p>Page Count: {pageCount}</p>}
      {categories && <p>Categories: {categories}</p>}
    </div>
  );
};

BookCard.propTypes = {
  title: PropTypes.string.isRequired,
  authors: PropTypes.string,
  pageCount: PropTypes.number,
  categories: PropTypes.string,
  cover: PropTypes.string,
};

export default BookCard;
