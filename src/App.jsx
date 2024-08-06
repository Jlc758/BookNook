import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./Layout";
import LandingPage from "./LandingPage";
import SearchOptions from "./SearchOptions";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { path: "/", element: <LandingPage /> },
      { path: "search", element: <SearchOptions /> },
    ],
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
