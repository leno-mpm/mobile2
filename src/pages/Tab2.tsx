import React, { useState, useEffect } from 'react';
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonGrid,
  IonRow,
  IonCol,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonList,
  IonItem,
  IonLabel,
  IonButton,
  IonIcon,
  IonModal,
  IonButtons,
  IonChip,
  IonSelect,
  IonSelectOption,
  IonNote,
  IonBadge,
  IonFab,
  IonFabButton,
  IonSegment,
  IonSegmentButton,
  IonText,
  IonProgressBar,
  useIonAlert,
  IonRefresher,
  IonRefresherContent,
  IonAvatar,
  IonSkeletonText,
  IonRippleEffect,
  IonDatetime
} from '@ionic/react';
import {
  calendar,
  chevronBack,
  chevronForward,
  add,
  time,
  today,
  checkmarkCircle,
  filter,
  list,
  grid,
  location,
  repeat,
  trash,
  create,
  download,
  sync,
  arrowUpCircleOutline,
  ellipsisVertical,
  people,
  flag,
  alarm,
  trophy,
  statsChart,
  sunny,
  moon,
  notifications,
  colorPalette,
  rocket,
  star,
  flash
} from 'ionicons/icons';
import './Tab2.css';

interface Task {
  id: string;
  title: string;
  description: string;
  date: Date;
  time?: string;
  completed: boolean;
  priority: 'low' | 'medium' | 'high';
  category: string;
  location?: string;
  repeat?: 'daily' | 'weekly' | 'monthly' | 'yearly';
  attendees?: string[];
}

