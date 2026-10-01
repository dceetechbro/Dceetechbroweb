import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import App from './App.jsx';
import ErrorBoundary from './components/ui/ErrorBoundary/ErrorBoundary';

import './styles/globals.css';
import './styles/variables.css';
import './styles/typography.css';
import './styles/utilities.css';
import './styles/responsive.css';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </StrictMode>,
);