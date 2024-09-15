import { useContext } from "react";
import { ShelfContext } from "../context/ShelfContext";

export function useShelf() {
  const context = useContext(ShelfContext);
  if (context === undefined) {
    throw new Error("useShelf must be used within a ShelfProvider");
  }
  return context;
}

export default useShelf;
