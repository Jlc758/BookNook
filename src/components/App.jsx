import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { MantineProvider } from "@mantine/core";
import "../css/index.css";
import Layout from "../context/Layout";
import LandingPage from "../pages/LandingPage";
import SelectionQuery from "./SelectionQuery";
import SearchOptions from "../pages/SearchOptions";
import Shelves from "../pages/Shelves";
import Profile from "../pages/Profile";
import Theme from "../css/theme";

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
  return (
    <MantineProvider theme={Theme}>
      <RouterProvider router={router} />
    </MantineProvider>
  );
};

export default App;
