import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonCard,
  IonCardContent,
  IonIcon,
  IonProgressBar
} from '@ionic/react';

import {
  listOutline,
  checkmarkDoneOutline,
  trendingUpOutline
} from 'ionicons/icons';

import { useEffect, useState } from 'react';
import { Task } from '../models/Task';
import { StorageService } from '../services/storage.service';

import './Tab2.css';

const Tab2: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    const load = async () => {
      const data = await StorageService.loadTasks();
      setTasks(data);
    };
    load();
  }, []);

  const total = tasks.length;
  const completed = tasks.filter(t => t.completed).length;
  const pending = total - completed;

  const progress = total === 0 ? 0 : completed / total;
  const progressPercent = Math.round(progress * 100);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Resumen</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen className="tab2-content">

        <div className="stats-grid">

          <IonCard className="stat-card">
            <IonCardContent>
              <IonIcon icon={listOutline} color="primary" />
              <h2>{total}</h2>
              <p>Total tareas</p>
            </IonCardContent>
          </IonCard>

          <IonCard className="stat-card">
            <IonCardContent>
              <IonIcon icon={checkmarkDoneOutline} color="success" />
              <h2>{completed}</h2>
              <p>Completadas</p>
            </IonCardContent>
          </IonCard>

          <IonCard className="stat-card">
            <IonCardContent>
              <IonIcon icon={trendingUpOutline} color="tertiary" />
              <h2>{pending}</h2>
              <p>Pendientes</p>
            </IonCardContent>
          </IonCard>

        </div>

        <IonCard className="progress-card">
          <IonCardContent>
            <h3>Progreso general</h3>
            <IonProgressBar value={progress} />
            <p className="progress-text">{progressPercent}% completado</p>
          </IonCardContent>
        </IonCard>

      </IonContent>
    </IonPage>
  );
};

export default Tab2;
