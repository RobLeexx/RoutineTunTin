import { useEffect, useMemo, useState } from 'react';

import { Task, TaskDraft } from '../types/task';
import { getStorageItem, setStorageItem, storageKeys } from '../utils/storage';

function createTaskPayload(draft: TaskDraft): Task {
  const timestamp = new Date().toISOString();

  return {
    id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    title: draft.title.trim(),
    description: draft.description.trim() || undefined,
    completed: false,
    createdAt: timestamp,
    updatedAt: timestamp,
  };
}

export function useTasks() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const loadTasks = async () => {
      const savedTasks = await getStorageItem<Task[]>(storageKeys.tasks, []);
      setTasks(savedTasks);
      setIsReady(true);
    };

    void loadTasks();
  }, []);

  const persistTasks = async (nextTasks: Task[]) => {
    setTasks(nextTasks);
    await setStorageItem(storageKeys.tasks, nextTasks);
  };

  const addTask = async (draft: TaskDraft) => {
    const nextTasks = [createTaskPayload(draft), ...tasks];
    await persistTasks(nextTasks);
  };

  const updateTask = async (taskId: string, draft: TaskDraft) => {
    const nextTasks = tasks.map((task) =>
      task.id === taskId
        ? {
            ...task,
            title: draft.title.trim(),
            description: draft.description.trim() || undefined,
            updatedAt: new Date().toISOString(),
          }
        : task,
    );

    await persistTasks(nextTasks);
  };

  const deleteTask = async (taskId: string) => {
    const nextTasks = tasks.filter((task) => task.id !== taskId);
    await persistTasks(nextTasks);
  };

  const toggleTask = async (taskId: string) => {
    const nextTasks = tasks.map((task) =>
      task.id === taskId
        ? {
            ...task,
            completed: !task.completed,
            updatedAt: new Date().toISOString(),
          }
        : task,
    );

    await persistTasks(nextTasks);
  };

  const summary = useMemo(() => {
    const total = tasks.length;
    const completed = tasks.filter((task) => task.completed).length;
    const pending = total - completed;

    return { total, completed, pending };
  }, [tasks]);

  return {
    tasks,
    isReady,
    summary,
    addTask,
    updateTask,
    deleteTask,
    toggleTask,
  };
}

