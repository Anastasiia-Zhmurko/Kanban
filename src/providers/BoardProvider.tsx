import React, { createContext, useContext, useMemo } from "react";
import type { Column } from "../types";
import { uid } from "../utils/helpers";
import { useLocalStorage } from "../hooks/useLocalStorage";

interface BoardContext {
  columns: Column[];
  updateBoardHandler: React.Dispatch<React.SetStateAction<Column[]>>;
}

export const COLUMN_DEFAULT_ID = uid();
const COLUMN_DEFAULT_TITLE = "To Do";

const DefaultBoardData: Column[] = [
  {
    id: COLUMN_DEFAULT_ID,
    title: COLUMN_DEFAULT_TITLE,
    order: 0,
  },
];

const BoardContext = createContext<BoardContext | null>(null);

export const useBoardContext = () => {
  const ctx = useContext(BoardContext);
  if (!ctx)
    throw new Error("useBoardContext must be used inside BoardProvider");
  return ctx;
};

export const BoardProvider = ({ children }: { children: React.ReactNode }) => {
  const [board, setBoard] = useLocalStorage<Column[]>(
    "board",
    DefaultBoardData,
  );

  const value = useMemo<BoardContext>(
    () => ({
      columns: board,
      updateBoardHandler: setBoard,
    }),
    [board, setBoard],
  );

  return (
    <BoardContext.Provider value={value}>{children} </BoardContext.Provider>
  );
};
