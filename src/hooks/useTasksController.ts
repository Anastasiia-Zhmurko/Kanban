import { useCallback } from "react";
import type { Task, TasksRecord } from "../types";
import { findTask, insertAt, uid } from "../utils/helpers";

export function useTasksController() {
  const addTask = useCallback(
    (text: string, columnId: string, prev: TasksRecord) => {
      const col = prev[columnId] ?? [];
      const maxOrder = col.reduce((m, t) => Math.max(m, t.order), -1);
      return {
        ...prev,
        [columnId]: [
          ...col,
          {
            text,
            id: uid(),
            completed: false,
            createdAt: Date.now(),
            order: maxOrder + 1,
          },
        ],
      };
    },
    [],
  );

  const deleteTask = useCallback((taskId: string, prev: TasksRecord) => {
    const found = findTask(prev, taskId);
    if (!found) return prev;
    const [, colId] = found;
    return { ...prev, [colId]: prev[colId].filter((t) => t.id !== taskId) };
  }, []);

  const editTask = useCallback(
    (taskId: string, text: string, prev: TasksRecord) => {
      const found = findTask(prev, taskId);
      if (!found) return prev;
      const [, colId] = found;
      return {
        ...prev,
        [colId]: prev[colId].map((t) => (t.id === taskId ? { ...t, text } : t)),
      };
    },
    [],
  );

  const toggleComplete = useCallback((taskId: string, prev: TasksRecord) => {
    const found = findTask(prev, taskId);
    if (!found) return prev;
    const [, colId] = found;
    return {
      ...prev,
      [colId]: prev[colId].map((t) =>
        t.id === taskId ? { ...t, completed: !t.completed } : t,
      ),
    };
  }, []);

  const moveTask = useCallback(
    (taskId: string, targetColId: string, prev: TasksRecord) => {
      const found = findTask(prev, taskId);
      if (!found) return prev;
      const [task, srcColId] = found;
      if (srcColId === targetColId) return prev;
      const target = prev[targetColId] ?? [];
      const maxOrder = target.reduce((m, t) => Math.max(m, t.order), -1);
      return {
        ...prev,
        [srcColId]: prev[srcColId].filter((t) => t.id !== taskId),
        [targetColId]: [
          ...target,
          { ...task, columnId: targetColId, order: maxOrder + 1 },
        ],
      };
    },
    [],
  );

  const reorderTask = useCallback(
    (
      taskId: string,
      targetColId: string,
      insertIndex: number,
      prev: TasksRecord,
    ) => {
      const found = findTask(prev, taskId);
      if (!found) return prev;
      const [task, srcColId] = found;
      const isSame = srcColId === targetColId;
      const srcWithout = prev[srcColId].filter((t) => t.id !== taskId);
      const targetBase = isSame ? srcWithout : (prev[targetColId] ?? []);
      const clamped = Math.max(0, Math.min(insertIndex, targetBase.length));
      const newTarget = insertAt(targetBase, { ...task }, clamped).map(
        (t, i) => ({ ...t, order: i }),
      );

      if (isSame) return { ...prev, [targetColId]: newTarget };
      return {
        ...prev,
        [srcColId]: srcWithout.map((t, i) => ({ ...t, order: i })),
        [targetColId]: newTarget,
      };
    },
    [],
  );

  const bulkDelete = useCallback((ids: string[], prev: TasksRecord) => {
    const set = new Set(ids);

    const next: TasksRecord = {};

    for (const [colId, tasks] of Object.entries(prev)) {
      const filtered = tasks.filter((t) => !set.has(t.id));
      next[colId] = filtered.length === tasks.length ? tasks : filtered;
    }
    return next;
  }, []);

  const bulkSetComplete = useCallback(
    (ids: string[], completed: boolean, prev: TasksRecord) => {
      const set = new Set(ids);

      const next: TasksRecord = {};
      for (const [colId, tasks] of Object.entries(prev)) {
        const hasAffected = tasks.some((t) => set.has(t.id));
        next[colId] = hasAffected
          ? tasks.map((t) => (set.has(t.id) ? { ...t, completed } : t))
          : tasks;
      }
      return next;
    },
    [],
  );

  const bulkMove = useCallback(
    (ids: string[], targetColId: string, prev: TasksRecord) => {
      const set = new Set(ids);

      const next = { ...prev };
      const moved: Task[] = [];
      for (const [colId, tasks] of Object.entries(prev)) {
        if (colId === targetColId) continue;
        const affected = tasks.filter((t) => set.has(t.id));
        if (!affected.length) continue;
        next[colId] = tasks.filter((t) => !set.has(t.id));
        moved.push(...affected);
      }
      const target = next[targetColId] ?? [];
      const maxOrder = target.reduce((m, t) => Math.max(m, t.order), -1);
      next[targetColId] = [
        ...target,
        ...moved.map((t, i) => ({
          ...t,
          columnId: targetColId,
          order: maxOrder + 1 + i,
        })),
      ];
      return next;
    },
    [],
  );

  return {
    addTask,
    editTask,
    moveTask,
    bulkMove,
    deleteTask,
    bulkDelete,
    reorderTask,
    toggleComplete,
    bulkSetComplete,
  };
}
