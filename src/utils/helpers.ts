import type { ID, Task, TasksRecord } from "../types";

export function reorder<T>(list: T[], from: number, to: number): T[] {
  const result = [...list];
  const [removed] = result.splice(from, 1);
  result.splice(to, 0, removed);
  return result;
}

export function insertAt<T>(list: T[], item: T, index: number): T[] {
  const result = [...list];
  result.splice(index, 0, item);
  return result;
}

export function uid(): ID {
  return crypto.randomUUID();
}

export const emptyString = "";

export function findTask(
  record: TasksRecord,
  taskId: string,
): [Task, string] | null {
  for (const [columnId, tasks] of Object.entries(record)) {
    const task = tasks.find((t) => t.id === taskId);
    if (task) return [task, columnId];
  }
  return null;
}
