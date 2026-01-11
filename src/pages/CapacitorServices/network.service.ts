import { Network } from '@capacitor/network';

export class NetworkService {
  private static online = true;

  // Inicializar servicio
  static async initialize(): Promise<void> {
    // Estado actual
    const status = await Network.getStatus();
    this.online = status.connected;

    // Escuchar cambios
    Network.addListener('networkStatusChange', status => {
      this.online = status.connected;
      console.log('Estado de red:', status.connected ? 'Online' : 'Offline');
      
      // Emitir evento personalizado
      window.dispatchEvent(new CustomEvent('networkChange', {
        detail: { online: status.connected }
      }));
    });
  }

  // Verificar conexión
  static isOnline(): boolean {
    return this.online;
  }

  // Tipo de conexión
  static async getConnectionType(): Promise<string> {
    const status = await Network.getStatus();
    return status.connectionType;
  }

  // Sync cuando haya conexión
  static async syncWhenOnline(callback: () => Promise<void>): Promise<void> {
    if (this.isOnline()) {
      await callback();
    } else {
      // Esperar a tener conexión
      const waitForConnection = () => {
        if (this.isOnline()) {
          callback();
        } else {
          setTimeout(waitForConnection, 5000);
        }
      };
      waitForConnection();
    }
  }
}