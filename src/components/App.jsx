import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { MantineProvider } from "@mantine/core";
import { ModalsProvider } from "@mantine/modals";
import "../css/index.css";
import Layout from "../context/Layout";
import LandingPage from "../pages/LandingPage";
import SearchOptions from "../pages/SearchOptionsPage";
import Shelves from "../pages/Shelves";
import Profile from "../pages/Profile";
import Theme from "../css/theme";
import SearchProvider from "../context/SearchContext";
import ShelfProvider from "../context/ShelfContext";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { path: "/", element: <LandingPage /> },
      { path: "search", element: <SearchOptions /> },
      { path: "shelves", element: <Shelves /> },
      { path: "profile", element: <Profile /> },
    ],
  },
]);

const App = () => {
  return (
    <MantineProvider theme={Theme}>
      <ModalsProvider>
        <SearchProvider>
          <ShelfProvider>
            <RouterProvider router={router} />
          </ShelfProvider>
        </SearchProvider>
      </ModalsProvider>
    </MantineProvider>
  );
};

export default App;
