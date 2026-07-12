import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { HashRouter } from 'react-router-dom';
import './index.css';
import App from './App.jsx';
import { HealthDataProvider } from './context/HealthDataContext';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <HashRouter>
      <HealthDataProvider>
        <App />
      </HealthDataProvider>
    </HashRouter>
  </StrictMode>
);
