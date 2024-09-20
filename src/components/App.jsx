import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { MantineProvider } from "@mantine/core";
import { ModalsProvider } from "@mantine/modals";
import "../css/index.css";
import Layout from "../context/Layout";
import LandingPage from "../pages/LandingPage";
import SearchOptions from "../pages/SearchOptionsPage";
import Shelves from "../pages/Shelves";
import Theme from "../css/theme";
import SearchProvider from "../context/SearchContext";
import ShelfProvider from "../context/ShelfContext";
import AvatarFAB from "./AvatarFAB";
import { useState, useEffect } from "react";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { path: "/", element: <LandingPage /> },
      { path: "search", element: <SearchOptions /> },
      { path: "shelves", element: <Shelves /> },
    ],
  },
]);

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
            <RouterProvider router={router} />
            <AvatarFAB />
          </ShelfProvider>
        </SearchProvider>
      </ModalsProvider>
    </MantineProvider>
  );
};

export default App;
