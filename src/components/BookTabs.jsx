import ResultsDisplay from "./ResultsDisplay";
import { Tabs } from "@mantine/core";
import PropTypes from "prop-types";

const BookTabs = ({ shelves }) => {
  return (
    <Tabs defaultValue="CurrentRead" orientation="vertical">
      <Tabs.List>
        <Tabs.Tab value="CurrentRead">Current Reads</Tabs.Tab>
        <Tabs.Tab value="AllBooks">All Books</Tabs.Tab>
        <Tabs.Tab value="TopTen">Top Ten</Tabs.Tab>
        <Tabs.Tab value="TBR">TBR</Tabs.Tab>
        <Tabs.Tab value="Loved">Loved</Tabs.Tab>
        <Tabs.Tab value="Completed">Completed</Tabs.Tab>
        <Tabs.Tab value="DNF">DNF</Tabs.Tab>
      </Tabs.List>

      <Tabs.Panel value="CurrentRead">
        <ResultsDisplay books={shelves.CurrentRead} />
      </Tabs.Panel>
      <Tabs.Panel value="AllBooks">
        <ResultsDisplay books={shelves.AllBooks} />
      </Tabs.Panel>
      <Tabs.Panel value="TopTen">
        <ResultsDisplay books={shelves.TopTen} />
      </Tabs.Panel>
      <Tabs.Panel value="TBR">
        <ResultsDisplay books={shelves.TBR} />
      </Tabs.Panel>
      <Tabs.Panel value="Loved">
        <ResultsDisplay books={shelves.Loved} />
      </Tabs.Panel>
      <Tabs.Panel value="Completed">
        <ResultsDisplay books={shelves.Completed} />
      </Tabs.Panel>
      <Tabs.Panel value="DNF">
        <ResultsDisplay books={shelves.DNF} />
      </Tabs.Panel>
    </Tabs>
  );
};

BookTabs.propTypes = {
  shelves: PropTypes.object.isRequired,
};

export default BookTabs;
