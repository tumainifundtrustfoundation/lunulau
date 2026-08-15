import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { registerSW } from 'virtual:pwa-register';
import App from './App.tsx';
import { ErrorBoundary } from './components/ErrorBoundary.tsx';
import './index.css';

// Auto-register and automatically update service worker via vite-plugin-pwa in production
let updateSW: ((reloadPage?: boolean) => Promise<void>) | undefined;
if (typeof window !== 'undefined' && 'serviceWorker' in navigator) {
  if (import.meta.env.DEV) {
    // In dev sandbox, cleanup any lingering dev service workers to avoid registration conflicts
    navigator.serviceWorker.getRegistrations().then((registrations) => {
      for (const registration of registrations) {
        if (registration.active?.scriptURL.includes('dev-sw')) {
          registration.unregister();
        }
      }
    }).catch(() => {});
  } else {
    try {
      updateSW = registerSW({
        immediate: true,
        onNeedRefresh() {
          console.log('[PWA] New version detected; refreshing application...');
          if (updateSW) updateSW(true);
        },
        onOfflineReady() {
          console.log('[PWA] App is ready to work offline with full caching.');
        },
        onRegistered(r) {
          console.log('[PWA] Service Worker registered successfully:', r?.scope);
        },
        onRegisterError(error) {
          console.warn('[PWA] Service Worker registration info:', error);
        },
      });
    } catch (err) {
      console.warn('[PWA] Service worker initialization skipped:', err);
    }
  }
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </StrictMode>,
);


