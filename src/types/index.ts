export interface Task {
  id: string;
  text: string;
  completed: boolean;
  createdAt: number;
  order: number;
}

export interface Column {
  id: string;
  title: string;
  order: number;
}

export type FilterStatus = "all" | "completed" | "incomplete";

export type TasksRecord = Record<string, Task[]>;
export type ID = string;

export type DnD_Direction = "left" | "right";
