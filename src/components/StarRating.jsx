import { Rating } from "@mantine/core";
import PropTypes from "prop-types";
import { useShelf } from "../hooks/useShelf";
import { useState, useEffect } from "react";

function StarRating({ book, onRatingSelect, initialRating }) {
  const { getBookRating } = useShelf();
  const [localRating, setLocalRating] = useState(
    initialRating || getBookRating(book.id)
  );

  useEffect(() => {
    setLocalRating(initialRating || getBookRating(book.id));
  }, [book.id, initialRating, getBookRating]);

  const handleRatingChange = (newValue) => {
    setLocalRating(newValue);
    onRatingSelect(book, newValue);
  };

  return (
    <Rating
      value={localRating}
      onChange={handleRatingChange}
      fractions={2}
      color="var(--mantine-color-rose-1)"
    />
  );
}

StarRating.propTypes = {
  book: PropTypes.object.isRequired,
  onRatingSelect: PropTypes.func.isRequired,
  initialRating: PropTypes.number,
};

export default StarRating;
