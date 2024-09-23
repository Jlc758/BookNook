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

export const SelectShelfIcon = ({ book, bookState, handleIconClick }) => {
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
            onClick={() => handleIconClick(book, "selectShelf")}
          />
        ) : (
          <BsBookmarksFill
            className={classes.icon}
            onClick={() => handleIconClick(book, "selectShelf")}
          />
        )
      ) : (
        <BsBookmarks
          className={classes.icon}
          onClick={() => handleIconClick(book, "selectShelf")}
        />
      )}
    </div>
  );
};

export const TBRIcon = ({ book, bookState, handleIconClick }) => {
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
            onClick={() => handleIconClick(book, "tbr")}
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

export const PreviouslyReadIcon = ({ book, bookState, handleIconClick }) => {
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
            onClick={() => handleIconClick(book, "previouslyRead")}
          />
        ) : (
          <BsBookFill
            className={classes.icon}
            onClick={() => handleIconClick(book, "previouslyRead")}
          />
        )
      ) : (
        <BsBook
          className={classes.icon}
          onClick={() => handleIconClick(book, "previouslyRead")}
        />
      )}
    </div>
  );
};

export const CurrentReadIcon = ({ book, bookState, handleIconClick }) => {
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
            onClick={() => handleIconClick(book, "CurrentRead")}
          />
        ) : (
          <BsStarFill
            className={classes.icon}
            onClick={() => handleIconClick(book, "CurrentRead")}
          />
        )
      ) : isHovered ? (
        <BsStarHalf
          className={classes.icon}
          onClick={() => handleIconClick(book, "CurrentRead")}
        />
      ) : (
        <BsStar
          className={classes.icon}
          onClick={() => handleIconClick(book, "CurrentRead")}
        />
      )}
    </div>
  );
};

export const TopTenIcon = ({ book, bookState, handleIconClick }) => {
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
            onClick={() => handleIconClick(book, "topTen")}
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
          onClick={() => handleIconClick(book, "topTen")}
        />
      )}
    </div>
  );
};

const iconPropTypes = {
  book: PropTypes.shape({
    id: PropTypes.string.isRequired,
    volumeInfo: PropTypes.shape({
      title: PropTypes.string,
    }),
  }).isRequired,
  bookState: PropTypes.object.isRequired,
  handleIconClick: PropTypes.func.isRequired,
};

// Apply this to all icon components
SelectShelfIcon.propTypes = iconPropTypes;
TBRIcon.propTypes = iconPropTypes;
PreviouslyReadIcon.propTypes = iconPropTypes;
CurrentReadIcon.propTypes = iconPropTypes;
TopTenIcon.propTypes = iconPropTypes;
