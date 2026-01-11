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
  IonToggle,
  IonSelect,
  IonSelectOption,
  IonInput,
  IonButton,
  IonIcon,
  IonAlert,
  IonChip,
  IonBadge,
  IonRange,
  IonNote,
  IonGrid,
  IonRow,
  IonCol,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonText,
  IonModal,
  IonButtons,
  IonProgressBar,
  IonSegment,
  IonSegmentButton,
  IonAvatar,
  useIonAlert,
  useIonToast,
  IonAccordion,
  IonAccordionGroup,
  IonFooter,
  IonRippleEffect,
  IonSkeletonText,
  IonThumbnail
} from '@ionic/react';
import {
  notifications,
  colorPalette,
  cloud,
  trash,
  informationCircle,
  lockClosed,
  time,
  language,
  moon,
  sunny,
  add,
  close,
  shield,
  sync,
  helpCircle,
  personCircle,
  settings,
  eye,
  ear,
  download,
  statsChart,
  documentText,
  people,
  star,
  bug,
  mail,
  shareSocial,
  warning,
  checkmarkCircle,
  checkmark,
  rocket,
  flash,
  trophy,
  calendar,
  globe,
  heart,
  thumbsUp,
  brush,
  volumeHigh,
  handLeft,
  wifi,
  batteryFull,
  speedometer,
  qrCode,
  logoGithub,
  logoTwitter,
  logoFacebook,
  logoInstagram,
  logoLinkedin,
  logoWhatsapp
} from 'ionicons/icons';
import './Tab3.css';

interface Category {
  id: string;
  name: string;
  color: string;
  icon: string;
  taskCount: number;
}

interface SettingItem {
  id: string;
  name: string;
  description: string;
  icon: string;
  value: any;
  type: 'toggle' | 'select' | 'range' | 'action';
  options?: { value: string; label: string }[];
}

