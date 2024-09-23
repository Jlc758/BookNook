import { Rating } from "@mantine/core";
import PropTypes from "prop-types";
import { useShelf } from "../hooks/useShelf";

function StarRating({ book, onRatingSelect }) {
  const { getBookRating } = useShelf();

  const handleRatingChange = (newValue) => {
    onRatingSelect(book, newValue);
  };

  return (
    <Rating
      value={getBookRating(book.id)}
      onChange={handleRatingChange}
      fractions={2}
    />
  );
}

StarRating.propTypes = {
  book: PropTypes.object.isRequired,
  onRatingSelect: PropTypes.func,
};

export default StarRating;
