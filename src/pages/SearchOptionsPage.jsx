import { useState, useEffect } from "react";
import { Tabs } from "@mantine/core";
import NatLangSearch from "./NatLangSearch";
import SelectSearch from "./SelectSearch";
import { APIKeyManager } from "../components/APIKeyManager";

const SearchOptionsPage = ({ apiKey, setApiKey, googleAPIKey }) => {
  const [shouldOpenModal, setShouldOpenModal] = useState(!apiKey);

  useEffect(() => {
    if (!apiKey) {
      setShouldOpenModal(true);
    }
  }, [apiKey]);

  console.log("SearchOptionsPage - googleAPIKey:", googleAPIKey); // Debug log

  const handleTabClick = () => {
    if (!apiKey) {
      setShouldOpenModal(true);
    }
  };

  return (
    <div className="MainContent SearchOptionsPage">
      <div>
        <APIKeyManager
          setAppApiKey={setApiKey}
          initialIsOpen={shouldOpenModal}
        />
      </div>

      <Tabs variant="outline" defaultValue="vibes">
        <Tabs.List grow>
          <Tabs.Tab value="vibes" onClick={handleTabClick}>
            Summon by Sentences
          </Tabs.Tab>
          <Tabs.Tab value="criteria" onClick={handleTabClick}>
            Summon by Selection
          </Tabs.Tab>
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
