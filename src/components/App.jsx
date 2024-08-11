import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { MantineProvider } from "@mantine/core";

import Layout from "../context/Layout";
import LandingPage from "../pages/LandingPage";
import SelectionQuery from "./SelectionQuery";
import SearchOptions from "../pages/SearchOptions";
import Shelves from "../pages/Shelves";
import Profile from "../pages/Profile";
import "@mantine/core/styles.css";
import { useLocalStorage } from "@mantine/hooks";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { path: "/", element: <LandingPage /> },
      { path: "search", element: <SearchOptions /> },
      { path: "selectSearch", element: <SelectionQuery /> },
      { path: "shelves", element: <Shelves /> },
      { path: "profile", element: <Profile /> },
    ],
  },
]);

const App = () => {
  const { colorScheme, setColorScheme } = useLocalStorage({
    key: "mantine-color-scheme",
    defaultValue: "dark",
    getInitialValueInEffect: true,
  });

  return (
    <MantineProvider theme={{ colorScheme }} withGlobalStyles withNormalCSS>
      <RouterProvider router={router} />
    </MantineProvider>
  );
};

export default App;
