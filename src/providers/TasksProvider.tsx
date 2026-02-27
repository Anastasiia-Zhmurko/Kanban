import React, { createContext, useContext, useMemo } from "react";
import type { TasksRecord } from "../types";
import { uid } from "../utils/helpers";
import { COLUMN_DEFAULT_ID } from "./BoardProvider";
import { useLocalStorage } from "../hooks/useLocalStorage";

interface TasksContext {
  tasks: TasksRecord;
  updateTasksHandler: React.Dispatch<React.SetStateAction<TasksRecord>>;
}

export const MIN_ORDER_NUMBER = 0;

const DefaultTaskData: TasksRecord = {
  [COLUMN_DEFAULT_ID]: [
    {
      id: uid(),
      text: "Default text",
      completed: false,
      createdAt: Date.now(),
      order: MIN_ORDER_NUMBER,
    },
  ],
};

const TasksContext = createContext<TasksContext | null>(null);

export const useTasksContext = () => {
  const ctx = useContext(TasksContext);
  if (!ctx)
    throw new Error("useTasksContext must be used inside TasksProvider");
  return ctx;
};

export const TasksProvider = ({ children }: { children: React.ReactNode }) => {
  const [tasks, setTasks] = useLocalStorage<TasksRecord>(
    "tasks",
    DefaultTaskData,
  );

  const value = useMemo<TasksContext>(
    () => ({
      tasks,
      updateTasksHandler: setTasks,
    }),
    [tasks, setTasks],
  );

  return (
    <TasksContext.Provider value={value}>{children} </TasksContext.Provider>
  );
};
