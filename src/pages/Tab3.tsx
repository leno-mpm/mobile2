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
import { useTasks } from '../context/TaskContext';

import './Tab3.css';

const Tab3: React.FC = () => {
  const { clearTasks } = useTasks();
  const [showAlert, setShowAlert] = useState(false);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Ajustes</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen className="tab3-content">

        <IonList inset>
          <IonItem>
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
          message="¿Estás seguro de que deseas borrar todas las tareas?"
          buttons={[
            { text: 'Cancelar', role: 'cancel' },
            {
              text: 'Borrar',
              role: 'destructive',
              handler: clearTasks
            }
          ]}
        />

      </IonContent>
    </IonPage>
  );
};

export default Tab3;


