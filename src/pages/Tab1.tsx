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
import { useState, useEffect } from 'react';

import TaskItem from '../components/TaskItem';
import AddTaskModal from '../components/AddTaskModal';
import { Task } from '../models/Task';
import { StorageService } from '../services/storage.service';

import './Tab1.css';

const Tab1: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const loadTasks = async () => {
      const savedTasks = await StorageService.loadTasks();
      setTasks(savedTasks);
    };
    loadTasks();
  }, []);

  useEffect(() => {
    StorageService.saveTasks(tasks);
  }, [tasks]);

  const addTask = (title: string) => {
    const newTask: Task = {
      id: Date.now().toString(),
      title,
      completed: false,
      createdAt: new Date().toISOString()
    };
    setTasks(prev => [...prev, newTask]);
  };

  const toggleTask = (id: string) => {
    setTasks(prev =>
      prev.map(task =>
        task.id === id
          ? { ...task, completed: !task.completed }
          : task
      )
    );
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
          <IonFabButton onClick={() => setShowModal(true)}>
            <IonIcon icon={add} />
          </IonFabButton>
        </IonFab>

        <AddTaskModal
          isOpen={showModal}
          onClose={() => setShowModal(false)}
          onSave={addTask}
        />

      </IonContent>
    </IonPage>
  );
};

export default Tab1;
