import PropTypes from "prop-types";
import { useState } from "react";
import classes from "../css/ResultsDisplay.module.css";
import {
  BsBook,
  BsBookFill,
  BsBookHalf,
  BsBookmark,
  BsBookmarkCheckFill,
  BsBookmarks,
  BsBookmarksFill,
  BsBookmarkDash,
  BsStar,
  BsStarHalf,
  BsStarFill,
  BsBookmarkStar,
  BsFillBookmarkStarFill,
} from "react-icons/bs";

export const SelectShelfIcon = ({
  book,
  bookState,
  removeFromShelf,
  openModal,
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className={classes.iconContainer}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {bookState.onShelf ? (
        isHovered ? (
          <BsBookmarkDash
            className={classes.icon}
            onClick={() => removeFromShelf(book, "selectShelf")}
          />
        ) : (
          <BsBookmarksFill
            className={classes.icon}
            onClick={() => openModal(book, "selectShelf")}
          />
        )
      ) : (
        <BsBookmarks
          className={classes.icon}
          onClick={() => openModal(book, "selectShelf")}
        />
      )}
    </div>
  );
};

SelectShelfIcon.propTypes = {
  book: PropTypes.shape({
    etag: PropTypes.string.isRequired,
    volumeInfo: PropTypes.shape({
      title: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
  bookState: PropTypes.shape({
    onShelf: PropTypes.bool,
  }).isRequired,
  removeFromShelf: PropTypes.func.isRequired,
  openModal: PropTypes.func.isRequired,
};

export const TBRIcon = ({
  book,
  bookState,
  handleIconClick,
  removeFromShelf,
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className={classes.iconContainer}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {bookState.tbr ? (
        isHovered ? (
          <BsBookmarkDash
            className={classes.icon}
            onClick={() => removeFromShelf(book, "TBR")}
          />
        ) : (
          <BsBookmarkCheckFill
            className={classes.icon}
            onClick={() => handleIconClick(book, "tbr")}
          />
        )
      ) : (
        <BsBookmark
          className={classes.icon}
          onClick={() => handleIconClick(book, "tbr")}
        />
      )}
    </div>
  );
};

TBRIcon.propTypes = {
  book: PropTypes.shape({
    etag: PropTypes.string.isRequired,
    volumeInfo: PropTypes.shape({
      title: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
  bookState: PropTypes.shape({
    tbr: PropTypes.bool,
  }).isRequired,
  handleIconClick: PropTypes.func.isRequired,
  removeFromShelf: PropTypes.func.isRequired,
};

export const PreviouslyReadIcon = ({
  book,
  bookState,
  removeFromShelf,
  openModal,
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className={classes.iconContainer}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {bookState.previouslyRead ? (
        isHovered ? (
          <BsBookHalf
            className={classes.icon}
            onClick={() => removeFromShelf(book, "Completed")}
          />
        ) : (
          <BsBookFill
            className={classes.icon}
            onClick={() => openModal(book, "previouslyRead")}
          />
        )
      ) : (
        <BsBook
          className={classes.icon}
          onClick={() => openModal(book, "previouslyRead")}
        />
      )}
    </div>
  );
};

PreviouslyReadIcon.propTypes = {
  book: PropTypes.shape({
    etag: PropTypes.string.isRequired,
    volumeInfo: PropTypes.shape({
      title: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
  bookState: PropTypes.shape({
    previouslyRead: PropTypes.bool,
  }).isRequired,
  handleIconClick: PropTypes.func.isRequired,
  removeFromShelf: PropTypes.func.isRequired,
  openModal: PropTypes.func.isRequired,
};

export const CurrentReadIcon = ({
  book,
  bookState,
  removeFromShelf,
  openModal,
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className={classes.iconContainer}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {bookState.CurrentRead ? (
        isHovered ? (
          <BsStarHalf
            className={classes.icon}
            onClick={() => removeFromShelf(book, "CurrentRead")}
          />
        ) : (
          <BsStarFill
            className={classes.icon}
            onClick={() => openModal(book, "CurrentRead")}
          />
        )
      ) : isHovered ? (
        <BsStarHalf
          className={classes.icon}
          onClick={() => openModal(book, "CurrentRead")}
        />
      ) : (
        <BsStar
          className={classes.icon}
          onClick={() => openModal(book, "CurrentRead")}
        />
      )}
    </div>
  );
};

CurrentReadIcon.propTypes = {
  book: PropTypes.shape({
    etag: PropTypes.string.isRequired,
    volumeInfo: PropTypes.shape({
      title: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
  bookState: PropTypes.shape({
    CurrentRead: PropTypes.bool,
  }).isRequired,
  handleIconClick: PropTypes.func.isRequired,
  removeFromShelf: PropTypes.func.isRequired,
  openModal: PropTypes.func.isRequired,
};

export const TopTenIcon = ({
  book,
  bookState,
  handleIconClick,
  removeFromShelf,
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className={classes.iconContainer}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {bookState.topTen ? (
        isHovered ? (
          <BsBookmarkDash
            className={classes.icon}
            onClick={() => removeFromShelf(book, "TopTen")}
          />
        ) : (
          <BsFillBookmarkStarFill
            className={classes.icon}
            onClick={() => handleIconClick(book, "topTen")}
          />
        )
      ) : (
        <BsBookmarkStar
          className={classes.icon}
          onClick={() => {
            handleIconClick(book, "topTen");
          }}
        />
      )}
    </div>
  );
};

TopTenIcon.propTypes = {
  book: PropTypes.shape({
    etag: PropTypes.string.isRequired,
    volumeInfo: PropTypes.shape({
      title: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
  bookState: PropTypes.shape({
    topTen: PropTypes.bool,
  }).isRequired,
  handleIconClick: PropTypes.func.isRequired,
  removeFromShelf: PropTypes.func.isRequired,
};
