import {
  IonModal,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonButton,
  IonItem,
  IonInput,
  IonFooter,
  IonButtons,
  IonIcon
} from '@ionic/react';

import { closeOutline } from 'ionicons/icons';
import { useState } from 'react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSave: (title: string) => void;
}

const AddTaskModal: React.FC<Props> = ({ isOpen, onClose, onSave }) => {
  const [title, setTitle] = useState('');

  const handleSave = () => {
    if (!title.trim()) return;
    onSave(title);
    setTitle('');
  };

  return (
    <IonModal
      isOpen={isOpen}
      onDidDismiss={onClose}
      backdropDismiss
    >
      <IonHeader>
        <IonToolbar>

          
          <IonButtons slot="start">
            <IonButton onClick={onClose}>
              <IonIcon icon={closeOutline} />
            </IonButton>
          </IonButtons>

          <IonTitle>Nueva tarea</IonTitle>

        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">
        <IonItem>
          <IonInput
            label="Tarea"
            placeholder="Ej: Estudiar para el examen"
            value={title}
            onIonInput={e => setTitle(e.detail.value!)}
          />
        </IonItem>
      </IonContent>

      <IonFooter>
        <IonToolbar>
          <IonButton expand="block" onClick={handleSave}>
            Guardar
          </IonButton>
        </IonToolbar>
      </IonFooter>
    </IonModal>
  );
};

export default AddTaskModal;


