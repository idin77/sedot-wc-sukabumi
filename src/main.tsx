import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { AnnouncementProvider } from './context/AnnouncementContext';
import { I18nProvider } from './context/I18nContext';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <I18nProvider>
      <AnnouncementProvider>
        <App />
      </AnnouncementProvider>
    </I18nProvider>
  </StrictMode>,
);
