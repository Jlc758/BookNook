import { Tabs } from "@mantine/core";
import NatLangSearch from "./NatLangSearch";
import SelectSearch from "./SelectSearch";

const SearchOptionsPage = () => {
  const apiKey = import.meta.env.VITE_GOOGLE_BOOKS_API_KEY;

  return (
    <div className="MainContent SearchOptionsPage">
      <Tabs variant="outline" defaultValue="vibes">
        <Tabs.List grow>
          <Tabs.Tab value="vibes">Summon by Sentences</Tabs.Tab>
          <Tabs.Tab value="criteria">Summon by Selection</Tabs.Tab>
        </Tabs.List>

        <Tabs.Panel value="vibes">
          <NatLangSearch apiKey={apiKey} />
        </Tabs.Panel>

        <Tabs.Panel
          value="criteria"
          style={{
            display: "flex",
            flexDirection: "column",
            flexWrap: "wrap",
            justifyContent: "center",
            alignContent: "center",
          }}
        >
          <SelectSearch apiKey={apiKey} />
        </Tabs.Panel>
      </Tabs>
    </div>
  );
};

export default SearchOptionsPage;
