import React, { memo, useCallback, useMemo } from "react";
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

  console.log(tasks, "--tasks");

  const onSubmitTask = useCallback(
    (t: string) => {
      updateTasksHandler((prev) => addTask(t, colId, prev));
    },
    [updateTasksHandler],
  );

  const columnTasks = tasks[colId] ?? [];

  const filteredTasks = useFilteredTasks({
    tasks: columnTasks,
    searchQuery,
    filterStatus,
  });

  const tasksByColId = useMemo(() => {
    return {
      tasks: filteredTasks,
      ids: filteredTasks.map((item) => item?.id) || [],
    };
  }, [filteredTasks]);

  const allSelected =
    tasksByColId.tasks.length > 0 &&
    tasksByColId.tasks.every((t) => isSelected(t.id, selectedIds));

  const allSelectHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    selecthHandler((prev) =>
      e.target.checked
        ? select(tasksByColId.ids, prev)
        : deselect(tasksByColId.ids, prev),
    );
  };

  return (
    <>
      <label className={styles.selectAll}>
        <input
          type="checkbox"
          checked={allSelected}
          onChange={allSelectHandler}
        />
        <span>Select all ({tasksByColId.tasks.length})</span>
      </label>

      <TaskList tasks={tasksByColId.tasks} colId={colId} />
      <AddNewTask submitTask={onSubmitTask} />
    </>
  );
});
