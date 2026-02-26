import { memo } from "react";
import type { Task } from "../../../types";
import { TaskCard } from "./TaskCard";
import styles from "./TaskCard.module.css";
import { useTasksContext } from "../../../providers/TasksProvider";
import { useTasksController } from "../../../hooks/useTasksController";

interface Props {
  tasks: Task[];
  colId: string;
}

export const TaskList = memo(function TaskList({ tasks, colId }: Props) {
  const { updateTasksHandler } = useTasksContext();
  const { reorderTask } = useTasksController();

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
  };

  const handleDropOnSlot = (e: React.DragEvent, insertIndex: number) => {
    e.preventDefault();
    e.stopPropagation();
    const taskId = e.dataTransfer.getData("taskId");
    if (taskId) {
      updateTasksHandler((prev) =>
        reorderTask(taskId, colId, insertIndex, prev),
      );
    }
  };

  return !tasks.length ? (
    <div
      className={styles.empty}
      onDragOver={handleDragOver}
      onDrop={(e) => handleDropOnSlot(e, 0)}
    >
      No tasks
    </div>
  ) : (
    tasks.map((t, idx) => (
      <div
        key={t.id}
        className={styles.taskList}
        onDragOver={handleDragOver}
        onDrop={(e) => handleDropOnSlot(e, idx)}
      >
        <TaskCard text={t.text} completed={t.completed} id={t.id} />
      </div>
    ))
  );
});
