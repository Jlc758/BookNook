import { Grid } from "@mantine/core";
import placeholder from "../images/BookCover.jpg";
import classes from "../css/ShelfDisplay.module.css";
import StarRating from "./StarRating";
import Title from "./Title";

const ShelfDisplay = () => {
  return (
    <Grid justify="center">
      <Grid.Col className={classes.column} align="center">
        <img src={placeholder} height="200px" />
        <StarRating />
        <Title>Title</Title>
      </Grid.Col>
      <Grid.Col className={classes.column}>
        <img src={placeholder} height="200px" />
        <StarRating />
        <Title>Title</Title>
      </Grid.Col>
      <Grid.Col className={classes.column}>
        <img src={placeholder} height="200px" />
        <StarRating />
        <Title>Title</Title>
      </Grid.Col>
      <Grid.Col className={classes.column}>
        <img src={placeholder} height="200px" />
        <StarRating />
        <Title>Title</Title>
      </Grid.Col>
      <Grid.Col className={classes.column}>
        <img src={placeholder} height="200px" />
        <StarRating />
        <Title>Title</Title>
      </Grid.Col>
      <Grid.Col className={classes.column}>
        <img src={placeholder} height="200px" />
        <StarRating />
        <Title>Title</Title>
      </Grid.Col>
    </Grid>
  );
};

export default ShelfDisplay;
