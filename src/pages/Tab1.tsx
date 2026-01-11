import React, { useState, useEffect } from 'react';
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonList,
  IonItem,
  IonLabel,
  IonCheckbox,
  IonButton,
  IonIcon,
  IonBadge,
  IonChip,
  IonGrid,
  IonRow,
  IonCol,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonInput,
  IonTextarea,
  IonSelect,
  IonSelectOption,
  IonDatetime,
  IonModal,
  IonButtons,
  IonNote,
  IonProgressBar,
  IonRefresher,
  IonRefresherContent,
  IonSearchbar,
  IonSegment,
  IonSegmentButton,
  useIonAlert,
  IonFab,
  IonFabButton,
  IonFabList,
  IonAvatar,
  IonSkeletonText,
  IonRippleEffect,
  IonAlert
} from '@ionic/react';
import {
  add,
  time,
  calendar,
  flag,
  filter,
  download,
  statsChart,
  trash,
  checkmarkDone,
  list,
  alarm,
  trophy,
  shareSocial,
  create,
  checkmarkCircle,
  cloudUpload,
  ellipsisVertical,
  sunny,
  moon,
  today,
  arrowUpCircleOutline,
  chevronForward,
  notifications,
  repeat,
  location,
  person,
  rocket,
  star,
  flash,
  timer,
  archive,
  bookmark,
  colorPalette,
  settings
} from 'ionicons/icons';
import './Tab1.css';

interface Task {
  id: string;
  title: string;
  description: string;
  date: Date;
  time?: string;
  completed: boolean;
  priority: 'low' | 'medium' | 'high';
  category: string;
  createdAt: Date;
  completedAt?: Date;
  tags?: string[];
}

