import { Preferences } from '@capacitor/preferences';
import { Task } from '../Tab2'; // Importar interfaces
import { Category } from '../Tab3';

export class StorageService {
  // Guardar tareas
  static async saveTasks(tasks: Task[]): Promise<void> {
    await Preferences.set({
      key: 'tasks',
      value: JSON.stringify(tasks)
    });
  }

  // Cargar tareas
  static async loadTasks(): Promise<Task[]> {
    const { value } = await Preferences.get({ key: 'tasks' });
    return value ? JSON.parse(value) : [];
  }

  // Guardar categorías
  static async saveCategories(categories: Category[]): Promise<void> {
    await Preferences.set({
      key: 'categories',
      value: JSON.stringify(categories)
    });
  }

  // Cargar categorías
  static async loadCategories(): Promise<Category[]> {
    const { value } = await Preferences.get({ key: 'categories' });
    return value ? JSON.parse(value) : [];
  }

  // Guardar configuraciones
  static async saveSettings(settings: any): Promise<void> {
    await Preferences.set({
      key: 'appSettings',
      value: JSON.stringify(settings)
    });
  }

  // Cargar configuraciones
  static async loadSettings(): Promise<any> {
    const { value } = await Preferences.get({ key: 'appSettings' });
    return value ? JSON.parse(value) : {};
  }

  // Limpiar todo (logout)
  static async clearAll(): Promise<void> {
    await Preferences.clear();
  }
}