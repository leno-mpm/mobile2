import { Preferences } from '@capacitor/preferences';
import { Task } from '../models/Task';
import { Category } from '../models/Category';

export class StorageService {

  static async saveTasks(tasks: Task[]): Promise<void> {
    await Preferences.set({
      key: 'tasks',
      value: JSON.stringify(tasks)
    });
  }

  static async loadTasks(): Promise<Task[]> {
    const { value } = await Preferences.get({ key: 'tasks' });
    return value ? JSON.parse(value) : [];
  }

  static async saveCategories(categories: Category[]): Promise<void> {
    await Preferences.set({
      key: 'categories',
      value: JSON.stringify(categories)
    });
  }

  static async loadCategories(): Promise<Category[]> {
    const { value } = await Preferences.get({ key: 'categories' });
    return value ? JSON.parse(value) : [];
  }

  static async saveSettings(settings: any): Promise<void> {
    await Preferences.set({
      key: 'appSettings',
      value: JSON.stringify(settings)
    });
  }

  static async loadSettings(): Promise<any> {
    const { value } = await Preferences.get({ key: 'appSettings' });
    return value ? JSON.parse(value) : {};
  }

  static async clearAll(): Promise<void> {
    await Preferences.clear();
  }
}
