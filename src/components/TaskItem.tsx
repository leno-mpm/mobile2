import {
  IonItem,
  IonLabel,
  IonCheckbox
} from '@ionic/react';
import { Task } from '../models/Task';

interface Props {
  task: Task;
  onToggle: (id: string) => void;
}

const TaskItem: React.FC<Props> = ({ task, onToggle }) => {
  return (
    <IonItem lines="full">
      <IonCheckbox
        slot="start"
        checked={task.completed}
        onIonChange={() => onToggle(task.id)}
      />

      <IonLabel>
        <h2 className={task.completed ? 'task-done' : ''}>
          {task.title}
        </h2>
        <p>{new Date(task.createdAt).toLocaleDateString()}</p>
      </IonLabel>
    </IonItem>

  );
};

export default TaskItem;

