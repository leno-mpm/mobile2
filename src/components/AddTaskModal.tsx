import {
  IonModal,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonInput,
  IonButton,
  IonItem
} from '@ionic/react';
import { useState } from 'react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSave: (title: string) => void;
}

const AddTaskModal: React.FC<Props> = ({ isOpen, onClose, onSave }) => {
  const [title, setTitle] = useState('');

  const save = () => {
    if (!title.trim()) return;
    onSave(title.trim());
    setTitle('');
    onClose();
  };

  return (
    <IonModal isOpen={isOpen} breakpoints={[0, 0.5, 1]} initialBreakpoint={0.5}>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Nueva tarea</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">
        <IonItem>
          <IonInput
            label="Título"
            labelPlacement="stacked"
            placeholder="Ej. Comprar leche"
            value={title}
            onIonChange={e => setTitle(e.detail.value!)}
          />
        </IonItem>

        <IonButton expand="block" className="ion-margin-top" onClick={save}>
          Guardar tarea
        </IonButton>

        <IonButton expand="block" fill="clear" onClick={onClose}>
          Cancelar
        </IonButton>
      </IonContent>
    </IonModal>

  );
};

export default AddTaskModal;
