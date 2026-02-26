# Kanban Todo

A responsive Kanban board built with **React + TypeScript + Vite**.

## Features

- **Columns** — add, delete, rename, reorder (← →)
- **Tasks** — add, delete, inline edit (double-click), mark complete
- **Drag & Drop** — reorder tasks within a column, move tasks between columns
- **Multi-select** — checkbox per task, select-all per column
- **Bulk actions** — mark complete / incomplete, move to column, delete
- **Search** — filter tasks by name with highlight of matched text
- **Filter** — All / Active / Done
- **Persistence** — board state saved to `localStorage`
- **Responsive** — works on desktop and mobile

## Getting started

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Project structure

```
src/
├── types/
│   └── index.ts                  # Task, Column, TasksRecord, FilterStatus, DnD_Direction
│
├── utils/
│   └── helpers.ts                # uid, reorder, insertAt, findTask
│
├── hooks/
│   ├── useLocalStorage.ts        # Generic localStorage state persistence
│   ├── useColumnsController.ts   # Column CRUD — add, delete, rename, move
│   ├── useTasksController.ts     # Task CRUD — add, delete, edit, toggle, reorder, bulk actions
│   ├── useSelectionController.ts # Multi-select — select, deselect, isSelected
│   └── useFilterdTasks.ts        # Filter + search per column
│
├── providers/
│   ├── BoardProvider.tsx         # Columns state + actions (orchestrator)
│   ├── TasksProvider.tsx         # Tasks state — Map<columnId, Task[]> via localStorage
│   ├── SelectionProvider.tsx     # Selected task IDs state
│   ├── SearchProvider.tsx        # Search query state
│   └── FilterProvider.tsx        # Filter status state (all / active / done)
│
└── components/
    ├── board/
    │   ├── column/
    │   │   ├── Column.tsx            # Column layout — header, rename, move, delete
    │   │   ├── Column.module.css
    │   │   └── AddNewColumn.tsx      # Add column form
    │   ├── taskCard/
    │   │   ├── TaskCard.tsx          # Task card — complete, select, inline edit, drag
    │   │   ├── TaskCard.module.css
    │   │   ├── TaskContainer.tsx     # Per-column container — filtering, select-all
    │   │   ├── TaskList.tsx          # Renders task list with per-slot DnD drop handlers, DnD drop zone
    │   │   └── components/
    │   │       ├── AddNewTask.tsx    # Add task form
    │   │       └── HighlightText.tsx # Highlights search matches in task text
    │   ├── Board.tsx                 # Board layout — renders columns, bulkActionPanel, Add new column button

    │   └── Board.module.css
    └── bulkActionBar/
        ├── BulkActionBar.tsx         # Bulk actions — complete, move, delete selected tasks
        └── BulkActionBar.module.css
```

## Architecture

The app is built around a **providers + controllers** pattern:

**Providers** own the state and expose it via context. Each provider is responsible for one slice:

| Provider | Owns |
|---|---|
| `BoardProvider` | Columns — `Column[]` |
| `TasksProvider` | Tasks — `Record<columnId, Task[]>` |
| `SelectionProvider` | Selected task IDs — `Set<string>` |
| `SearchProvider` | Search query string |
| `FilterProvider` | Active filter status |

**Controllers** are pure hooks containing business logic. They receive state as arguments and return a new state — no side effects, easy to test:

| Controller | Responsibility |
|---|---|
| `useColumnsController` | add / delete / rename / move columns |
| `useTasksController` | add / delete / edit / toggle / reorder / bulk actions |
| `useSelectionController` | select / deselect / isSelected |

**Components** are split by responsibility:

- `TaskContainer` — knows about filtering and selection for one column
- `TaskList` — pure render list with DnD drop slots per task
- `TaskCard` — reads search and selection from context directly, no prop drilling
