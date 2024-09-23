// Shelves.jsx
import { useContext } from "react";
import BookShelfTabs from "../components/BookShelfTabs";
import { ShelfContext } from "../context/ShelfContext"; // Adjust the import path as needed

const Shelves = () => {
  const { shelves } = useContext(ShelfContext);

  return (
    <div className="MainContent">
      <BookShelfTabs shelves={shelves} />
    </div>
  );
};

export default Shelves;
