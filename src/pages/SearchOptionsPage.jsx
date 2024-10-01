import { Tabs } from "@mantine/core";
import NatLangSearch from "./NatLangSearch";
import SelectSearch from "./SelectSearch";
import { APIButton } from "../components/APIKeyManager";

const SearchOptionsPage = ({ apiKey, googleAPIKey, setApiKey }) => {
  return (
    <div className="MainContent SearchOptionsPage">
      <div>
        <APIButton className="APIButton" setAppApiKey={setApiKey} />
      </div>

      <Tabs variant="outline" defaultValue="vibes">
        <Tabs.List grow>
          <Tabs.Tab value="vibes">Summon by Sentences</Tabs.Tab>
          <Tabs.Tab value="criteria">Summon by Selection</Tabs.Tab>
        </Tabs.List>

        <Tabs.Panel value="vibes">
          <NatLangSearch googleAPIKey={googleAPIKey} apiKey={apiKey} />
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
          <SelectSearch googleAPIKey={googleAPIKey} apiKey={apiKey} />
        </Tabs.Panel>
      </Tabs>
    </div>
  );
};

export default SearchOptionsPage;
