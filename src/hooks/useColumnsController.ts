import { useCallback } from "react";
import { reorder, uid } from "../utils/helpers";
import type { Column, DnD_Direction } from "../types";

export function useColumnsController() {
  const addColumn = useCallback((title: string, prev: Column[]): Column[] => {
    const maxOrder = prev.reduce((m, c) => Math.max(m, c.order), -1);
    return [...prev, { id: uid(), title, order: maxOrder + 1 }];
  }, []);

  const deleteColumn = useCallback(
    (columnId: string, prev: Column[]): Column[] => {
      return prev.filter((c) => c.id !== columnId);
    },
    [],
  );

  const renameColumn = useCallback(
    (columnId: string, title: string, prev: Column[]): Column[] => {
      return prev.map((c) => (c.id === columnId ? { ...c, title } : c));
    },
    [],
  );

  const moveColumn = useCallback(
    (columnId: string, direction: DnD_Direction, prev: Column[]): Column[] => {
      const sorted = prev.slice().sort((a, b) => a.order - b.order);
      const idx = sorted.findIndex((c) => c.id === columnId);
      const targetIdx = direction === "left" ? idx - 1 : idx + 1;
      if (targetIdx < 0 || targetIdx >= sorted.length) return prev;
      return reorder(sorted, idx, targetIdx).map((col, i) => ({
        ...col,
        order: i,
      }));
    },
    [],
  );

  return { addColumn, renameColumn, deleteColumn, moveColumn };
}
