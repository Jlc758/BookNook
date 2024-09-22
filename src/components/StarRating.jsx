import { Rating } from "@mantine/core";
import PropTypes from "prop-types";

function StarRating({ book, onRatingChange }) {
  const handleRatingChange = (newValue) => {
    onRatingChange(book, newValue);
  };
  return <Rating onChange={handleRatingChange} fractions={2} />;
}

StarRating.propTypes = {
  book: PropTypes.object.isRequired,
  onRatingChange: PropTypes.func.isRequired,
};

export default StarRating;