const Tab1: React.FC = () => {
  // Estados
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: '1',
      title: 'Reunión de trabajo',
      description: 'Preparar presentación para el equipo',
      date: new Date(),
      time: '10:00',
      completed: false,
      priority: 'high',
      category: 'work',
      createdAt: new Date(),
      tags: ['Trabajo', 'Importante']
    },
    {
      id: '2',
      title: 'Comprar víveres',
      description: 'Leche, huevos, pan y frutas',
      date: new Date(),
      completed: true,
      priority: 'medium',
      category: 'shopping',
      createdAt: new Date(),
      tags: ['Personal', 'Compras']
    },
    {
      id: '3',
      title: 'Estudiar React Native',
      description: 'Capítulo 5: Navegación',
      date: new Date(new Date().setDate(new Date().getDate() + 1)),
      time: '15:00',
      completed: false,
      priority: 'medium',
      category: 'study',
      createdAt: new Date(),
      tags: ['Estudio', 'Desarrollo']
    },
    {
      id: '4',
      title: 'Ir al gimnasio',
      description: 'Rutina de cardio y pesas',
      date: new Date(),
      time: '18:00',
      completed: false,
      priority: 'low',
      category: 'health',
      createdAt: new Date(),
      tags: ['Salud', 'Ejercicio']
    }
  ]);
  
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState<'all' | 'pending' | 'completed' | 'today'>('all');
  const [searchText, setSearchText] = useState('');
  const [sortBy, setSortBy] = useState<'date' | 'priority' | 'created'>('date');
  const [showNewTaskModal, setShowNewTaskModal] = useState(false);
  const [showTaskActions, setShowTaskActions] = useState<string | null>(null);
  const [darkMode, setDarkMode] = useState(false);
  const [presentAlert] = useIonAlert();
  
  const [newTask, setNewTask] = useState({
    title: '',
    description: '',
    date: new Date().toISOString(),
    time: '09:00',
    priority: 'medium' as 'low' | 'medium' | 'high',
    category: 'personal'
  });

  const categories = [
    { id: 'personal', name: 'Personal', color: 'success', icon: 'person' },
    { id: 'work', name: 'Trabajo', color: 'primary', icon: 'briefcase' },
    { id: 'health', name: 'Salud', color: 'danger', icon: 'heart' },
    { id: 'study', name: 'Estudio', color: 'warning', icon: 'book' },
    { id: 'shopping', name: 'Compras', color: 'tertiary', icon: 'cart' },
    { id: 'finance', name: 'Finanzas', color: 'secondary', icon: 'cash' }
  ];

  // Estadísticas
  const getStats = () => {
    const total = tasks.length;
    const completed = tasks.filter(t => t.completed).length;
    const pending = total - completed;
    const today = tasks.filter(t => 
      new Date(t.date).toDateString() === new Date().toDateString()
    ).length;
    const overdue = tasks.filter(t => 
      !t.completed && new Date(t.date) < new Date()
    ).length;
    const highPriority = tasks.filter(t => t.priority === 'high').length;

    return { total, completed, pending, today, overdue, highPriority };
  };

  const stats = getStats();

  // Filtrado y ordenamiento
  const filteredTasks = React.useMemo(() => {
    let filtered = [...tasks];
    
    switch (filter) {
      case 'pending':
        filtered = filtered.filter(task => !task.completed);
        break;
      case 'completed':
        filtered = filtered.filter(task => task.completed);
        break;
      case 'today':
        const today = new Date().toDateString();
        filtered = filtered.filter(task => 
          new Date(task.date).toDateString() === today
        );
        break;
    }

    if (searchText) {
      filtered = filtered.filter(task =>
        task.title.toLowerCase().includes(searchText.toLowerCase()) ||
        task.description?.toLowerCase().includes(searchText.toLowerCase())
      );
    }

    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'priority':
          const priorityOrder = { high: 3, medium: 2, low: 1 };
          return priorityOrder[b.priority] - priorityOrder[a.priority];
        case 'created':
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        case 'date':
        default:
          return new Date(a.date).getTime() - new Date(b.date).getTime();
      }
    });

    return filtered;
  }, [tasks, filter, searchText, sortBy]);

  // Funciones
  const handleAddTask = async () => {
    if (!newTask.title.trim()) {
      presentAlert({
        header: 'Error',
        message: 'El título es obligatorio',
        buttons: ['OK']
      });
      return;
    }

    const task: Task = {
      id: Date.now().toString(),
      ...newTask,
      completed: false,
      createdAt: new Date(),
      tags: []
    };

    setTasks([...tasks, task]);
    
    setNewTask({
      title: '',
      description: '',
      date: new Date().toISOString(),
      time: '09:00',
      priority: 'medium',
      category: 'personal'
    });
    
    setShowNewTaskModal(false);
    
    presentAlert({
      header: '¡Éxito!',
      message: 'Tarea creada correctamente',
      buttons: ['OK']
    });
  };

  const toggleTaskCompletion = (taskId: string) => {
    setTasks(tasks.map(task =>
      task.id === taskId ? { 
        ...task, 
        completed: !task.completed,
        completedAt: !task.completed ? new Date() : undefined
      } : task
    ));
  };

  const deleteTask = (taskId: string) => {
    setTasks(tasks.filter(task => task.id !== taskId));
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return '#ff4444';
      case 'medium': return '#ffaa00';
      case 'low': return '#00c851';
      default: return '#666';
    }
  };

  const getCategoryIcon = (categoryId: string) => {
    const category = categories.find(c => c.id === categoryId);
    return category?.icon || 'help';
  };

  const formatDate = (date: Date) => {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    
    const taskDate = new Date(date);
    
    if (taskDate.toDateString() === today.toDateString()) {
      return 'Hoy';
    } else if (taskDate.toDateString() === tomorrow.toDateString()) {
      return 'Mañana';
    } else {
      return taskDate.toLocaleDateString('es-ES', {
        weekday: 'short',
        day: 'numeric',
        month: 'short'
      });
    }
  };

  const handleRefresh = (event: CustomEvent) => {
    setTimeout(() => {
      event.detail.complete();
    }, 1500);
  };

  if (loading) {
    return (
      <IonPage>
        <IonContent fullscreen>
          <div className="skeleton-loading">
            <IonSkeletonText animated style={{ width: '60%', height: '40px' }} />
            <IonSkeletonText animated style={{ width: '90%', height: '120px', marginTop: '20px' }} />
            <IonSkeletonText animated style={{ width: '90%', height: '80px', marginTop: '10px' }} />
            <IonSkeletonText animated style={{ width: '90%', height: '80px', marginTop: '10px' }} />
          </div>
        </IonContent>
      </IonPage>
    );
  }

  return (
    <IonPage className={`${darkMode ? 'dark-theme' : 'light-theme'}`}>
      <IonHeader className="custom-header" translucent>
        <IonToolbar className="gradient-toolbar">
          <div className="header-content">
            <div className="header-left">
              <IonAvatar className="user-avatar">
                <img src="https://i.pravatar.cc/150?img=32" alt="Usuario" />
              </IonAvatar>
              <div className="header-text">
                <h1>Mis Tareas</h1>
                <p className="subtitle">{stats.pending} pendientes • {stats.today} hoy</p>
              </div>
            </div>
            <div className="header-right">
              <IonButton fill="clear" className="theme-toggle" onClick={() => setDarkMode(!darkMode)}>
                <IonIcon icon={darkMode ? sunny : moon} slot="icon-only" />
              </IonButton>
              <IonButton fill="clear" className="notifications-btn">
                <IonIcon icon={notifications} slot="icon-only" />
                {stats.overdue > 0 && <IonBadge color="danger" className="notification-badge">{stats.overdue}</IonBadge>}
              </IonButton>
            </div>
          </div>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen className="custom-content">
        <IonRefresher slot="fixed" onIonRefresh={handleRefresh}>
          <IonRefresherContent 
            pullingIcon={arrowUpCircleOutline}
            pullingText="Desliza para actualizar"
            refreshingSpinner="circles"
            refreshingText="Actualizando..."
          />
        </IonRefresher>

        {/* Tarjetas de estadísticas */}
        <div className="stats-cards-container">
          <IonCard className="stat-card total-tasks">
            <IonCardContent>
              <div className="stat-icon">
                <IonIcon icon={list} />
              </div>
              <h3>{stats.total}</h3>
              <p>Total tareas</p>
            </IonCardContent>
          </IonCard>

          <IonCard className="stat-card completed-tasks">
            <IonCardContent>
              <div className="stat-icon">
                <IonIcon icon={checkmarkCircle} />
              </div>
              <h3>{stats.completed}</h3>
              <p>Completadas</p>
            </IonCardContent>
          </IonCard>

          <IonCard className="stat-card priority-tasks">
            <IonCardContent>
              <div className="stat-icon">
                <IonIcon icon={flag} />
              </div>
              <h3>{stats.highPriority}</h3>
              <p>Alta prioridad</p>
            </IonCardContent>
          </IonCard>
        </div>

        {/* Barra de búsqueda */}
        <div className="search-container">
          <IonSearchbar
            value={searchText}
            onIonChange={e => setSearchText(e.detail.value!)}
            placeholder="Buscar tareas..."
            animated
            className="custom-searchbar"
          />
          <IonButton fill="clear" className="filter-btn" onClick={() => {/* Abrir filtros */}}>
            <IonIcon icon={filter} />
          </IonButton>
        </div>

        {/* Filtros rápidos */}
        <div className="quick-filters">
          <IonChip 
            className={`filter-chip ${filter === 'all' ? 'active' : ''}`}
            onClick={() => setFilter('all')}
          >
            <IonLabel>Todas</IonLabel>
            <IonBadge color="light">{tasks.length}</IonBadge>
          </IonChip>
          
          <IonChip 
            className={`filter-chip ${filter === 'pending' ? 'active' : ''}`}
            onClick={() => setFilter('pending')}
          >
            <IonLabel>Pendientes</IonLabel>
            <IonBadge color="warning">{stats.pending}</IonBadge>
          </IonChip>
          
          <IonChip 
            className={`filter-chip ${filter === 'today' ? 'active' : ''}`}
            onClick={() => setFilter('today')}
          >
            <IonLabel>Hoy</IonLabel>
            <IonBadge color="primary">{stats.today}</IonBadge>
          </IonChip>
          
          <IonChip 
            className={`filter-chip ${filter === 'completed' ? 'active' : ''}`}
            onClick={() => setFilter('completed')}
          >
            <IonLabel>Completadas</IonLabel>
            <IonBadge color="success">{stats.completed}</IonBadge>
          </IonChip>
        </div>

        {/* Lista de tareas */}
        <div className="tasks-container">
          <div className="section-header">
            <h2>Tareas {filter !== 'all' && `(${filteredTasks.length})`}</h2>
            <IonButton fill="clear" size="small" onClick={() => setSortBy(sortBy === 'date' ? 'priority' : 'date')}>
              <IonIcon icon={sortBy === 'date' ? calendar : flag} slot="start" />
              Ordenar por {sortBy === 'date' ? 'prioridad' : 'fecha'}
            </IonButton>
          </div>

          {filteredTasks.length === 0 ? (
            <div className="empty-state">
              <div className="empty-illustration">
                <IonIcon icon={list} />
              </div>
              <h3>No hay tareas</h3>
              <p>{searchText ? 'No se encontraron resultados' : '¡Comienza agregando tu primera tarea!'}</p>
              <IonButton className="primary-btn" onClick={() => setShowNewTaskModal(true)}>
                <IonIcon icon={add} slot="start" />
                Crear Primera Tarea
              </IonButton>
            </div>
          ) : (
            <IonList lines="none" className="tasks-list">
              {filteredTasks.map(task => (
                <IonCard 
                  key={task.id} 
                  className={`task-card ${task.completed ? 'completed' : ''} ${new Date(task.date) < new Date() && !task.completed ? 'overdue' : ''}`}
                  button
                  onClick={() => toggleTaskCompletion(task.id)}
                >
                  <IonCardContent>
                    <div className="task-header">
                      <div className="task-checkbox">
                        <div className={`custom-checkbox ${task.completed ? 'checked' : ''}`}>
                          {task.completed && <IonIcon icon={checkmarkCircle} />}
                        </div>
                      </div>
                      
                      <div className="task-content">
                        <div className="task-title-row">
                          <h3 className={task.completed ? 'completed-text' : ''}>{task.title}</h3>
                          <div className="task-actions">
                            <IonButton 
                              fill="clear" 
                              size="small"
                              onClick={(e) => {
                                e.stopPropagation();
                                setShowTaskActions(task.id === showTaskActions ? null : task.id);
                              }}
                            >
                              <IonIcon icon={ellipsisVertical} />
                            </IonButton>
                          </div>
                        </div>
                        
                        {task.description && (
                          <p className="task-description">{task.description}</p>
                        )}
                        
                        <div className="task-meta">
                          <div className="meta-item">
                            <IonIcon icon={calendar} />
                            <span>{formatDate(task.date)}</span>
                          </div>
                          
                          {task.time && (
                            <div className="meta-item">
                              <IonIcon icon={time} />
                              <span>{task.time}</span>
                            </div>
                          )}
                          
                          <div className="priority-badge" style={{ backgroundColor: getPriorityColor(task.priority) }}>
                            {task.priority === 'high' ? 'Alta' : task.priority === 'medium' ? 'Media' : 'Baja'}
                          </div>
                        </div>
                        
                        {task.tags && task.tags.length > 0 && (
                          <div className="task-tags">
                            {task.tags.slice(0, 2).map((tag, index) => (
                              <span key={index} className="tag">{tag}</span>
                            ))}
                            {task.tags.length > 2 && <span className="tag-more">+{task.tags.length - 2}</span>}
                          </div>
                        )}
                      </div>
                    </div>
                    
                    {/* Menú de acciones */}
                    {showTaskActions === task.id && (
                      <div className="task-actions-menu">
                        <IonButton fill="clear" className="action-btn" onClick={() => {/* Editar */}}>
                          <IonIcon icon={create} slot="start" />
                          Editar
                        </IonButton>
                        <IonButton fill="clear" className="action-btn delete" onClick={() => deleteTask(task.id)}>
                          <IonIcon icon={trash} slot="start" />
                          Eliminar
                        </IonButton>
                      </div>
                    )}
                  </IonCardContent>
                  <IonRippleEffect />
                </IonCard>
              ))}
            </IonList>
          )}
        </div>

        {/* FAB para nueva tarea */}
        <IonFab vertical="bottom" horizontal="end" slot="fixed" className="fab-container">
          <IonFabButton className="primary-fab" onClick={() => setShowNewTaskModal(true)}>
            <IonIcon icon={add} />
          </IonFabButton>
          <IonFabList side="top">
            <IonFabButton color="success" className="quick-action" onClick={() => {/* Tarea rápida */}}>
              <IonIcon icon={flash} />
            </IonFabButton>
            <IonFabButton color="warning" className="quick-action" onClick={() => {/* Tarea con fecha */}}>
              <IonIcon icon={calendar} />
            </IonFabButton>
            <IonFabButton color="tertiary" className="quick-action" onClick={() => {/* Tarea con recordatorio */}}>
              <IonIcon icon={alarm} />
            </IonFabButton>
          </IonFabList>
        </IonFab>

        {/* Modal para nueva tarea */}
        <IonModal 
          isOpen={showNewTaskModal} 
          onDidDismiss={() => setShowNewTaskModal(false)}
          className="task-modal"
        >
          <IonHeader className="modal-header">
            <IonToolbar>
              <IonTitle>Nueva Tarea</IonTitle>
              <IonButtons slot="end">
                <IonButton onClick={() => setShowNewTaskModal(false)}>
                  Cancelar
                </IonButton>
              </IonButtons>
            </IonToolbar>
          </IonHeader>
          
          <IonContent className="modal-content">
            <div className="form-container">
              <div className="form-group">
                <label>Título *</label>
                <IonInput
                  value={newTask.title}
                  onIonChange={e => setNewTask({...newTask, title: e.detail.value!})}
                  placeholder="¿Qué necesitas hacer?"
                  className="form-input"
                />
              </div>
              
              <div className="form-group">
                <label>Descripción</label>
                <IonTextarea
                  value={newTask.description}
                  onIonChange={e => setNewTask({...newTask, description: e.detail.value!})}
                  rows={4}
                  placeholder="Detalles adicionales..."
                  className="form-textarea"
                />
              </div>
              
              <div className="form-row">
                <div className="form-group">
                  <label>Fecha</label>
                  <IonDatetime
                    value={newTask.date}
                    onIonChange={e => setNewTask({...newTask, date: e.detail.value!})}
                    presentation="date"
                    className="form-datetime"
                  />
                </div>
                
                <div className="form-group">
                  <label>Hora</label>
                  <IonDatetime
                    value={newTask.time}
                    onIonChange={e => setNewTask({...newTask, time: e.detail.value!})}
                    presentation="time"
                    className="form-datetime"
                  />
                </div>
              </div>
              
              <div className="form-group">
                <label>Prioridad</label>
                <div className="priority-selector">
                  {[
                    { value: 'low', label: 'Baja', color: '#00c851' },
                    { value: 'medium', label: 'Media', color: '#ffaa00' },
                    { value: 'high', label: 'Alta', color: '#ff4444' }
                  ].map(priority => (
                    <button
                      key={priority.value}
                      className={`priority-option ${newTask.priority === priority.value ? 'selected' : ''}`}
                      style={{ borderColor: priority.color }}
                      onClick={() => setNewTask({...newTask, priority: priority.value as any})}
                    >
                      <span className="priority-dot" style={{ backgroundColor: priority.color }} />
                      {priority.label}
                    </button>
                  ))}
                </div>
              </div>
              
              <div className="form-group">
                <label>Categoría</label>
                <div className="category-selector">
                  {categories.map(cat => (
                    <div
                      key={cat.id}
                      className={`category-option ${newTask.category === cat.id ? 'selected' : ''}`}
                      onClick={() => setNewTask({...newTask, category: cat.id})}
                    >
                      <div className="category-icon" style={{ backgroundColor: `var(--ion-color-${cat.color})` }}>
                        <IonIcon icon={cat.icon as any} />
                      </div>
                      <span>{cat.name}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              <IonButton 
                expand="block" 
                className="submit-btn"
                onClick={handleAddTask}
                disabled={!newTask.title.trim()}
              >
                <IonIcon icon={add} slot="start" />
                Crear Tarea
              </IonButton>
            </div>
          </IonContent>
        </IonModal>
      </IonContent>
    </IonPage>
  );
};

export default Tab1;