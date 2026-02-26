import { useMemo } from "react";
import type { FilterStatus, Task } from "../types";

interface Props {
  tasks: Task[];
  searchQuery: string;
  filterStatus: FilterStatus;
}
export const useFilteredTasks = (props: Props): Task[] => {
  const { tasks, filterStatus, searchQuery } = props;

  return useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return tasks
      .filter((t) => {
        if (filterStatus === "completed" && !t.completed) return false;
        if (filterStatus === "incomplete" && t.completed) return false;
        if (q && !t.text.toLowerCase().includes(q)) return false;
        return true;
      })
      .sort((a, b) => a.order - b.order);
  }, [tasks, filterStatus, searchQuery]);
};
