import styles from "./Board.module.css";
import { useBoardContext } from "../../providers/BoardProvider";
import { AddNewColumn } from "./column/AddNewColumn";
import { Column } from "./column/Column";
import { useColumnsController } from "../../hooks/useColumnsController";

export function Board() {
  const { columns, updateBoardHandler } = useBoardContext();
  const { addColumn } = useColumnsController();

  const submitCol = (t: string) => {
    updateBoardHandler((prev) => addColumn(t, prev));
  };

  return (
    <main className={styles.board}>
      {columns.map((col, idx) => (
        <Column
          id={col.id}
          index={idx}
          key={col.id}
          title={col.title}
          total={columns.length}
        />
      ))}

      <AddNewColumn submitCol={submitCol} />
    </main>
  );
}
