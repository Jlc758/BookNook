import { useState, useEffect } from "react";
import { HashRouter, Routes, Route } from "react-router-dom";
import { MantineProvider } from "@mantine/core";
import { ModalsProvider } from "@mantine/modals";
import "./css/index.css";
import Layout from "./context/Layout";
import LandingPage from "./pages/LandingPage";
import SearchOptionsPage from "./pages/SearchOptionsPage";
import Shelves from "./pages/Shelves";
import Theme from "./css/theme";
import SearchProvider from "./context/SearchContext";
import ShelfProvider from "./context/ShelfContext";
import AvatarFAB from "./components/AvatarFAB";
import Navigation from "./components/Navigation.jsx";

const App = () => {
  const [colorScheme, setColorScheme] = useState(Theme.colorScheme);
  const [apiKey, setApiKey] = useState("");
  const googleAPIKey = "AIzaSyCxYIJMd88bE8_DBPWaUSaL633NlHks8jc";

  useEffect(() => {
    const savedScheme = localStorage.getItem("mantine-color-scheme");
    if (savedScheme) {
      setColorScheme(savedScheme);
    }

    const savedApiKey = localStorage.getItem("openaiAPIKey");
    if (savedApiKey) {
      setApiKey(savedApiKey);
    }
  }, []);

  console.log("App - googleAPIKey:", googleAPIKey); // Debug log

  return (
    <MantineProvider
      theme={{ ...Theme, colorScheme }}
      withGlobalStyles
      withNormalizeCSS
    >
      <ModalsProvider>
        <SearchProvider>
          <ShelfProvider>
            <AvatarFAB />
            <HashRouter>
              <Navigation />
              <Routes>
                <Route path="/" element={<Layout />}>
                  <Route index element={<LandingPage />} />
                  <Route
                    path="search"
                    element={
                      <SearchOptionsPage
                        apiKey={apiKey}
                        setApiKey={setApiKey}
                        googleAPIKey={googleAPIKey}
                      />
                    }
                  />
                  <Route path="shelves" element={<Shelves />} />
                </Route>
              </Routes>
            </HashRouter>
          </ShelfProvider>
        </SearchProvider>
      </ModalsProvider>
    </MantineProvider>
  );
};

export default App;
