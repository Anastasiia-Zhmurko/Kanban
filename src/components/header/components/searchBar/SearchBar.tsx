import { useEffect, useState } from "react";

import styles from "./SearchBar.module.css";
import { emptyString } from "../../../../utils/helpers";
import { useSearchContext } from "../../../../providers/SearchProvider";

export const SearchBar = () => {
  const { searchString, searchHandler } = useSearchContext();
  const [query, setQuery] = useState<string>(searchString);

  const onSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const onClearHandler = () => {
    setQuery(emptyString);
    searchHandler(emptyString);
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      searchHandler(query);
    }, 1000);

    return () => clearTimeout(timeout);
  }, [query, searchHandler]);

  return (
    <div className={styles.searchWrapper}>
      <span className={styles.searchIcon}>⌕</span>
      <input
        className={styles.searchInput}
        placeholder="Search tasks…"
        value={query}
        onChange={onSearchChange}
        aria-label="Search tasks"
      />
      {query && (
        <button
          className={styles.clearBtn}
          onClick={onClearHandler}
          aria-label="Clear"
        >
          ✕
        </button>
      )}
    </div>
  );
};
