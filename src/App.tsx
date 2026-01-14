import React from 'react';
import { Redirect, Route } from 'react-router-dom';

import {
  IonApp,
  IonRouterOutlet,
  IonTabs,
  IonTabBar,
  IonTabButton,
  IonIcon,
  IonLabel
} from '@ionic/react';

import { IonReactRouter } from '@ionic/react-router';

import {
  listOutline,
  analyticsOutline,
  settingsOutline
} from 'ionicons/icons';

import Tab1 from './pages/Tab1';
import Tab2 from './pages/Tab2';
import Tab3 from './pages/Tab3';

import { TaskProvider } from './context/TaskContext';

/* CSS */
import '@ionic/react/css/core.css';
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';
import '@ionic/react/css/padding.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

import './theme/variables.css';
import './App.css';

const App: React.FC = () => {
  return (
    <TaskProvider>
      <IonApp>
        <IonReactRouter>
          <IonTabs>

            <IonRouterOutlet>
              <Route exact path="/tab1" component={Tab1} />
              <Route exact path="/tab2" component={Tab2} />
              <Route exact path="/tab3" component={Tab3} />
              <Route exact path="/">
                <Redirect to="/tab1" />
              </Route>
            </IonRouterOutlet>

            <IonTabBar slot="bottom">
              <IonTabButton tab="tab1" href="/tab1">
                <IonIcon icon={listOutline} />
                <IonLabel>Tareas</IonLabel>
              </IonTabButton>

              <IonTabButton tab="tab2" href="/tab2">
                <IonIcon icon={analyticsOutline} />
                <IonLabel>Resumen</IonLabel>
              </IonTabButton>

              <IonTabButton tab="tab3" href="/tab3">
                <IonIcon icon={settingsOutline} />
                <IonLabel>Ajustes</IonLabel>
              </IonTabButton>
            </IonTabBar>

          </IonTabs>
        </IonReactRouter>
      </IonApp>
    </TaskProvider>
  );
};

export default App;
