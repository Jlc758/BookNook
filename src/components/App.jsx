import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { MantineProvider } from "@mantine/core";
import "../css/index.css";
import Layout from "../context/Layout";
import LandingPage from "../pages/LandingPage";
import SearchOptions from "../pages/SearchOptionsPage";
import Shelves from "../pages/Shelves";
import Profile from "../pages/Profile";
import Theme from "../css/theme";
import SearchProvider from "../context/SearchContext";
import BookProvider from "../context/BookContext";

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
      <SearchProvider>
        <BookProvider>
          <RouterProvider router={router} />
        </BookProvider>
      </SearchProvider>
    </MantineProvider>
  );
};

export default App;