const Tab2: React.FC = () => {
  // Estados
  const [tasks] = useState<Task[]>([
    {
      id: '1',
      title: 'Reunión de equipo',
      description: 'Revisión de proyectos semanal con todo el equipo',
      date: new Date(),
      time: '10:00',
      completed: false,
      priority: 'high',
      category: 'work',
      location: 'Oficina Principal',
      attendees: ['Ana', 'Carlos', 'María']
    },
    {
      id: '2',
      title: 'Ir al gimnasio',
      description: 'Rutina de cardio y pesas - Nivel intermedio',
      date: new Date(),
      time: '18:00',
      completed: true,
      priority: 'medium',
      category: 'health',
      repeat: 'weekly'
    },
    {
      id: '3',
      title: 'Entregar reporte',
      description: 'Reporte trimestral de ventas',
      date: new Date(new Date().setDate(new Date().getDate() + 2)),
      time: '15:00',
      completed: false,
      priority: 'high',
      category: 'work'
    },
    {
      id: '4',
      title: 'Cita médica',
      description: 'Control anual con el médico',
      date: new Date(new Date().setDate(new Date().getDate() + 3)),
      time: '11:30',
      completed: false,
      priority: 'medium',
      category: 'health',
      location: 'Clínica Central'
    }
  ]);
  
  const [currentDate, setCurrentDate] = useState<Date>(new Date());
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [viewMode, setViewMode] = useState<'month' | 'week' | 'day'>('month');
  const [showTaskModal, setShowTaskModal] = useState(false);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [darkMode, setDarkMode] = useState(false);
  const [presentAlert] = useIonAlert();

  const categories = [
    { id: 'all', name: 'Todas', color: 'medium', icon: 'grid' },
    { id: 'work', name: 'Trabajo', color: 'primary', icon: 'briefcase' },
    { id: 'personal', name: 'Personal', color: 'success', icon: 'person' },
    { id: 'health', name: 'Salud', color: 'danger', icon: 'heart' },
    { id: 'study', name: 'Estudio', color: 'warning', icon: 'book' },
    { id: 'shopping', name: 'Compras', color: 'tertiary', icon: 'cart' }
  ];

  // Funciones del calendario
  const getCalendarDays = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const firstDayOfWeek = firstDay.getDay();
    
    const days = [];
    
    // Días del mes anterior
    const prevMonthLastDay = new Date(year, month, 0).getDate();
    for (let i = firstDayOfWeek - 1; i >= 0; i--) {
      days.push({
        date: new Date(year, month - 1, prevMonthLastDay - i),
        isCurrentMonth: false,
        isToday: false,
        tasks: getTasksForDate(new Date(year, month - 1, prevMonthLastDay - i))
      });
    }

    // Días del mes actual
    const today = new Date();
    for (let i = 1; i <= daysInMonth; i++) {
      const date = new Date(year, month, i);
      days.push({
        date,
        isCurrentMonth: true,
        isToday: date.toDateString() === today.toDateString(),
        tasks: getTasksForDate(date)
      });
    }

    // Días del siguiente mes
    const totalCells = 42;
    while (days.length < totalCells) {
      const nextMonthDay = days.length - firstDayOfWeek - daysInMonth + 1;
      const date = new Date(year, month + 1, nextMonthDay);
      days.push({
        date,
        isCurrentMonth: false,
        isToday: false,
        tasks: getTasksForDate(date)
      });
    }

    return days;
  };

  const getTasksForDate = (date: Date): Task[] => {
    return tasks.filter(task => 
      new Date(task.date).toDateString() === date.toDateString()
    );
  };

  const navigateMonth = (direction: 'prev' | 'next') => {
    setCurrentDate(new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() + (direction === 'next' ? 1 : -1),
      1
    ));
  };

  const goToToday = () => {
    const today = new Date();
    setCurrentDate(today);
    setSelectedDate(today);
  };

  const formatMonthYear = (date: Date) => {
    return date.toLocaleDateString('es-ES', {
      month: 'long',
      year: 'numeric'
    });
  };

  const formatFullDate = (date: Date) => {
    return date.toLocaleDateString('es-ES', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  const getCategoryColor = (categoryId: string) => {
    const category = categories.find(c => c.id === categoryId);
    return category?.color || 'medium';
  };

  const daysOfWeek = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];
  const calendarDays = getCalendarDays();
  const selectedDateTasks = getTasksForDate(selectedDate);
  const taskStats = {
    total: tasks.length,
    completed: tasks.filter(t => t.completed).length,
    today: getTasksForDate(new Date()).length
  };

  return (
    <IonPage className={`calendar-page ${darkMode ? 'dark-theme' : 'light-theme'}`}>
      <IonHeader className="calendar-header" translucent>
        <IonToolbar className="gradient-toolbar">
          <div className="header-content">
            <div className="header-left">
              <div className="header-text">
                <h1>Calendario</h1>
                <p className="subtitle">{formatMonthYear(currentDate)}</p>
              </div>
            </div>
            <div className="header-right">
              <IonButton fill="clear" className="theme-toggle" onClick={() => setDarkMode(!darkMode)}>
                <IonIcon icon={darkMode ? sunny : moon} slot="icon-only" />
              </IonButton>
              <IonButton fill="clear" className="today-btn" onClick={goToToday}>
                <IonIcon icon={today} slot="start" />
                Hoy
              </IonButton>
            </div>
          </div>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen className="calendar-content">
        <IonRefresher slot="fixed" onIonRefresh={(e) => {
          setTimeout(() => e.detail.complete(), 1000);
        }}>
          <IonRefresherContent />
        </IonRefresher>

        {/* Estadísticas rápidas */}
        <div className="calendar-stats">
          <IonCard className="stat-card">
            <IonCardContent>
              <div className="stat-icon">
                <IonIcon icon={calendar} />
              </div>
              <h3>{taskStats.total}</h3>
              <p>Tareas totales</p>
            </IonCardContent>
          </IonCard>

          <IonCard className="stat-card">
            <IonCardContent>
              <div className="stat-icon">
                <IonIcon icon={checkmarkCircle} />
              </div>
              <h3>{taskStats.completed}</h3>
              <p>Completadas</p>
            </IonCardContent>
          </IonCard>

          <IonCard className="stat-card">
            <IonCardContent>
              <div className="stat-icon">
                <IonIcon icon={today} />
              </div>
              <h3>{taskStats.today}</h3>
              <p>Para hoy</p>
            </IonCardContent>
          </IonCard>
        </div>

        {/* Controles del calendario */}
        <div className="calendar-controls">
          <div className="navigation-controls">
            <IonButton className="nav-btn" fill="clear" onClick={() => navigateMonth('prev')}>
              <IonIcon icon={chevronBack} />
            </IonButton>
            
            <div className="month-display">
              <h2>{formatMonthYear(currentDate)}</h2>
            </div>
            
            <IonButton className="nav-btn" fill="clear" onClick={() => navigateMonth('next')}>
              <IonIcon icon={chevronForward} />
            </IonButton>
          </div>

          <div className="view-controls">
            <IonSegment 
              value={viewMode} 
              onIonChange={e => setViewMode(e.detail.value as any)}
              className="view-selector"
            >
              <IonSegmentButton value="month" className="view-btn">
                <IonIcon icon={grid} />
                <IonLabel>Mes</IonLabel>
              </IonSegmentButton>
              <IonSegmentButton value="week" className="view-btn">
                <IonIcon icon={list} />
                <IonLabel>Semana</IonLabel>
              </IonSegmentButton>
              <IonSegmentButton value="day" className="view-btn">
                <IonIcon icon={calendar} />
                <IonLabel>Día</IonLabel>
              </IonSegmentButton>
            </IonSegment>
          </div>

          {/* Filtros por categoría */}
          <div className="category-filters">
            <div className="filters-scroll">
              {categories.map(cat => (
                <IonChip
                  key={cat.id}
                  className={`category-chip ${categoryFilter === cat.id ? 'active' : ''}`}
                  color={cat.color as any}
                  onClick={() => setCategoryFilter(cat.id)}
                >
                  <IonIcon icon={cat.icon as any} />
                  <IonLabel>{cat.name}</IonLabel>
                </IonChip>
              ))}
            </div>
          </div>
        </div>

        {/* Calendario */}
        <IonCard className="calendar-widget">
          <IonCardContent>
            {/* Días de la semana */}
            <div className="weekdays-header">
              {daysOfWeek.map(day => (
                <div key={day} className="weekday">
                  {day}
                </div>
              ))}
            </div>

            {/* Días del mes */}
            <div className="calendar-grid">
              {calendarDays.map((day, index) => {
                const isSelected = selectedDate.toDateString() === day.date.toDateString();
                const isToday = day.date.toDateString() === new Date().toDateString();
                const hasTasks = day.tasks.length > 0;
                
                return (
                  <div
                    key={index}
                    className={`calendar-day 
                      ${!day.isCurrentMonth ? 'other-month' : ''}
                      ${isToday ? 'today' : ''}
                      ${isSelected ? 'selected' : ''}
                      ${hasTasks ? 'has-tasks' : ''}
                    `}
                    onClick={() => setSelectedDate(day.date)}
                  >
                    <div className="day-number">
                      {day.date.getDate()}
                      {isToday && <div className="today-indicator" />}
                    </div>
                    
                    {/* Indicadores de tareas */}
                    {hasTasks && (
                      <div className="task-indicators">
                        {day.tasks.slice(0, 3).map((task, idx) => (
                          <div 
                            key={idx}
                            className="task-indicator"
                            style={{ 
                              backgroundColor: `var(--ion-color-${getCategoryColor(task.category)})`
                            }}
                          />
                        ))}
                        {day.tasks.length > 3 && (
                          <div className="more-indicator">+{day.tasks.length - 3}</div>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </IonCardContent>
        </IonCard>

        {/* Tareas del día seleccionado */}
        <IonCard className="selected-day-card">
          <IonCardHeader>
            <IonCardTitle>
              <div className="day-header">
                <div className="day-info">
                  <h2>{formatFullDate(selectedDate)}</h2>
                  <p className="task-count">{selectedDateTasks.length} tarea{selectedDateTasks.length !== 1 ? 's' : ''}</p>
                </div>
                <IonBadge className="day-badge" color="primary">
                  {selectedDateTasks.length}
                </IonBadge>
              </div>
            </IonCardTitle>
          </IonCardHeader>

          <IonCardContent>
            {selectedDateTasks.length === 0 ? (
              <div className="empty-day">
                <div className="empty-illustration">
                  <IonIcon icon={calendar} />
                </div>
                <h3>Día libre</h3>
                <p>No hay tareas programadas para hoy</p>
                <IonButton className="primary-btn" onClick={() => setShowTaskModal(true)}>
                  <IonIcon icon={add} slot="start" />
                  Agregar Tarea
                </IonButton>
              </div>
            ) : (
              <div className="day-tasks">
                {selectedDateTasks.map(task => (
                  <IonCard 
                    key={task.id} 
                    className={`task-card ${task.completed ? 'completed' : ''}`}
                    button
                    onClick={() => {
                      setSelectedTask(task);
                      setShowDetailModal(true);
                    }}
                  >
                    <IonCardContent>
                      <div className="task-header">
                        <div className="task-category">
                          <div 
                            className="category-dot"
                            style={{ backgroundColor: `var(--ion-color-${getCategoryColor(task.category)})` }}
                          />
                          <span className="category-name">
                            {categories.find(c => c.id === task.category)?.name}
                          </span>
                        </div>
                        
                        <div className="task-priority">
                          <div 
                            className="priority-dot"
                            style={{ 
                              backgroundColor: 
                                task.priority === 'high' ? '#ff4444' : 
                                task.priority === 'medium' ? '#ffaa00' : '#00c851'
                            }}
                          />
                          <span>{task.priority === 'high' ? 'Alta' : task.priority === 'medium' ? 'Media' : 'Baja'}</span>
                        </div>
                      </div>
                      
                      <h3 className={task.completed ? 'completed-text' : ''}>{task.title}</h3>
                      
                      {task.description && (
                        <p className="task-description">{task.description}</p>
                      )}
                      
                      <div className="task-meta">
                        {task.time && (
                          <div className="meta-item">
                            <IonIcon icon={time} />
                            <span>{task.time}</span>
                          </div>
                        )}
                        
                        {task.location && (
                          <div className="meta-item">
                            <IonIcon icon={location} />
                            <span>{task.location}</span>
                          </div>
                        )}
                        
                        {task.repeat && (
                          <div className="meta-item">
                            <IonIcon icon={repeat} />
                            <span>{task.repeat}</span>
                          </div>
                        )}
                      </div>
                      
                      {task.attendees && task.attendees.length > 0 && (
                        <div className="task-attendees">
                          <div className="attendees-label">
                            <IonIcon icon={people} />
                            <span>Participantes:</span>
                          </div>
                          <div className="attendees-list">
                            {task.attendees.map((attendee, idx) => (
                              <div key={idx} className="attendee">
                                {attendee.charAt(0)}
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </IonCardContent>
                    <IonRippleEffect />
                  </IonCard>
                ))}
              </div>
            )}
          </IonCardContent>
        </IonCard>

        {/* FAB para nueva tarea */}
        <IonFab vertical="bottom" horizontal="end" slot="fixed" className="fab-container">
          <IonFabButton className="primary-fab" onClick={() => setShowTaskModal(true)}>
            <IonIcon icon={add} />
          </IonFabButton>
        </IonFab>

        {/* Modal para nueva tarea */}
        <IonModal
          isOpen={showTaskModal}
          onDidDismiss={() => setShowTaskModal(false)}
          className="task-modal"
        >
          <IonHeader className="modal-header">
            <IonToolbar>
              <IonTitle>Nueva Tarea</IonTitle>
              <IonButtons slot="end">
                <IonButton onClick={() => setShowTaskModal(false)}>Cancelar</IonButton>
              </IonButtons>
            </IonToolbar>
          </IonHeader>
          
          <IonContent className="modal-content">
            <div className="form-container">
              <p style={{ padding: '20px', textAlign: 'center', color: 'var(--ion-color-medium)' }}>
                Formulario para nueva tarea en desarrollo...
              </p>
              <IonButton 
                expand="block" 
                className="submit-btn"
                onClick={() => setShowTaskModal(false)}
              >
                <IonIcon icon={add} slot="start" />
                Crear Tarea (Demo)
              </IonButton>
            </div>
          </IonContent>
        </IonModal>

        {/* Modal de detalle de tarea */}
        <IonModal
          isOpen={showDetailModal}
          onDidDismiss={() => {
            setShowDetailModal(false);
            setSelectedTask(null);
          }}
          className="detail-modal"
        >
          <IonHeader className="modal-header">
            <IonToolbar>
              <IonTitle>Detalles de Tarea</IonTitle>
              <IonButtons slot="end">
                <IonButton onClick={() => setShowDetailModal(false)}>Cerrar</IonButton>
              </IonButtons>
            </IonToolbar>
          </IonHeader>
          
          <IonContent className="modal-content">
            {selectedTask && (
              <div className="detail-container">
                <div className="detail-header">
                  <div 
                    className="detail-category"
                    style={{ backgroundColor: `var(--ion-color-${getCategoryColor(selectedTask.category)})` }}
                  >
                    {categories.find(c => c.id === selectedTask.category)?.name}
                  </div>
                  
                  <div className="detail-priority">
                    Prioridad: 
                    <span style={{ 
                      color: 
                        selectedTask.priority === 'high' ? '#ff4444' : 
                        selectedTask.priority === 'medium' ? '#ffaa00' : '#00c851',
                      fontWeight: 'bold',
                      marginLeft: '8px'
                    }}>
                      {selectedTask.priority === 'high' ? 'Alta' : selectedTask.priority === 'medium' ? 'Media' : 'Baja'}
                    </span>
                  </div>
                </div>
                
                <h1>{selectedTask.title}</h1>
                
                {selectedTask.description && (
                  <div className="detail-section">
                    <h3>Descripción</h3>
                    <p>{selectedTask.description}</p>
                  </div>
                )}
                
                <div className="detail-grid">
                  <div className="detail-item">
                    <IonIcon icon={calendar} />
                    <div>
                      <small>Fecha</small>
                      <p>{new Date(selectedTask.date).toLocaleDateString('es-ES', {
                        weekday: 'long',
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric'
                      })}</p>
                    </div>
                  </div>
                  
                  {selectedTask.time && (
                    <div className="detail-item">
                      <IonIcon icon={time} />
                      <div>
                        <small>Hora</small>
                        <p>{selectedTask.time}</p>
                      </div>
                    </div>
                  )}
                  
                  {selectedTask.location && (
                    <div className="detail-item">
                      <IonIcon icon={location} />
                      <div>
                        <small>Ubicación</small>
                        <p>{selectedTask.location}</p>
                      </div>
                    </div>
                  )}
                  
                  {selectedTask.repeat && (
                    <div className="detail-item">
                      <IonIcon icon={repeat} />
                      <div>
                        <small>Repetir</small>
                        <p>{selectedTask.repeat}</p>
                      </div>
                    </div>
                  )}
                </div>
                
                <div className="detail-actions">
                  <IonButton 
                    expand="block" 
                    className={`status-btn ${selectedTask.completed ? 'completed' : 'pending'}`}
                  >
                    <IonIcon icon={checkmarkCircle} slot="start" />
                    {selectedTask.completed ? 'Completada' : 'Marcar como Completada'}
                  </IonButton>
                </div>
              </div>
            )}
          </IonContent>
        </IonModal>
      </IonContent>
    </IonPage>
  );
};

export default Tab2;