import { HashRouter, Routes, Route } from "react-router-dom";
import { MantineProvider } from "@mantine/core";
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
import Navigation from "./components/Navigation.jsx"; // Import Navigation
import { useState, useEffect } from "react";

const App = () => {
  const [colorScheme, setColorScheme] = useState(Theme.colorScheme);

  useEffect(() => {
    const savedScheme = localStorage.getItem("mantine-color-scheme");
    if (savedScheme) {
      setColorScheme(savedScheme);
    }
  }, []);

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
              <Navigation /> {/* Include Navigation within the HashRouter */}
              <Routes>
                <Route path="/" element={<Layout />}>
                  <Route index element={<LandingPage />} />
                  <Route path="search" element={<SearchOptions />} />
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
