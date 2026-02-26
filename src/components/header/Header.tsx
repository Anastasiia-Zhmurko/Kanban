import { FilterBar } from "./components/filterBar/FilterBar";
import { SearchBar } from "./components/searchBar/SearchBar";
import styles from "./Header.module.css";
export function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <span className={styles.logoIcon}>◈</span>
        <span className={styles.logoText}>Board</span>
      </div>
      <div className={styles.controls}>
        <SearchBar />
        <FilterBar />
      </div>
    </header>
  );
}
