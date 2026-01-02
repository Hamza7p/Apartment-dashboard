import { createRoot } from 'react-dom/client'
import './index.css'
import { router } from './routes/router.jsx';
import { StrictMode } from 'react';
import ToastNotification from './utils/ToastNotificaton.jsx';
import AppProviders from './providers/AppProviders.jsx';
import { RouterProvider } from 'react-router';
import './assets/fonts/font.css';
import './i18n'; // Initialize i18n

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AppProviders>
      <RouterProvider router={router} />
      <ToastNotification />
    </AppProviders>
  </StrictMode>
);



