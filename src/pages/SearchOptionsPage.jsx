import { Space, Tabs } from "@mantine/core";
import NatLangSearch from "../components/NatLangSearch";

const SearchOptions = () => {
  return (
    <>
      <Space h="md" />
      <Tabs variant="outline" defaultValue="vibes">
        <Tabs.List grow>
          <Tabs.Tab value="vibes">Search by Vibes</Tabs.Tab>
          <Tabs.Tab value="criteria">Search by Criteria</Tabs.Tab>
        </Tabs.List>

        <Tabs.Panel value="vibes">
          <NatLangSearch />
        </Tabs.Panel>

        <Tabs.Panel value="criteria">Messages tab content</Tabs.Panel>
      </Tabs>
    </>
  );
};

export default SearchOptions;
