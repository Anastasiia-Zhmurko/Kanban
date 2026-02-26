import { useFilterContext } from "../../../../providers/FilterProvider";
import type { FilterStatus } from "../../../../types";
import { emptyString } from "../../../../utils/helpers";
import styles from "./FilterBar.module.css";

const FILTERS: { value: FilterStatus; label: string }[] = [
  { value: "all", label: "All" },
  { value: "incomplete", label: "Active" },
  { value: "completed", label: "Done" },
];

export const FilterBar = () => {
  const { filterStatus, filterHandler } = useFilterContext();
  return (
    <div className={styles.filterBar}>
      {FILTERS.map((f) => (
        <button
          key={f.value}
          className={`${styles.filterBtn} ${filterStatus === f.value ? styles.active : emptyString}`}
          onClick={() => filterHandler(f.value)}
        >
          {f.label}
        </button>
      ))}
    </div>
  );
};
