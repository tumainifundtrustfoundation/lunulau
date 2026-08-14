import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { registerSW } from 'virtual:pwa-register';
import App from './App.tsx';
import { ErrorBoundary } from './components/ErrorBoundary.tsx';
import './index.css';

// Auto-register and automatically update service worker via vite-plugin-pwa
const updateSW = registerSW({
  immediate: true,
  onNeedRefresh() {
    console.log('[PWA] New version detected; refreshing application...');
    updateSW(true);
  },
  onOfflineReady() {
    console.log('[PWA] App is ready to work offline with full caching.');
  },
  onRegistered(r) {
    console.log('[PWA] Service Worker registered successfully:', r?.scope);
  },
  onRegisterError(error) {
    console.error('[PWA] Service Worker registration failed:', error);
  },
});

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </StrictMode>,
);


