import { useState, useEffect } from 'react';
import { NotificationService } from '../services/notifications.service';

export function useNotifications() {
  const [permissionGranted, setPermissionGranted] = useState(false);

  // Solicitar permisos al montar
  useEffect(() => {
    checkPermissions();
  }, []);

  const checkPermissions = async () => {
    const granted = await NotificationService.requestPermissions();
    setPermissionGranted(granted);
  };

  const scheduleReminder = async (task: any) => {
    if (!permissionGranted) {
      const granted = await NotificationService.requestPermissions();
      if (!granted) {
        alert('Se necesitan permisos para recordatorios');
        return;
      }
    }

    await NotificationService.scheduleTaskReminder(task);
  };

  const cancelReminder = async (taskId: string) => {
    await NotificationService.cancelNotification(taskId);
  };

  return {
    permissionGranted,
    scheduleReminder,
    cancelReminder,
    requestPermissions: checkPermissions
  };
}