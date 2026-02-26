# Kanban Todo

A responsive Kanban table built with **React + TypeScript + Vite**.

## Features

- **Columns** — add, delete, rename, reorder (← →)
- **Tasks** — add, delete, inline edit (double-click), mark complete
- **Drag & Drop** — reorder tasks within a column, move tasks between columns
- **Multi-select** — checkbox per task, select-all per column
- **Bulk actions** — mark complete / incomplete, move to column, delete
- **Search** — filter tasks by name with highlight of matched text
- **Filter** — All / Active / Done
- **Persistence** — table state saved to `localStorage`
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
├── types/             # TypeScript interfaces (Task, Column, etc.)
├── utils/             # Pure helpers (uid, reorder, insertAt)
├── hooks/
│   ├── useLocalStorage.ts   # Generic localStorage state
│   ├── useSelection.ts      # Multi-select logic
│   ├── useBoard.ts          # All table business logic
│   └── useFilteredTasks.ts  # Filter + search per column
└── components/
    ├── SearchBar/
    ├── FilterBar/
    ├── BulkActionBar/
    ├── TaskCard/        # Card with inline edit, drag handle, highlight
    ├── Column/          # Column with task list and DnD zones
    └── Table/           # Table layout + add column
```

## Architecture decisions

- **All business logic in `useBoard`** — components are presentational, they only call callbacks.
- **`useSelection` is separate** — selection state is UI-only, not part of table state.
- **CSS Modules** — scoped styles per component, global tokens in `index.css`.
- **No external UI libraries** — all components built from scratch as per requirements.
- **Native HTML5 Drag & Drop** — used for task reordering and cross-column moves.
