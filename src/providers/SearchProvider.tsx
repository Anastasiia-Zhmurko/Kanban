import React, { createContext, useContext, useMemo } from "react";
import { emptyString } from "../utils/helpers";
import { useLocalStorage } from "../hooks/useLocalStorage";

interface SearchContext {
  searchString: string;
  searchHandler: React.Dispatch<React.SetStateAction<string>>;
}

const SearchContext = createContext<SearchContext | null>(null);

export const useSearchContext = () => {
  const ctx = useContext(SearchContext);
  if (!ctx)
    throw new Error("useSearchContext must be used inside SearchProvider");
  return ctx;
};

export const SearchProvider = ({ children }: { children: React.ReactNode }) => {
  const [searchString, setSearchString] = useLocalStorage<string>(
    "search",
    emptyString,
  );

  const value = useMemo<SearchContext>(
    () => ({
      searchString,
      searchHandler: setSearchString,
    }),
    [searchString, setSearchString],
  );

  return (
    <SearchContext.Provider value={value}>{children} </SearchContext.Provider>
  );
};
