import { memo, useEffect, useRef, useState } from "react";
import styles from "./TaskCard.module.css";
import type { Task } from "../../../types";
import { useSearchContext } from "../../../providers/SearchProvider";
import { useTasksController } from "../../../hooks/useTasksController";
import { useTasksContext } from "../../../providers/TasksProvider";
import { useSelectionController } from "../../../hooks/useSelectionController";
import { useSelectionContext } from "../../../providers/SelectionProvider";
import { HighlightText } from "./components/HighlightText";

export const TaskCard = memo(function TaskCard({
  id,
  text,
  completed,
}: Omit<Task, "createdAt" | "order">) {
  const [draft, setDraft] = useState(text);
  const [editing, setEditing] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const { searchString } = useSearchContext();
  const { updateTasksHandler } = useTasksContext();

  const { editTask, deleteTask, toggleComplete } = useTasksController();
  const { isSelected, select, deselect } = useSelectionController();
  const { selectedIds, selecthHandler } = useSelectionContext();

  const selected = isSelected(id, selectedIds);

  const onEditTask = (id: string, t: string) => {
    updateTasksHandler((prev) => editTask(id, t, prev));
  };

  const editModeHandler = () => {
    setDraft(text);
    setEditing(true);
  };

  const selectHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    selecthHandler((prev) =>
      e.target.checked ? select([id], prev) : deselect([id], prev),
    );
  };

  const completeStatusHandler = () => {
    updateTasksHandler((prev) => toggleComplete(id, prev));
  };

  const onKeyDownHandler = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") commitEdit();
    if (e.key === "Escape") {
      setDraft(text);
      setEditing(false);
    }
  };

  const deleteHandler = () => {
    updateTasksHandler((prev) => deleteTask(id, prev));
  };

  const commitEdit = () => {
    const trimmed = draft.trim();
    if (trimmed && trimmed !== text) onEditTask(id, trimmed);
    else setDraft(text);
    setEditing(false);
  };

  const handleDragStart = (e: React.DragEvent) => {
    e.dataTransfer.setData("taskId", id);
    e.dataTransfer.effectAllowed = "move";
  };

  useEffect(() => {
    if (editing) inputRef.current?.focus();
  }, [editing]);

  return (
    <div
      draggable
      onDragStart={handleDragStart}
      className={`${styles.card} ${completed ? styles.completed : ""} ${selected ? styles.selected : ""}`}
    >
      <div className={styles.row}>
        <input
          type="checkbox"
          checked={selected}
          title="Select task"
          aria-label="Select task"
          className={styles.check}
          onChange={selectHandler}
        />
        <input
          type="checkbox"
          checked={completed}
          title="Toggle complete"
          aria-label="Toggle complete"
          onChange={completeStatusHandler}
          className={`${styles.check} ${completed ? styles.completed : ""}`}
        />
        {editing ? (
          <input
            ref={inputRef}
            value={draft}
            onBlur={commitEdit}
            onKeyDown={onKeyDownHandler}
            className={styles.editInput}
            onChange={(e) => setDraft(e.target.value)}
          />
        ) : (
          <span
            className={styles.text}
            onDoubleClick={editModeHandler}
            title="Double-click to edit"
          >
            <HighlightText text={text!} query={searchString} />
          </span>
        )}

        <div className={styles.actions}>
          <button
            className={styles.deleteBtn}
            onClick={deleteHandler}
            aria-label="Delete task"
          >
            ✕
          </button>
        </div>
      </div>
    </div>
  );
});
