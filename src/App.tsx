import { Board } from "./components/board/Board";
import { BulkActionBar } from "./components/bulkActionBar/BulkActionBar";
import { Header } from "./components/header/Header";
import "./index.css";
import { BoardProvider } from "./providers/BoardProvider";
import { FilterProvider } from "./providers/FilterProvider";
import { SearchProvider } from "./providers/SearchProvider";
import { SelectionProvider } from "./providers/SelectionProvider";
import { TasksProvider } from "./providers/TasksProvider";

export default function App() {
  return (
    <BoardProvider>
      <SelectionProvider>
        <TasksProvider>
          <SearchProvider>
            <FilterProvider>
              <Header />
              <BulkActionBar />
              <Board />
            </FilterProvider>
          </SearchProvider>
        </TasksProvider>
      </SelectionProvider>
    </BoardProvider>
  );
}
