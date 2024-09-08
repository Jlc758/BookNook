import { Container, Tooltip } from "@mantine/core";
import placeholder from "../images/BookCover.jpg";
import classes from "../css/ShelfDisplay.module.css";
import StarRating from "./StarRating";
import Title from "./Title";
import PropTypes from "prop-types";
import { BookmarkPlus, BookMarked, BookmarkCheck } from "lucide-react";

export const ShelfDisplay = ({ books }) => {
  return (
    <Container size="xl" py="xl">
      <div className={classes.grid}>
        {books.map((book) => (
          <div key={book.id} className={classes.column}>
            <div className={classes.bookCoverContainer}>
              <img
                src={book.volumeInfo?.imageLinks?.thumbnail || placeholder}
                alt={book.volumeInfo?.title}
                className={classes.bookCover}
              />

              <Tooltip
                className={classes.tooltip}
                label="Select Shelf"
                position="top"
                offset={{ mainAxis: -2, crossAxis: -90 }}
              >
                <BookMarked
                  className={classes.shelved}
                  size={20}
                  color="#ffc0b3"
                />
              </Tooltip>

              <Tooltip
                className={classes.tooltip}
                label="Add to TBR"
                position="top"
                offset={{ mainAxis: 33, crossAxis: -90 }}
              >
                <BookmarkPlus
                  // Add to TBR
                  className={classes.bookmark}
                  size={24}
                  color="#ffc0b3"
                />
              </Tooltip>

              <Tooltip
                className={classes.tooltip}
                label="Previously Read; Add Review and/or Add to Shelf"
                position="top"
                multiline
                w={182}
                offset={{ mainAxis: 70, crossAxis: -42 }}
              >
                <BookmarkCheck
                  className={classes.readPrev}
                  size={24}
                  color="#ffc0b3"
                />
              </Tooltip>
            </div>
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
