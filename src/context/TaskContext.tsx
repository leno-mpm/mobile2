import { createContext, useContext, useEffect, useState } from 'react';
import { Task } from '../models/Task';
import { StorageService } from '../services/storage.service';

interface TaskContextType {
  tasks: Task[];
  addTask: (title: string) => void;
  toggleTask: (id: string) => void;
  clearTasks: () => void;
}

const TaskContext = createContext<TaskContextType | undefined>(undefined);

export const TaskProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [tasks, setTasks] = useState<Task[]>([]);

  // cargar una sola vez
  useEffect(() => {
    const load = async () => {
      const data = await StorageService.loadTasks();
      setTasks(data);
    };
    load();
  }, []);

  // guardar cada cambio
  useEffect(() => {
    StorageService.saveTasks(tasks);
  }, [tasks]);

  const addTask = (title: string) => {
    const newTask: Task = {
      id: Date.now().toString(),
      title,
      completed: false,
      createdAt: new Date().toISOString()
    };
    setTasks(prev => [...prev, newTask]);
  };

  const toggleTask = (id: string) => {
    setTasks(prev =>
      prev.map(t =>
        t.id === id ? { ...t, completed: !t.completed } : t
      )
    );
  };

  const clearTasks = () => {
    setTasks([]);
    StorageService.clearAll();
  };

  return (
    <TaskContext.Provider value={{ tasks, addTask, toggleTask, clearTasks }}>
      {children}
    </TaskContext.Provider>
  );
};

export const useTasks = () => {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error('useTasks debe usarse dentro de TaskProvider');
  }
  return context;
};
