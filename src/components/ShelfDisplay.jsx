import { Container, Tooltip } from "@mantine/core";
import placeholder from "../images/BookCover.jpg";
import classes from "../css/ShelfDisplay.module.css";
import StarRating from "./StarRating";
import Title from "./Title";
import PropTypes from "prop-types";
import { BookmarkPlus, BookMarked, BookmarkCheck } from "lucide-react";
import { useBooks } from "../hooks/useBooks";
import { useEffect } from "react";

const ShelfDisplay = ({ books }) => {
  const { saveBook, savedBooks } = useBooks();

  useEffect(() => {
    console.log("Current saved books:", savedBooks);
  }, [savedBooks]);

  // Every book get saved in All Books shelf
  const isBookInAll = (book) => {
    return savedBooks.allBooks.some(
      (savedBook) => savedBook.title === book.title
    );
  };

  const handleSavetoAll = (book) => {
    if (!isBookInAll(book)) {
      saveBook(book, "AllBooks");
      console.log("Book saved to All Books:", book);
    } else {
      console.log("Book already in All Books:", book);
    }
  };

  const isBookInTbr = (book) => {
    return savedBooks.tbr.some((savedBook) => savedBook.title === book.title);
  };

  const handleSavetoTBR = (book) => {
    if (!isBookInTbr(book)) {
      saveBook(book, "TBR");
      console.log("Book saved to TBR:", book);
    } else {
      console.log("Book already in TBR:", book);
    }
  };

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
                  onClick={() => {
                    handleSavetoTBR(book);
                    handleSavetoAll(book);
                  }}
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
