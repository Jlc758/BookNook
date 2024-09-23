import classes from "../css/ResultsDisplay.module.css";
import PropTypes from "prop-types";

const BookIcons = ({ book, renderIcon }) => {
  return (
    <div className={classes.shelfIcons}>
      {renderIcon(book, "CurrentRead")}
      {renderIcon(book, "topTen")}
      {renderIcon(book, "selectShelf")}
      {renderIcon(book, "tbr")}
      {renderIcon(book, "previouslyRead")}
    </div>
  );
};

BookIcons.propTypes = {
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
  renderIcon: PropTypes.func.isRequired,
};

export default BookIcons;
