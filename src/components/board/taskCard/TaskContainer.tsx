import React, { memo, useCallback } from "react";
import styles from "./TaskCard.module.css";
import { useSelectionContext } from "../../../providers/SelectionProvider";
import { useTasksContext } from "../../../providers/TasksProvider";
import { useSelectionController } from "../../../hooks/useSelectionController";
import { TaskList } from "./TaskList";
import { useTasksController } from "../../../hooks/useTasksController";
import { useFilteredTasks } from "../../../hooks/useFilterdTasks";
import { useSearchContext } from "../../../providers/SearchProvider";
import { useFilterContext } from "../../../providers/FilterProvider";
import { AddNewTask } from "./components/AddNewTask";

interface Props {
  colId: string;
}
export const TaskContainer = memo(function TaskContainer({ colId }: Props) {
  const { searchString: searchQuery } = useSearchContext();
  const { filterStatus } = useFilterContext();
  const { selectedIds, selecthHandler } = useSelectionContext();

  const { isSelected, select, deselect } = useSelectionController();

  const { tasks, updateTasksHandler } = useTasksContext();
  const { addTask } = useTasksController();

  const onSubmitTask = useCallback(
    (t: string) => {
      updateTasksHandler((prev) => addTask(t, colId, prev));
    },
    [updateTasksHandler, addTask, colId],
  );

  const columnTasks = tasks[colId] ?? [];

  const filteredTasks = useFilteredTasks({
    tasks: columnTasks,
    searchQuery,
    filterStatus,
  });

  console.log(filteredTasks, "-filteredTasks");
  const allSelected =
    filteredTasks.length > 0 &&
    filteredTasks.every((t) => isSelected(t.id, selectedIds));

  const allSelectHandler = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const ids = filteredTasks.map((t) => t.id);
      selecthHandler((prev) =>
        e.target.checked ? select(ids, prev) : deselect(ids, prev),
      );
    },
    [filteredTasks, selecthHandler, select, deselect],
  );
  return (
    <>
      <label className={styles.selectAll}>
        <input
          type="checkbox"
          checked={allSelected}
          onChange={allSelectHandler}
        />
        <span>Select all ({filteredTasks.length})</span>
      </label>

      <TaskList tasks={filteredTasks} colId={colId} />
      <AddNewTask submitTask={onSubmitTask} />
    </>
  );
});
