// Shelves.jsx
import { useContext } from "react";
import BookTabs from "../components/BookTabs";
import { ShelfContext } from "../context/ShelfContext"; // Adjust the import path as needed

const Shelves = () => {
  const { shelves } = useContext(ShelfContext);

  return (
    <div className="MainContent">
      <BookTabs shelves={shelves} />
    </div>
  );
};

export default Shelves;
