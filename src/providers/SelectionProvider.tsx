import React, { createContext, useContext, useMemo } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";

interface SelectionContext {
  selectedIds: string[];
  selecthHandler: React.Dispatch<React.SetStateAction<string[]>>;
}

const SelectionContext = createContext<SelectionContext | null>(null);

export const useSelectionContext = () => {
  const ctx = useContext(SelectionContext);
  if (!ctx)
    throw new Error(
      "useSelectionContext must be used inside SelectionProvider",
    );
  return ctx;
};

export const SelectionProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [selectedIds, setSelectedIds] = useLocalStorage<string[]>(
    "selectedIds",
    [],
  );

  const value = useMemo<SelectionContext>(
    () => ({
      selectedIds,
      selecthHandler: setSelectedIds,
    }),
    [selectedIds, setSelectedIds],
  );

  return (
    <SelectionContext.Provider value={value}>
      {children}{" "}
    </SelectionContext.Provider>
  );
};
