import { Grid, Tabs } from "@mantine/core";
import placeholder from "../images/BookCover.jpg";
import classes from "../css/ShelfDisplay.module.css";
import StarRating from "./StarRating";
import Title from "./Title";

const BookTabs = () => {
  return (
    <Tabs defaultValue="CurrentRead" orientation="vertical">
      <Tabs.List>
        <Tabs.Tab value="CurrentRead">Currently Reading</Tabs.Tab>
        <Tabs.Tab value="AllBooks">All Books</Tabs.Tab>
        <Tabs.Tab value="TopTen">Top Ten</Tabs.Tab>
        <Tabs.Tab value="TBR">TBR</Tabs.Tab>
        <Tabs.Tab value="Loved">Loved</Tabs.Tab>
        <Tabs.Tab value="DNF">DNF</Tabs.Tab>
      </Tabs.List>

      <Tabs.Panel value="CurrentRead">Currently Reading tab content</Tabs.Panel>
      <Tabs.Panel value="AllBooks">
        <GridSetup />
      </Tabs.Panel>
      <Tabs.Panel value="TopTen">TopTen tab content</Tabs.Panel>
      <Tabs.Panel value="TBR">TBR tab content</Tabs.Panel>
      <Tabs.Panel value="Loved">Loved tab content</Tabs.Panel>
      <Tabs.Panel value="DNF">DNF tab content</Tabs.Panel>
    </Tabs>
  );
};

const GridSetup = () => {
  return (
    <Grid justify="center">
      <Grid.Col className={classes.column} align="center">
        <img src={placeholder} height="180px" />
        <StarRating />
        <Title>Title</Title>
      </Grid.Col>
      <Grid.Col className={classes.column} align="center">
        <img src={placeholder} height="180px" />
        <StarRating />
        <Title>Title</Title>
      </Grid.Col>
      <Grid.Col className={classes.column} align="center">
        <img src={placeholder} height="180px" />
        <StarRating />
        <Title>Title</Title>
      </Grid.Col>
      <Grid.Col className={classes.column} align="center">
        <img src={placeholder} height="180px" />
        <StarRating />
        <Title>Title</Title>
      </Grid.Col>
      <Grid.Col className={classes.column} align="center">
        <img src={placeholder} height="180px" />
        <StarRating />
        <Title>Title</Title>
      </Grid.Col>
      <Grid.Col className={classes.column} align="center">
        <img src={placeholder} height="180px" />
        <StarRating />
        <Title>Title</Title>
      </Grid.Col>
    </Grid>
  );
};

const ShelfDisplay = () => {
  return (
    <>
      <BookTabs />
    </>
  );
};

export default ShelfDisplay;
