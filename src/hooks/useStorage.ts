import { useState, useEffect } from 'react';
import { StorageService } from '../services/storage.service';

export function useStorage() {
  const [tasks, setTasks] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Cargar tareas al inicio
  useEffect(() => {
    loadTasks();
  }, []);

  const loadTasks = async () => {
    setLoading(true);
    const savedTasks = await StorageService.loadTasks();
    setTasks(savedTasks);
    setLoading(false);
  };

  const saveTasks = async (newTasks: any[]) => {
    await StorageService.saveTasks(newTasks);
    setTasks(newTasks);
  };

  const addTask = async (task: any) => {
    const newTasks = [...tasks, task];
    await saveTasks(newTasks);
  };

  const updateTask = async (taskId: string, updates: any) => {
    const newTasks = tasks.map(task =>
      task.id === taskId ? { ...task, ...updates } : task
    );
    await saveTasks(newTasks);
  };

  return {
    tasks,
    loading,
    addTask,
    updateTask,
    saveTasks,
    loadTasks
  };
}