const Tab3: React.FC = () => {
  // Estados
  const [darkMode, setDarkMode] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<'general' | 'appearance' | 'notifications' | 'data' | 'about'>('general');
  const [showNewCategoryModal, setShowNewCategoryModal] = useState<boolean>(false);
  const [showDeleteAlert, setShowDeleteAlert] = useState<boolean>(false);
  const [presentAlert] = useIonAlert();
  const [presentToast] = useIonToast();
  const [loading, setLoading] = useState(false);
  
  const [newCategoryName, setNewCategoryName] = useState<string>('');
  const [newCategoryColor, setNewCategoryColor] = useState<string>('primary');
  
  const [categories, setCategories] = useState<Category[]>([
    { id: '1', name: 'Trabajo', color: 'primary', icon: 'briefcase', taskCount: 5 },
    { id: '2', name: 'Personal', color: 'success', icon: 'person', taskCount: 3 },
    { id: '3', name: 'Salud', color: 'danger', icon: 'heart', taskCount: 2 },
    { id: '4', name: 'Estudio', color: 'warning', icon: 'book', taskCount: 4 },
    { id: '5', name: 'Compras', color: 'tertiary', icon: 'cart', taskCount: 1 }
  ]);

  // Configuraciones
  const [settings, setSettings] = useState<SettingItem[]>([
    { id: 'language', name: 'Idioma', description: 'Idioma de la aplicación', icon: 'globe', value: 'es', type: 'select', options: [
      { value: 'es', label: 'Español' },
      { value: 'en', label: 'English' },
      { value: 'fr', label: 'Français' },
      { value: 'pt', label: 'Português' }
    ]},
    { id: 'reminder', name: 'Recordatorio predeterminado', description: 'Tiempo antes de cada tarea', icon: 'time', value: 30, type: 'range' },
    { id: 'haptic', name: 'Retroalimentación háptica', description: 'Vibración al interactuar', icon: 'handLeft', value: true, type: 'toggle' },
    { id: 'sounds', name: 'Sonidos', description: 'Efectos de sonido', icon: 'volumeHigh', value: true, type: 'toggle' },
    { id: 'fontSize', name: 'Tamaño de fuente', description: 'Ajusta el tamaño del texto', icon: 'text', value: 16, type: 'range' },
    { id: 'notifications', name: 'Notificaciones', description: 'Activar notificaciones push', icon: 'notifications', value: true, type: 'toggle' },
    { id: 'autoBackup', name: 'Backup automático', description: 'Crear backups automáticamente', icon: 'cloud', value: true, type: 'toggle' },
    { id: 'sync', name: 'Sincronización en la nube', description: 'Sincronizar entre dispositivos', icon: 'sync', value: false, type: 'toggle' }
  ]);

  // Colores disponibles
  const availableColors = [
    { value: 'primary', name: 'Azul', hex: '#667eea', gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' },
    { value: 'success', name: 'Verde', hex: '#4facfe', gradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)' },
    { value: 'warning', name: 'Amarillo', hex: '#fa709a', gradient: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)' },
    { value: 'danger', name: 'Rojo', hex: '#f5576c', gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)' },
    { value: 'tertiary', name: 'Purpura', hex: '#764ba2', gradient: 'linear-gradient(135deg, #764ba2 0%, #667eea 100%)' },
    { value: 'medium', name: 'Gris', hex: '#92949c', gradient: 'linear-gradient(135deg, #bdc3c7 0%, #2c3e50 100%)' }
  ];

  // Información de la app
  const appInfo = {
    name: 'TaskMaster Pro',
    version: '1.2.0',
    build: '2024.03.15',
    developer: 'TaskMaster Team',
    website: 'https://taskmaster.example.com',
    supportEmail: 'soporte@taskmaster.example.com',
    description: 'La mejor aplicación para gestionar tus tareas y aumentar tu productividad.'
  };

  // Efecto para tema oscuro
  useEffect(() => {
    if (darkMode) {
      document.body.classList.add('dark');
    } else {
      document.body.classList.remove('dark');
    }
  }, [darkMode]);

  // Funciones
  const updateSetting = (id: string, value: any) => {
    setSettings(settings.map(setting => 
      setting.id === id ? { ...setting, value } : setting
    ));
  };

  const addNewCategory = () => {
    if (!newCategoryName.trim()) {
      showToast('El nombre es requerido', 'warning');
      return;
    }

    const newCategory: Category = {
      id: Date.now().toString(),
      name: newCategoryName,
      color: newCategoryColor,
      icon: 'add',
      taskCount: 0
    };

    setCategories([...categories, newCategory]);
    setNewCategoryName('');
    setNewCategoryColor('primary');
    setShowNewCategoryModal(false);
    
    showToast('Categoría creada', 'success');
  };

  const deleteCategory = (categoryId: string) => {
    setCategories(categories.filter(cat => cat.id !== categoryId));
    showToast('Categoría eliminada', 'success');
  };

  const showToast = (message: string, color: 'success' | 'danger' | 'warning' | 'primary') => {
    presentToast({
      message,
      duration: 2000,
      color,
      position: 'top'
    });
  };

  const deleteAllData = () => {
    presentAlert({
      header: '¡ADVERTENCIA!',
      message: '¿Estás seguro de eliminar todos los datos? Esta acción no se puede deshacer.',
      buttons: [
        { text: 'Cancelar', role: 'cancel', cssClass: 'secondary' },
        {
          text: 'Eliminar Todo',
          role: 'destructive',
          handler: () => {
            showToast('Datos eliminados correctamente', 'success');
            setShowDeleteAlert(false);
          }
        }
      ]
    });
  };

  const getSettingValue = (id: string) => {
    return settings.find(s => s.id === id)?.value;
  };

  const handleSaveSettings = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      showToast('Configuraciones guardadas', 'success');
    }, 1500);
  };

  const storageUsage = 65; // Porcentaje de uso
  const lastBackup = 'Hace 2 días';
  const tasksCount = 42;
  const categoriesCount = categories.length;

  if (loading) {
    return (
      <IonPage>
        <IonContent fullscreen>
          <div className="skeleton-loading">
            <IonSkeletonText animated style={{ width: '60%', height: '40px' }} />
            <IonSkeletonText animated style={{ width: '90%', height: '120px', marginTop: '20px' }} />
            <IonSkeletonText animated style={{ width: '90%', height: '80px', marginTop: '10px' }} />
          </div>
        </IonContent>
      </IonPage>
    );
  }

  return (
    <IonPage className={`settings-page ${darkMode ? 'dark-theme' : 'light-theme'}`}>
      <IonHeader className="settings-header" translucent>
        <IonToolbar className="gradient-toolbar">
          <div className="header-content">
            <div className="header-left">
              <div className="header-text">
                <h1>Ajustes</h1>
                <p className="subtitle">Personaliza tu experiencia</p>
              </div>
            </div>
            <div className="header-right">
              <IonButton fill="clear" className="save-btn" onClick={handleSaveSettings}>
                <IonIcon icon={checkmark} slot="start" />
                Guardar
              </IonButton>
            </div>
          </div>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen className="settings-content">
        {/* Pestañas de navegación */}
        <div className="settings-tabs">
          <IonSegment 
            value={activeTab} 
            onIonChange={e => setActiveTab(e.detail.value as any)}
            className="tabs-selector"
            scrollable
          >
            <IonSegmentButton value="general" className="tab-btn">
              <IonIcon icon={settings} />
              <IonLabel>General</IonLabel>
            </IonSegmentButton>
            <IonSegmentButton value="appearance" className="tab-btn">
              <IonIcon icon={colorPalette} />
              <IonLabel>Apariencia</IonLabel>
            </IonSegmentButton>
            <IonSegmentButton value="notifications" className="tab-btn">
              <IonIcon icon={notifications} />
              <IonLabel>Notificaciones</IonLabel>
            </IonSegmentButton>
            <IonSegmentButton value="data" className="tab-btn">
              <IonIcon icon={cloud} />
              <IonLabel>Datos</IonLabel>
            </IonSegmentButton>
            <IonSegmentButton value="about" className="tab-btn">
              <IonIcon icon={informationCircle} />
              <IonLabel>Acerca de</IonLabel>
            </IonSegmentButton>
          </IonSegment>
        </div>

        {/* Sección: General */}
        {activeTab === 'general' && (
          <div className="settings-section">
            <IonCard className="section-card">
              <IonCardHeader>
                <IonCardTitle>
                  <div className="section-title">
                    <IonIcon icon={settings} />
                    <span>Preferencias Generales</span>
                  </div>
                </IonCardTitle>
              </IonCardHeader>
              <IonCardContent>
                <div className="settings-list">
                  {settings.filter(s => ['language', 'reminder', 'haptic', 'sounds', 'fontSize'].includes(s.id)).map(setting => (
                    <div key={setting.id} className="setting-item">
                      <div className="setting-info">
                        <div className="setting-icon">
                          <IonIcon icon={setting.icon as any} />
                        </div>
                        <div className="setting-text">
                          <h3>{setting.name}</h3>
                          <p>{setting.description}</p>
                        </div>
                      </div>
                      
                      <div className="setting-control">
                        {setting.type === 'toggle' && (
                          <IonToggle
                            checked={setting.value}
                            onIonChange={e => updateSetting(setting.id, e.detail.checked)}
                            className="custom-toggle"
                          />
                        )}
                        
                        {setting.type === 'select' && (
                          <IonSelect
                            value={setting.value}
                            onIonChange={e => updateSetting(setting.id, e.detail.value)}
                            interface="action-sheet"
                            className="custom-select"
                          >
                            {setting.options?.map(option => (
                              <IonSelectOption key={option.value} value={option.value}>
                                {option.label}
                              </IonSelectOption>
                            ))}
                          </IonSelect>
                        )}
                        
                        {setting.type === 'range' && (
                          <div className="range-container">
                            <IonRange
                              value={setting.value}
                              onIonChange={e => updateSetting(setting.id, e.detail.value)}
                              min={setting.id === 'fontSize' ? 12 : 5}
                              max={setting.id === 'fontSize' ? 24 : 120}
                              step={setting.id === 'fontSize' ? 2 : 5}
                              snaps
                              className="custom-range"
                            >
                              <IonLabel slot="start">{setting.id === 'fontSize' ? 'A' : '5min'}</IonLabel>
                              <IonLabel slot="end">{setting.value}{setting.id === 'fontSize' ? 'px' : 'min'}</IonLabel>
                            </IonRange>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </IonCardContent>
            </IonCard>

            <IonCard className="section-card">
              <IonCardHeader>
                <IonCardTitle>
                  <div className="section-title">
                    <IonIcon icon={speedometer} />
                    <span>Rendimiento</span>
                  </div>
                </IonCardTitle>
              </IonCardHeader>
              <IonCardContent>
                <div className="performance-stats">
                  <div className="stat-item">
                    <IonIcon icon={batteryFull} className="stat-icon" />
                    <div className="stat-info">
                      <h3>Batería</h3>
                      <p>Uso optimizado</p>
                    </div>
                    <IonBadge color="success">Bajo</IonBadge>
                  </div>
                  
                  <div className="stat-item">
                    <IonIcon icon={wifi} className="stat-icon" />
                    <div className="stat-info">
                      <h3>Datos</h3>
                      <p>Consumo mensual</p>
                    </div>
                    <IonBadge color="primary">15 MB</IonBadge>
                  </div>
                  
                  <div className="stat-item">
                    <IonIcon icon={speedometer} className="stat-icon" />
                    <div className="stat-info">
                      <h3>Rendimiento</h3>
                      <p>Velocidad de la app</p>
                    </div>
                    <IonBadge color="warning">Rápido</IonBadge>
                  </div>
                </div>
              </IonCardContent>
            </IonCard>
          </div>
        )}

        {/* Sección: Apariencia */}
        {activeTab === 'appearance' && (
          <div className="settings-section">
            <IonCard className="section-card">
              <IonCardHeader>
                <IonCardTitle>
                  <div className="section-title">
                    <IonIcon icon={colorPalette} />
                    <span>Tema y Colores</span>
                  </div>
                </IonCardTitle>
              </IonCardHeader>
              <IonCardContent>
                <div className="theme-selector">
                  <div className={`theme-option ${!darkMode ? 'active' : ''}`} onClick={() => setDarkMode(false)}>
                    <div className="theme-preview light">
                      <IonIcon icon={sunny} />
                    </div>
                    <span>Claro</span>
                  </div>
                  
                  <div className={`theme-option ${darkMode ? 'active' : ''}`} onClick={() => setDarkMode(true)}>
                    <div className="theme-preview dark">
                      <IonIcon icon={moon} />
                    </div>
                    <span>Oscuro</span>
                  </div>
                </div>
                
                <div className="color-palette">
                  <h3>Colores principales</h3>
                  <div className="color-grid">
                    {availableColors.map(color => (
                      <div
                        key={color.value}
                        className="color-option"
                        style={{ background: color.gradient }}
                        onClick={() => showToast(`Color ${color.name} seleccionado`, 'primary')}
                      >
                        <div className="color-name">{color.name}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </IonCardContent>
            </IonCard>

            <IonCard className="section-card">
              <IonCardHeader>
                <IonCardTitle>
                  <div className="section-title">
                    <IonIcon icon={brush} />
                    <span>Categorías Personalizadas</span>
                    <IonButton fill="clear" size="small" onClick={() => setShowNewCategoryModal(true)}>
                      <IonIcon icon={add} />
                      Nueva
                    </IonButton>
                  </div>
                </IonCardTitle>
              </IonCardHeader>
              <IonCardContent>
                <div className="categories-grid">
                  {categories.map(category => (
                    <div key={category.id} className="category-card">
                      <div 
                        className="category-color"
                        style={{ background: availableColors.find(c => c.value === category.color)?.gradient }}
                      >
                        <IonIcon icon={category.icon as any} />
                      </div>
                      <div className="category-info">
                        <h4>{category.name}</h4>
                        <p>{category.taskCount} tareas</p>
                      </div>
                      <IonButton 
                        fill="clear" 
                        size="small"
                        className="delete-category"
                        onClick={() => deleteCategory(category.id)}
                      >
                        <IonIcon icon={trash} />
                      </IonButton>
                    </div>
                  ))}
                </div>
                
                {categories.length === 0 && (
                  <div className="empty-categories">
                    <IonIcon icon={add} size="large" />
                    <h3>No hay categorías</h3>
                    <p>Crea tu primera categoría personalizada</p>
                  </div>
                )}
              </IonCardContent>
            </IonCard>
          </div>
        )}

        {/* Sección: Notificaciones */}
        {activeTab === 'notifications' && (
          <div className="settings-section">
            <IonCard className="section-card">
              <IonCardHeader>
                <IonCardTitle>
                  <div className="section-title">
                    <IonIcon icon={notifications} />
                    <span>Configuración de Notificaciones</span>
                  </div>
                </IonCardTitle>
              </IonCardHeader>
              <IonCardContent>
                <div className="settings-list">
                  <div className="setting-item">
                    <div className="setting-info">
                      <div className="setting-icon">
                        <IonIcon icon={notifications} />
                      </div>
                      <div className="setting-text">
                        <h3>Notificaciones Push</h3>
                        <p>Recibir notificaciones en tiempo real</p>
                      </div>
                    </div>
                    <IonToggle
                      checked={getSettingValue('notifications')}
                      onIonChange={e => updateSetting('notifications', e.detail.checked)}
                    />
                  </div>
                  
                  <div className="setting-item">
                    <div className="setting-info">
                      <div className="setting-icon">
                        <IonIcon icon={time} />
                      </div>
                      <div className="setting-text">
                        <h3>Recordatorios diarios</h3>
                        <p>Resumen de tareas cada mañana</p>
                      </div>
                    </div>
                    <IonToggle checked={true} />
                  </div>
                  
                  <div className="setting-item">
                    <div className="setting-info">
                      <div className="setting-icon">
                        <IonIcon icon={alarm} />
                      </div>
                      <div className="setting-text">
                        <h3>Recordatorios de tareas</h3>
                        <p>Avisos antes de cada tarea programada</p>
                      </div>
                    </div>
                    <IonToggle checked={true} />
                  </div>
                  
                  <div className="setting-item">
                    <div className="setting-info">
                      <div className="setting-icon">
                        <IonIcon icon={calendar} />
                      </div>
                      <div className="setting-text">
                        <h3>Resumen semanal</h3>
                        <p>Informe de productividad cada domingo</p>
                      </div>
                    </div>
                    <IonToggle checked={false} />
                  </div>
                </div>
              </IonCardContent>
            </IonCard>

            <IonCard className="section-card">
              <IonCardHeader>
                <IonCardTitle>
                  <div className="section-title">
                    <IonIcon icon={lockClosed} />
                    <span>Privacidad</span>
                  </div>
                </IonCardTitle>
              </IonCardHeader>
              <IonCardContent>
                <div className="settings-list">
                  <div className="setting-item">
                    <div className="setting-info">
                      <div className="setting-icon">
                        <IonIcon icon={eye} />
                      </div>
                      <div className="setting-text">
                        <h3>Modo privado</h3>
                        <p>Ocultar detalles en notificaciones</p>
                      </div>
                    </div>
                    <IonToggle />
                  </div>
                  
                  <div className="setting-item">
                    <div className="setting-info">
                      <div className="setting-icon">
                        <IonIcon icon={shield} />
                      </div>
                      <div className="setting-text">
                        <h3>Autenticación biométrica</h3>
                        <p>Huella dactilar o reconocimiento facial</p>
                      </div>
                    </div>
                    <IonToggle />
                  </div>
                </div>
              </IonCardContent>
            </IonCard>
          </div>
        )}

        {/* Sección: Datos */}
        {activeTab === 'data' && (
          <div className="settings-section">
            <IonCard className="section-card">
              <IonCardHeader>
                <IonCardTitle>
                  <div className="section-title">
                    <IonIcon icon={cloud} />
                    <span>Almacenamiento y Sincronización</span>
                  </div>
                </IonCardTitle>
              </IonCardHeader>
              <IonCardContent>
                <div className="storage-info">
                  <div className="storage-header">
                    <h3>Uso de Almacenamiento</h3>
                    <IonBadge color="primary">{storageUsage}%</IonBadge>
                  </div>
                  
                  <IonProgressBar value={storageUsage / 100} className="storage-bar" />
                  
                  <div className="storage-stats">
                    <div className="storage-stat">
                      <h4>{tasksCount}</h4>
                      <p>Tareas</p>
                    </div>
                    <div className="storage-stat">
                      <h4>{categoriesCount}</h4>
                      <p>Categorías</p>
                    </div>
                    <div className="storage-stat">
                      <h4>{lastBackup}</h4>
                      <p>Último backup</p>
                    </div>
                  </div>
                </div>
                
                <div className="settings-list">
                  <div className="setting-item">
                    <div className="setting-info">
                      <div className="setting-icon">
                        <IonIcon icon={sync} />
                      </div>
                      <div className="setting-text">
                        <h3>Sincronización en la nube</h3>
                        <p>Sincronizar entre dispositivos</p>
                      </div>
                    </div>
                    <IonToggle
                      checked={getSettingValue('sync')}
                      onIonChange={e => updateSetting('sync', e.detail.checked)}
                    />
                  </div>
                  
                  <div className="setting-item">
                    <div className="setting-info">
                      <div className="setting-icon">
                        <IonIcon icon={cloud} />
                      </div>
                      <div className="setting-text">
                        <h3>Backup automático</h3>
                        <p>Crear backups automáticamente</p>
                      </div>
                    </div>
                    <IonToggle
                      checked={getSettingValue('autoBackup')}
                      onIonChange={e => updateSetting('autoBackup', e.detail.checked)}
                    />
                  </div>
                </div>
              </IonCardContent>
            </IonCard>

            <IonCard className="section-card">
              <IonCardHeader>
                <IonCardTitle>
                  <div className="section-title">
                    <IonIcon icon={download} />
                    <span>Gestión de Datos</span>
                  </div>
                </IonCardTitle>
              </IonCardHeader>
              <IonCardContent>
                <div className="data-actions">
                  <IonGrid>
                    <IonRow>
                      <IonCol size="6">
                        <IonButton expand="block" fill="outline" className="data-btn">
                          <IonIcon icon={download} slot="start" />
                          Exportar
                        </IonButton>
                      </IonCol>
                      <IonCol size="6">
                        <IonButton expand="block" fill="outline" className="data-btn">
                          <IonIcon icon={upload} slot="start" />
                          Importar
                        </IonButton>
                      </IonCol>
                      <IonCol size="6">
                        <IonButton expand="block" fill="outline" className="data-btn">
                          <IonIcon icon={cloud} slot="start" />
                          Crear Backup
                        </IonButton>
                      </IonCol>
                      <IonCol size="6">
                        <IonButton 
                          expand="block" 
                          fill="outline" 
                          color="danger"
                          className="data-btn"
                          onClick={() => setShowDeleteAlert(true)}
                        >
                          <IonIcon icon={trash} slot="start" />
                          Borrar Todo
                        </IonButton>
                      </IonCol>
                    </IonRow>
                  </IonGrid>
                </div>
              </IonCardContent>
            </IonCard>
          </div>
        )}

        {/* Sección: Acerca de */}
        {activeTab === 'about' && (
          <div className="settings-section">
            <IonCard className="section-card">
              <IonCardHeader>
                <IonCardTitle>
                  <div className="section-title">
                    <IonIcon icon={informationCircle} />
                    <span>Acerca de la Aplicación</span>
                  </div>
                </IonCardTitle>
              </IonCardHeader>
              <IonCardContent>
                <div className="about-app">
                  <div className="app-logo">
                    <div className="logo-icon">
                      <IonIcon icon={rocket} />
                    </div>
                    <div className="app-info">
                      <h2>{appInfo.name}</h2>
                      <p className="version">Versión {appInfo.version} (Build {appInfo.build})</p>
                    </div>
                  </div>
                  
                  <p className="app-description">{appInfo.description}</p>
                  
                  <div className="app-stats">
                    <div className="stat-card">
                      <IonIcon icon={trophy} />
                      <h3>4.8</h3>
                      <p>Calificación</p>
                    </div>
                    <div className="stat-card">
                      <IonIcon icon={people} />
                      <h3>10K+</h3>
                      <p>Usuarios</p>
                    </div>
                    <div className="stat-card">
                      <IonIcon icon={cloud} />
                      <h3>99%</h3>
                      <p>Disponibilidad</p>
                    </div>
                  </div>
                </div>
              </IonCardContent>
            </IonCard>

            <IonCard className="section-card">
              <IonCardHeader>
                <IonCardTitle>
                  <div className="section-title">
                    <IonIcon icon={helpCircle} />
                    <span>Soporte y Ayuda</span>
                  </div>
                </IonCardTitle>
              </IonCardHeader>
              <IonCardContent>
                <div className="support-options">
                  <IonButton expand="block" fill="outline" className="support-btn">
                    <IonIcon icon={mail} slot="start" />
                    Contactar Soporte
                  </IonButton>
                  
                  <IonButton expand="block" fill="outline" className="support-btn">
                    <IonIcon icon={documentText} slot="start" />
                    Preguntas Frecuentes
                  </IonButton>
                  
                  <IonButton expand="block" fill="outline" className="support-btn">
                    <IonIcon icon={bug} slot="start" />
                    Reportar un Error
                  </IonButton>
                  
                  <IonButton expand="block" fill="outline" className="support-btn">
                    <IonIcon icon={star} slot="start" />
                    Sugerir una Función
                  </IonButton>
                </div>
              </IonCardContent>
            </IonCard>

            <IonCard className="section-card">
              <IonCardHeader>
                <IonCardTitle>
                  <div className="section-title">
                    <IonIcon icon={people} />
                    <span>Síguenos</span>
                  </div>
                </IonCardTitle>
              </IonCardHeader>
              <IonCardContent>
                <div className="social-links">
                  <IonButton fill="clear" className="social-btn">
                    <IonIcon icon={logoTwitter} />
                  </IonButton>
                  <IonButton fill="clear" className="social-btn">
                    <IonIcon icon={logoFacebook} />
                  </IonButton>
                  <IonButton fill="clear" className="social-btn">
                    <IonIcon icon={logoInstagram} />
                  </IonButton>
                  <IonButton fill="clear" className="social-btn">
                    <IonIcon icon={logoLinkedin} />
                  </IonButton>
                  <IonButton fill="clear" className="social-btn">
                    <IonIcon icon={logoGithub} />
                  </IonButton>
                </div>
              </IonCardContent>
            </IonCard>
          </div>
        )}

        {/* Modal para nueva categoría */}
        <IonModal 
          isOpen={showNewCategoryModal} 
          onDidDismiss={() => setShowNewCategoryModal(false)}
          className="category-modal"
        >
          <IonHeader className="modal-header">
            <IonToolbar>
              <IonTitle>Nueva Categoría</IonTitle>
              <IonButtons slot="end">
                <IonButton onClick={() => setShowNewCategoryModal(false)}>
                  <IonIcon icon={close} />
                </IonButton>
              </IonButtons>
            </IonToolbar>
          </IonHeader>
          <IonContent className="modal-content">
            <div className="form-container">
              <div className="form-group">
                <label>Nombre de la categoría</label>
                <IonInput
                  value={newCategoryName}
                  onIonChange={e => setNewCategoryName(e.detail.value!)}
                  placeholder="Ej: Proyectos, Hogar, etc."
                  className="form-input"
                  autofocus
                />
              </div>

              <div className="form-group">
                <label>Color</label>
                <div className="color-selector">
                  {availableColors.map(color => (
                    <button
                      key={color.value}
                      className={`color-option-btn ${newCategoryColor === color.value ? 'selected' : ''}`}
                      style={{ background: color.gradient }}
                      onClick={() => setNewCategoryColor(color.value)}
                      title={color.name}
                    />
                  ))}
                </div>
              </div>

              <IonButton 
                expand="block" 
                className="submit-btn"
                onClick={addNewCategory}
                disabled={!newCategoryName.trim()}
              >
                <IonIcon icon={add} slot="start" />
                Crear Categoría
              </IonButton>
            </div>
          </IonContent>
        </IonModal>

        {/* Alerta para borrar datos */}
        <IonAlert
          isOpen={showDeleteAlert}
          onDidDismiss={() => setShowDeleteAlert(false)}
          header="¿Borrar todos los datos?"
          message="Esta acción eliminará TODAS tus tareas, categorías y configuraciones. Esta acción NO se puede deshacer."
          buttons={[
            {
              text: 'Cancelar',
              role: 'cancel',
              cssClass: 'secondary'
            },
            {
              text: 'Borrar Todo',
              role: 'destructive',
              handler: deleteAllData
            }
          ]}
        />
      </IonContent>

      {/* Footer */}
      <IonFooter className="settings-footer">
        <div className="footer-content">
          <IonText color="medium">
            <p className="footer-text">
              {appInfo.name} v{appInfo.version} • © {new Date().getFullYear()} • {appInfo.developer}
            </p>
          </IonText>
        </div>
      </IonFooter>
    </IonPage>
  );
};

export default Tab3;