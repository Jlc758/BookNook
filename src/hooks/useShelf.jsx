import { useContext } from "react";
import ShelfContext from "../context/ShelfContext";

const useShelf = () => useContext(ShelfContext);

export default useShelf;
