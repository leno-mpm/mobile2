import { LocalNotifications } from '@capacitor/local-notifications';
import { PushNotifications } from '@capacitor/push-notifications';
import { Device } from '@capacitor/device';

export class NotificationService {
  // Solicitar permisos
  static async requestPermissions(): Promise<boolean> {
    try {
      const { display } = await LocalNotifications.requestPermissions();
      return display === 'granted';
    } catch (error) {
      console.error('Error solicitando permisos:', error);
      return false;
    }
  }

  // Programar recordatorio de tarea
  static async scheduleTaskReminder(task: {
    id: string;
    title: string;
    date: Date;
    time?: string;
  }): Promise<void> {
    const notificationTime = new Date(task.date);
    
    // Si tiene hora específica, ajustar
    if (task.time) {
      const [hours, minutes] = task.time.split(':').map(Number);
      notificationTime.setHours(hours, minutes);
    }

    await LocalNotifications.schedule({
      notifications: [{
        title: '📅 Recordatorio de tarea',
        body: task.title,
        id: parseInt(task.id),
        schedule: { at: notificationTime },
        smallIcon: 'ic_stat_icon',
        largeIcon: 'ic_launcher',
        extra: { taskId: task.id }
      }]
    });
  }

  // Cancelar recordatorio
  static async cancelNotification(taskId: string): Promise<void> {
    await LocalNotifications.cancel({
      notifications: [{ id: parseInt(taskId) }]
    });
  }

  // Configurar push notifications (opcional)
  static async setupPushNotifications(): Promise<void> {
    // Registrar para push
    await PushNotifications.register();

    // Escuchar registros exitosos
    PushNotifications.addListener('registration', token => {
      console.log('Token de push:', token.value);
      // Enviar token a tu servidor aquí
    });

    // Escuchar errores
    PushNotifications.addListener('registrationError', error => {
      console.error('Error en registro push:', error);
    });

    // Escuchar notificaciones recibidas
    PushNotifications.addListener('pushNotificationReceived', notification => {
      console.log('Notificación recibida:', notification);
    });
  }

  // Obtener todas las notificaciones programadas
  static async getScheduledNotifications(): Promise<any[]> {
    const { notifications } = await LocalNotifications.getPending();
    return notifications;
  }
}