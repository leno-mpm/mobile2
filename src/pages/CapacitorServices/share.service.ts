import { Share } from '@capacitor/share';
import { Filesystem, Directory } from '@capacitor/filesystem';

export class ShareService {
  // Exportar tareas como JSON
  static async exportTasksAsJSON(tasks: any[]): Promise<void> {
    const jsonData = JSON.stringify(tasks, null, 2);
    const fileName = `tasks_backup_${new Date().toISOString().split('T')[0]}.json`;
    
    // Guardar temporalmente
    await Filesystem.writeFile({
      path: fileName,
      data: jsonData,
      directory: Directory.Cache
    });

    // Compartir
    await Share.share({
      title: 'Backup de Tareas',
      text: 'Archivo JSON con todas tus tareas',
      url: `file://${fileName}`,
      dialogTitle: 'Exportar tareas'
    });
  }

  // Exportar como texto
  static async exportTasksAsText(tasks: any[]): Promise<void> {
    let text = '📋 LISTA DE TAREAS\n';
    text += `Fecha: ${new Date().toLocaleDateString()}\n\n`;
    
    tasks.forEach((task, index) => {
      text += `${index + 1}. ${task.title}\n`;
      text += `   📅 ${new Date(task.date).toLocaleDateString()}\n`;
      text += `   ✅ ${task.completed ? 'Completada' : 'Pendiente'}\n\n`;
    });

    await Share.share({
      title: 'Mis Tareas',
      text: text,
      dialogTitle: 'Compartir tareas'
    });
  }

  // Importar desde JSON (simplificado)
  static async importFromJSON(): Promise<any[]> {
    // En una implementación real, usarías un file picker
    // Esto es solo un esqueleto
    console.log('Importar desde JSON');
    return [];
  }
}