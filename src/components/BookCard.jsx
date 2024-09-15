// *Not currenly being called - need to fix

import PropTypes from "prop-types";
import Placeholder from "./Placeholder";

const BookCard = ({ title, authors, pageCount, categories, cover }) => {
  return (
    <div className="book-card">
      <div
        className="cover-container"
        style={{ aspectRatio: "2 / 3", overflow: "hidden" }}
      >
        {cover ? (
          <img
            src={cover}
            alt={`${title} cover`}
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        ) : (
          <Placeholder className="placeholder-cover" />
        )}
      </div>
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
