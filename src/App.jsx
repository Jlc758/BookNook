import { HashRouter, Routes, Route } from "react-router-dom";
import { MantineProvider, TextInput, Button, Box } from "@mantine/core";
import { ModalsProvider } from "@mantine/modals";
import "./css/index.css";
import Layout from "./context/Layout";
import LandingPage from "./pages/LandingPage";
import SearchOptions from "./pages/SearchOptionsPage";
import Shelves from "./pages/Shelves";
import Theme from "./css/theme";
import SearchProvider from "./context/SearchContext";
import ShelfProvider from "./context/ShelfContext";
import AvatarFAB from "./components/AvatarFAB";
import Navigation from "./components/Navigation.jsx";
import { useState, useEffect } from "react";

const App = () => {
  const [colorScheme, setColorScheme] = useState(Theme.colorScheme);
  const [apiKey, setApiKey] = useState("");

  useEffect(() => {
    const savedScheme = localStorage.getItem("mantine-color-scheme");
    if (savedScheme) {
      setColorScheme(savedScheme);
    }

    // Load API key from localStorage if available
    const savedApiKey = localStorage.getItem("openai-api-key");
    if (savedApiKey) {
      setApiKey(savedApiKey);
    }
  }, []);

  const handleApiKeySubmit = (e) => {
    e.preventDefault();
    // Save API key to localStorage
    localStorage.setItem("openai-api-key", apiKey);
    console.log("API Key set and saved");
  };

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
              <Box sx={{ maxWidth: 300 }} mx="auto" mt="md">
                <form onSubmit={handleApiKeySubmit}>
                  <TextInput
                    type="password"
                    value={apiKey}
                    onChange={(e) => setApiKey(e.target.value)}
                    placeholder="Enter your OpenAI API Key"
                    required
                  />
                  <Button type="submit" fullWidth mt="sm">
                    Set API Key
                  </Button>
                </form>
              </Box>
              <Routes>
                <Route path="/" element={<Layout />}>
                  <Route index element={<LandingPage />} />
                  <Route
                    path="search"
                    element={<SearchOptions apiKey={apiKey} />}
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
