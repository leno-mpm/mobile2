import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonList,
  IonFab,
  IonFabButton,
  IonIcon
} from '@ionic/react';

import { add, listOutline } from 'ionicons/icons';
import { useState } from 'react';

import TaskItem from '../components/TaskItem';
import AddTaskModal from '../components/AddTaskModal';
import { useTasks } from '../context/TaskContext';

import './Tab1.css';

const Tab1: React.FC = () => {
  const { tasks, addTask, toggleTask } = useTasks();
  const [showModal, setShowModal] = useState(false);

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Mis tareas</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>

        {tasks.length === 0 && (
          <div className="empty-state">
            <IonIcon icon={listOutline} />
            <h2>No tienes tareas</h2>
            <p>Presiona el botón + para agregar una</p>
          </div>
        )}

        <IonList inset>
          {tasks.map(task => (
            <TaskItem
              key={task.id}
              task={task}
              onToggle={toggleTask}
            />
          ))}
        </IonList>

        <IonFab slot="fixed" vertical="bottom" horizontal="end">
          <IonFabButton onClick={openModal}>
            <IonIcon icon={add} />
          </IonFabButton>
        </IonFab>

        {/* 👇 CLAVE */}
        <AddTaskModal
          isOpen={showModal}
          onClose={closeModal}
          onSave={(title) => {
            addTask(title);
            closeModal();
          }}
        />

      </IonContent>
    </IonPage>
  );
};

export default Tab1;


