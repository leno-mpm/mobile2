import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonList,
  IonItem,
  IonLabel,
  IonIcon,
  IonButton,
  IonAlert
} from '@ionic/react';

import {
  informationCircleOutline,
  trashOutline,
  codeOutline
} from 'ionicons/icons';

import { useState } from 'react';
import { StorageService } from '../services/storage.service';

import './Tab3.css';

const Tab3: React.FC = () => {
  const [showAlert, setShowAlert] = useState(false);

  const clearAllData = async () => {
    await StorageService.clearAll();
    setShowAlert(false);
    window.location.reload();
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Ajustes</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen className="tab3-content">

        {/* Información */}
        <IonList inset>
          <IonItem lines="none">
            <IonIcon icon={informationCircleOutline} slot="start" />
            <IonLabel>
              <h2>Aplicación</h2>
              <p>Gestor de tareas con Ionic</p>
            </IonLabel>
          </IonItem>

          <IonItem>
            <IonIcon icon={codeOutline} slot="start" />
            <IonLabel>
              <h2>Versión</h2>
              <p>1.0.0</p>
            </IonLabel>
          </IonItem>
        </IonList>

        {/* Zona peligrosa */}
        <div className="danger-zone">
          <h3>Zona peligrosa</h3>

          <IonButton
            expand="block"
            color="danger"
            fill="outline"
            onClick={() => setShowAlert(true)}
          >
            <IonIcon icon={trashOutline} slot="start" />
            Borrar todas las tareas
          </IonButton>
        </div>

        <IonAlert
          isOpen={showAlert}
          onDidDismiss={() => setShowAlert(false)}
          header="Confirmar acción"
          message="¿Estás seguro de que deseas borrar todas las tareas? Esta acción no se puede deshacer."
          buttons={[
            {
              text: 'Cancelar',
              role: 'cancel'
            },
            {
              text: 'Borrar',
              role: 'destructive',
              handler: clearAllData
            }
          ]}
        />

      </IonContent>
    </IonPage>
  );
};

export default Tab3;

