import { Container } from "@mantine/core";
import placeholder from "../images/BookCover.jpg";
import classes from "../css/ShelfDisplay.module.css";
import StarRating from "./StarRating";
import Title from "./Title";
import PropTypes from "prop-types";

export const ShelfDisplay = ({ books }) => {
  return (
    <Container size="xl" py="xl">
      <div className={classes.grid}>
        {books.map((book) => (
          <div key={book.id} className={classes.column}>
            <img
              src={book.volumeInfo?.imageLinks?.thumbnail || placeholder}
              height="180px"
              alt={book.volumeInfo?.title}
              style={{ display: "block", marginBottom: "10px" }}
            />
            <StarRating />
            <Title>{book.volumeInfo?.title}</Title>
          </div>
        ))}
      </div>
    </Container>
  );
};

ShelfDisplay.propTypes = {
  books: PropTypes.array,
};

export default ShelfDisplay;
