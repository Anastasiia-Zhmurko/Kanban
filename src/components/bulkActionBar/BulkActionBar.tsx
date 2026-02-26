import React from "react";

import styles from "./BulkActionBar.module.css";
import { useBoardContext } from "../../providers/BoardProvider";
import { useSelectionContext } from "../../providers/SelectionProvider";
import { useTasksController } from "../../hooks/useTasksController";
import { useTasksContext } from "../../providers/TasksProvider";

export function BulkActionBar() {
  const { columns } = useBoardContext();
  const { selectedIds, selecthHandler } = useSelectionContext();
  const { bulkDelete, bulkSetComplete, bulkMove } = useTasksController();

  const { updateTasksHandler } = useTasksContext();

  if (selectedIds.length === 0) return null;

  const ids = [...selectedIds];
  const clear = () => selecthHandler([]);

  const handleBulkDelete = () => {
    if (
      window.confirm(
        `Delete ${selectedIds.length} task${selectedIds.length > 1 ? "s" : ""}?`,
      )
    ) {
      updateTasksHandler((prev) => bulkDelete(ids, prev));
      clear();
    }
  };

  const handleMove = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const colId = e.target.value;
    if (colId) {
      updateTasksHandler((prev) => bulkMove(ids, colId, prev));
      clear();
      e.target.value = "";
    }
  };

  const bulkSetCompleteHandler = (isCompleted: boolean) => {
    updateTasksHandler((prev) => bulkSetComplete(ids, isCompleted, prev));
  };

  return (
    <div className={styles.bar}>
      <span className={styles.count}>{selectedIds.length} selected</span>
      <button
        className={styles.btn}
        onClick={() => bulkSetCompleteHandler(true)}
      >
        ✓ Complete
      </button>
      <button
        className={styles.btn}
        onClick={() => bulkSetCompleteHandler(false)}
      >
        ○ Active
      </button>
      <select
        className={styles.moveSelect}
        defaultValue=""
        onChange={handleMove}
      >
        <option value="" disabled>
          Move to…
        </option>
        {columns.map((col) => (
          <option key={col.id} value={col.id}>
            {col.title}
          </option>
        ))}
      </select>
      <button
        className={`${styles.btn} ${styles.danger}`}
        onClick={handleBulkDelete}
      >
        ✕ Delete
      </button>
      <button className={`${styles.btn} ${styles.ghost}`} onClick={clear}>
        Deselect
      </button>
    </div>
  );
}
