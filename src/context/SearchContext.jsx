import { createContext, useState } from "react";

export const SearchContext = createContext();

const SearchProvider = (props) => {
  const [searchText, setSearchText] = useState("");
  const value = { searchText, setSearchText };

  return (
    <SearchContext.Provider value={value}>
      {props.children}
    </SearchContext.Provider>
  );
};

export default SearchProvider;
