import React, { createContext, useContext, useMemo, useState } from "react";
import type { FilterStatus } from "../types";
import { useLocalStorage } from "../hooks/useLocalStorage";

interface FilterContext {
  filterStatus: FilterStatus;
  filterHandler: React.Dispatch<React.SetStateAction<FilterStatus>>;
}

const FilterContext = createContext<FilterContext | null>(null);

export const useFilterContext = () => {
  const ctx = useContext(FilterContext);
  if (!ctx)
    throw new Error("useFlterContext must be used inside FilterProvider ");
  return ctx;
};

export const FilterProvider = ({ children }: { children: React.ReactNode }) => {
  const [filterStatus, setFilterStatus] = useLocalStorage<FilterStatus>(
    "filterStatus",
    "all",
  );

  const value = useMemo<FilterContext>(
    () => ({
      filterStatus,
      filterHandler: setFilterStatus,
    }),
    [filterStatus, setFilterStatus],
  );

  return (
    <FilterContext.Provider value={value}>{children} </FilterContext.Provider>
  );
};
