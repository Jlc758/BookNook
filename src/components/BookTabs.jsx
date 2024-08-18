import { GridSetup } from "./ShelfDisplay";
import { Tabs } from "@mantine/core";

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

export default BookTabs;
