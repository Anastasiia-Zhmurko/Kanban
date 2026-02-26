import { useRef, useState } from "react";
import styles from "../TaskCard.module.css";
import { emptyString } from "../../../../utils/helpers";

interface Props {
  submitTask: (t: string) => void;
}

export const AddNewTask = ({ submitTask }: Props) => {
  const [addingTask, setAddingTask] = useState(false);
  const [newText, setNewText] = useState(emptyString);

  const addRef = useRef<HTMLInputElement>(null);

  const handleSubmit = () => {
    const trimmed = newText.trim();

    if (!trimmed) return;

    submitTask(trimmed);
    setNewText(emptyString);
    setAddingTask(false);
  };

  const handleCancel = () => {
    setNewText(emptyString);
    setAddingTask(false);
  };

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setNewText(e.target.value);

  const handleOnKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") handleSubmit();
    if (e.key === "Escape") handleCancel();
  };

  return (
    <div className={styles.footer}>
      {addingTask ? (
        <>
          <input
            ref={addRef}
            autoFocus
            className={styles.addInput}
            placeholder="Task description…"
            value={newText}
            onChange={handleOnChange}
            onKeyDown={handleOnKeyDown}
          />
          <div className={styles.addFormBtns}>
            <button className={styles.btnPrimary} onClick={handleSubmit}>
              Add
            </button>
            <button className={styles.btnGhost} onClick={handleCancel}>
              Cancel
            </button>
          </div>
        </>
      ) : (
        <button
          className={styles.btnAddTask}
          onClick={() => setAddingTask(true)}
        >
          + Add task
        </button>
      )}
    </div>
  );
};
