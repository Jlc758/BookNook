// BookCard.jsx
import PropTypes from "prop-types";
import placeholderImage from "../src/images/BookCover.png";
import { StyledCardContent, StyledCard, StyledImage } from "./StyledComponents";

const BookCard = ({ title, authors, pageCount, categories, cover }) => {
  const imageSrc = cover ? cover : placeholderImage;

  const handleImageError = (event) => {
    event.target.src = placeholderImage;
  };

  return (
    <StyledCard>
      <StyledImage
        component="img"
        src={imageSrc}
        alt={title}
        onError={handleImageError}
      />
      <StyledCardContent>
        <h2>{title}</h2>
        <p>Author: {authors}</p>
        <p>Page Count: {pageCount}</p>
        <p>Category: {categories}</p>
      </StyledCardContent>
    </StyledCard>
  );
};

BookCard.propTypes = {
  title: PropTypes.string,
  authors: PropTypes.string,
  pageCount: PropTypes.number,
  categories: PropTypes.string,
  cover: PropTypes.string,
};

export default BookCard;
