import { useState, memo } from "react";

import styles from "./Column.module.css";
import { useBoardContext } from "../../../providers/BoardProvider";
import { useColumnsController } from "../../../hooks/useColumnsController";
import type { DnD_Direction } from "../../../types";
import { TaskContainer } from "../taskCard/TaskContainer";

interface Props {
  index: number;
  total: number;
  id: string;
  title: string;
}

export const Column = memo(function Column({ id, title, index, total }: Props) {
  const { updateBoardHandler } = useBoardContext();
  const { renameColumn, deleteColumn, moveColumn } = useColumnsController();

  const [editingTitle, setEditingTitle] = useState(false);
  const [titleDraft, setTitleDraft] = useState(title);

  const abortEditing = () => {
    setTitleDraft(title);
    setEditingTitle(false);
  };

  const commitTitle = () => {
    const t = titleDraft.trim();
    if (t && t !== title) {
      updateBoardHandler((prev) => renameColumn(id, t, prev));
    } else abortEditing();
  };

  const confirmDelete = () => {
    if (window.confirm(`Delete "${title}" and all its tasks?`))
      updateBoardHandler((prev) => deleteColumn(id, prev));
  };

  const onMoveHandler = (direction: DnD_Direction) => {
    updateBoardHandler((prev) => moveColumn(id, direction, prev));
  };

  const onKeyDownHandler = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") commitTitle();
    if (e.key === "Escape") {
      setTitleDraft(title);
      setEditingTitle(false);
    }
  };

  return (
    <div className={styles.column}>
      <div className={styles.header}>
        {editingTitle ? (
          <input
            className={styles.titleInput}
            value={titleDraft}
            onChange={(e) => setTitleDraft(e.target.value)}
            onBlur={commitTitle}
            onKeyDown={onKeyDownHandler}
          />
        ) : (
          <h2
            className={styles.title}
            onDoubleClick={() => setEditingTitle(true)}
          >
            {title}
          </h2>
        )}

        <div className={styles.headerBtns}>
          {index > 0 && (
            <button
              className={styles.iconBtn}
              onClick={() => onMoveHandler("left")}
            >
              ←
            </button>
          )}
          {index < total - 1 && (
            <button
              className={styles.iconBtn}
              onClick={() => onMoveHandler("right")}
            >
              →
            </button>
          )}
          <button
            className={styles.iconBtn}
            onClick={() => setEditingTitle(true)}
            title="Rename"
          >
            ✎
          </button>
          <button
            className={`${styles.iconBtn} ${styles.danger}`}
            onClick={confirmDelete}
            title="Delete"
          >
            ✕
          </button>
        </div>
      </div>
      <TaskContainer colId={id} />
    </div>
  );
});
