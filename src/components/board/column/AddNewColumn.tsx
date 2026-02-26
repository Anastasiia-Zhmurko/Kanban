import { useRef, useState } from "react";
import styles from "./Column.module.css";
import { emptyString } from "../../../utils/helpers";

interface Props {
  submitCol: (t: string) => void;
}
export const AddNewColumn = ({ submitCol }: Props) => {
  const [addingCol, setAddingCol] = useState(false);
  const [colTitle, setColTitle] = useState(emptyString);

  const inputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = () => {
    const trimmed = colTitle.trim();

    if (!trimmed) return;

    submitCol(trimmed);
    setColTitle(emptyString);
    setAddingCol(false);
  };

  const handleCancel = () => {
    setColTitle(emptyString);
    setAddingCol(false);
  };

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setColTitle(e.target.value);

  const handleOnKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") handleSubmit();
    if (e.key === "Escape") handleCancel();
  };

  return (
    <div className={styles.addColArea}>
      {addingCol ? (
        <div className={styles.addColForm}>
          <input
            autoFocus
            ref={inputRef}
            value={colTitle}
            placeholder="Column name…"
            onChange={handleOnChange}
            onKeyDown={handleOnKeyDown}
            className={styles.addColInput}
          />
          <div className={styles.addColBtns}>
            <button className={styles.btnPrimary} onClick={handleSubmit}>
              Add
            </button>
            <button className={styles.btnGhost} onClick={handleCancel}>
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <button className={styles.btnAddCol} onClick={() => setAddingCol(true)}>
          + Add column
        </button>
      )}
    </div>
  );
};
