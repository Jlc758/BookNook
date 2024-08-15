import { Grid, rem } from "@mantine/core";
import placeholder from "../images/BookCover.jpg";
import classes from "../css/ShelfDisplay.module.css";
import StarRating from "./StarRating";

const ShelfDisplay = () => {
  return (
    <Grid className="classes.grid">
      <Grid.Col className="classes.col">
        <img src={placeholder} height="200px" />
        <StarRating />
      </Grid.Col>
      <Grid.Col className="classes.col">
        <img src={placeholder} height="200px" />
        <StarRating />
      </Grid.Col>
      <Grid.Col className="classes.col">
        <img src={placeholder} height="200px" />
        <StarRating />
      </Grid.Col>
    </Grid>
  );
};

export default ShelfDisplay;
