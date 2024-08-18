import { ShelfDisplay } from "./ShelfDisplay";
import { Tabs } from "@mantine/core";
import PropTypes from "prop-types";

const BookTabs = ({ books }) => {
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
        <ShelfDisplay books={books} />
      </Tabs.Panel>
      <Tabs.Panel value="TopTen">TopTen tab content</Tabs.Panel>
      <Tabs.Panel value="TBR">TBR tab content</Tabs.Panel>
      <Tabs.Panel value="Loved">Loved tab content</Tabs.Panel>
      <Tabs.Panel value="DNF">DNF tab content</Tabs.Panel>
    </Tabs>
  );
};

BookTabs.propTypes = {
  books: PropTypes.array.isRequired,
};

export default BookTabs;
