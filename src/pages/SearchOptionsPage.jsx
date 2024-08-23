import { Space, Tabs } from "@mantine/core";
import NatLangSearch from "./NatLangSearch";
import SelectSearch from "./SelectSearch";

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

        <Tabs.Panel value="criteria">
          <SelectSearch />
        </Tabs.Panel>
      </Tabs>
    </>
  );
};

export default SearchOptions;
