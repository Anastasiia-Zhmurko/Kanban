import { useCallback } from "react";

export const useSelectionController = () => {
  const isSelected = useCallback(
    (id: string, selectedIds: string[]) => selectedIds.includes(id),
    [],
  );

  const select = useCallback((ids: string[], prev: string[]) => {
    return [...prev, ...ids];
  }, []);

  const deselect = useCallback((ids: string[], prev: string[]) => {
    return prev.filter((item) => !ids.includes(item));
  }, []);

  return { isSelected, select, deselect };
};
