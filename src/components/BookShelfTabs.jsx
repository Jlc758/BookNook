import ResultsDisplay from "./ResultsDisplay";
import { Tabs, Title } from "@mantine/core";
import PropTypes from "prop-types";
import Sparkle from "react-sparkle";

const BookShelfTabs = ({ shelves }) => {
  const MagicWand = () => {
    return (
      <div
        style={{
          position: "relative",
          display: "in-line block",
          paddingLeft: "10px",
        }}
      >
        <Sparkle
          count={3}
          overflowPx={8}
          flicker={false}
          fadeOutSpeed={20}
          color={"var(--mantine-color-rose-2)"}
        />
      </div>
    );
  };

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
        <Title
          size="md"
          fs="italic"
          ta="center"
          style={{ paddingLeft: "10px" }}
        >
          This shelf houses any books you are currently reading!
        </Title>
        <ResultsDisplay books={shelves.CurrentRead} />
      </Tabs.Panel>
      <Tabs.Panel value="AllBooks">
        <Title
          size="md"
          fs="italic"
          ta="center"
          style={{ paddingLeft: "10px" }}
        >
          This shelf houses all books saved across all shelves!
        </Title>
        <ResultsDisplay books={shelves.AllBooks} />
      </Tabs.Panel>
      <Tabs.Panel value="TopTen">
        <Title
          size="md"
          fs="italic"
          ta="center"
          style={{ paddingLeft: "10px" }}
        >
          This shelf houses the next 10 books on your TBR that you are most
          excited to read!
        </Title>
        <ResultsDisplay books={shelves.TopTen} />
      </Tabs.Panel>
      <Tabs.Panel value="TBR">
        <Title
          size="md"
          fs="italic"
          ta="center"
          style={{ paddingLeft: "10px" }}
        >
          This shelf houses your TBR books!
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              fontSize: "14px",
            }}
          >
            <MagicWand />
            <p>to be read</p>
            <MagicWand />
          </div>
        </Title>

        <ResultsDisplay books={shelves.TBR} />
      </Tabs.Panel>
      <Tabs.Panel value="Loved">
        <Title
          size="md"
          fs="italic"
          ta="center"
          style={{ paddingLeft: "10px" }}
        >
          This shelf houses all the books you marked as having &quot;loved&quot;
          reading!
        </Title>
        <ResultsDisplay books={shelves.Loved} />
      </Tabs.Panel>
      <Tabs.Panel value="Completed">
        <Title
          size="md"
          fs="italic"
          ta="center"
          style={{ paddingLeft: "10px" }}
        >
          This shelf houses all the books you marked as having
          &quot;completed&quot;!
        </Title>
        <ResultsDisplay books={shelves.Completed} />
      </Tabs.Panel>
      <Tabs.Panel value="DNF">
        <Title
          size="md"
          fs="italic"
          ta="center"
          style={{ paddingLeft: "10px" }}
        >
          This shelf houses the books you DNF&apos;d!
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              fontSize: "14px",
            }}
          >
            <MagicWand />
            <p>did not finish</p>
            <MagicWand />
          </div>
        </Title>
        <ResultsDisplay books={shelves.DNF} />
      </Tabs.Panel>
    </Tabs>
  );
};

BookShelfTabs.propTypes = {
  shelves: PropTypes.object.isRequired,
};

export default BookShelfTabs;
