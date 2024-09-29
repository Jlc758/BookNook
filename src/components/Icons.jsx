import PropTypes from "prop-types";
import { useState, forwardRef } from "react";
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
import { Tooltip } from "@mantine/core";

export const SelectShelfIcon = forwardRef(
  ({ book, bookState, handleIconClick, ...props }, ref) => {
    const [isHovered, setIsHovered] = useState(false);

    const IconComponent = bookState.onShelf
      ? isHovered
        ? BsBookmarkDash
        : BsBookmarksFill
      : BsBookmarks;

    return (
      <Tooltip label={bookState.onShelf ? "Remove from shelf" : "Add to shelf"}>
        <div
          ref={ref}
          className={classes.iconContainer}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          {...props}
        >
          <IconComponent
            className={classes.icon}
            onClick={() => handleIconClick(book, "selectShelf")}
          />
        </div>
      </Tooltip>
    );
  }
);

SelectShelfIcon.displayName = "SelectShelfIconToolTip";

export const TBRIcon = forwardRef(
  ({ book, bookState, handleIconClick, ...props }, ref) => {
    const [isHovered, setIsHovered] = useState(false);

    const IconComponent = bookState.tbr
      ? isHovered
        ? BsBookmarkDash
        : BsBookmarkCheckFill
      : BsBookmark;

    return (
      <Tooltip label={bookState.tbr ? "Remove from TBR" : "Add to TBR"}>
        <div
          ref={ref}
          className={classes.iconContainer}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          {...props}
        >
          <IconComponent
            className={classes.icon}
            onClick={() => handleIconClick(book, "tbr")}
          />
        </div>
      </Tooltip>
    );
  }
);

TBRIcon.displayName = "TBRToolTip";

export const PreviouslyReadIcon = forwardRef(
  ({ book, bookState, handleIconClick, ...props }, ref) => {
    const [isHovered, setIsHovered] = useState(false);

    const IconComponent = bookState.previouslyRead
      ? isHovered
        ? BsBookHalf
        : BsBookFill
      : BsBook;

    return (
      <Tooltip
        label={
          bookState.previouslyRead
            ? "Remove from Previously Read"
            : "Add to Previously Read"
        }
      >
        <div
          ref={ref}
          className={classes.iconContainer}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          {...props}
        >
          <IconComponent
            className={classes.icon}
            onClick={() => handleIconClick(book, "previouslyRead")}
          />
        </div>
      </Tooltip>
    );
  }
);

PreviouslyReadIcon.displayName = "PreviouslyReadToolTip";

export const CurrentReadIcon = forwardRef(
  ({ book, bookState, handleIconClick, ...props }, ref) => {
    const [isHovered, setIsHovered] = useState(false);

    const IconComponent = bookState.CurrentRead
      ? isHovered
        ? BsStarHalf
        : BsStarFill
      : BsStar;

    return (
      <Tooltip
        label={
          bookState.CurrentRead
            ? "Remove from Current Read"
            : "Add to Current Read"
        }
      >
        <div
          ref={ref}
          className={classes.iconContainer}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          {...props}
        >
          <IconComponent
            className={classes.icon}
            onClick={() => handleIconClick(book, "CurrentRead")}
          />
        </div>
      </Tooltip>
    );
  }
);

CurrentReadIcon.displayName = "CurrentReadIconToolTip";

export const TopTenIcon = forwardRef(
  ({ book, bookState, handleIconClick, ...props }, ref) => {
    const [isHovered, setIsHovered] = useState(false);

    const IconComponent = bookState.topTen
      ? isHovered
        ? BsBookmarkDash
        : BsFillBookmarkStarFill
      : BsBookmarkStar;

    return (
      <Tooltip
        label={bookState.topTen ? "Remove from Top Ten" : "Add to Top Ten"}
      >
        <div
          ref={ref}
          className={classes.iconContainer}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          {...props}
        >
          <IconComponent
            className={classes.icon}
            onClick={() => handleIconClick(book, "topTen")}
          />
        </div>
      </Tooltip>
    );
  }
);

TopTenIcon.displayName = "TopTenIconToolTip";

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
