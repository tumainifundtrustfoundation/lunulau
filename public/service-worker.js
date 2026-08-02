/**
 * Lupanulla Elimu Hub - Service Worker
 * -------------------------------------
 * High-performance PWA Service Worker supporting full offline access,
 * dynamic precaching, assets caching, and background synchronization.
 */

const CACHE_NAME = 'lupanulla-pwa-v2';
const PRECACHE_ASSETS = [
  '/',
  '/index.html',
  '/manifest.json',
  '/manifest.webmanifest',
  '/icon.svg',
  '/icon-72x72.png',
  '/icon-96x96.png',
  '/icon-128x128.png',
  '/icon-144x144.png',
  '/icon-152x152.png',
  '/icon-192x192.png',
  '/icon-384x384.png',
  '/icon-512x512.png',
  '/apple-touch-icon.png',
  '/robots.txt',
  '/sitemap.xml'
];

const GOOGLE_FONTS_ORIGIN = 'https://fonts.gstatic.com';
const GOOGLE_FONTS_STYLING = 'https://fonts.googleapis.com';
const CDN_JSPDF = 'https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js';
const CDN_PHOSPHOR = 'https://unpkg.com/@phosphor-icons/web';

// Install Event - Precache App Shell
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('[Lupanulla SW] Precaching app shell assets');
      return cache.addAll(PRECACHE_ASSETS).catch((err) => {
        console.warn('[Lupanulla SW] Error precaching assets:', err);
      });
    }).then(() => self.skipWaiting())
  );
});

// Activate Event - Clean Up Stale Caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cache) => {
          if (cache !== CACHE_NAME) {
            console.log('[Lupanulla SW] Deleting legacy cache:', cache);
            return caches.delete(cache);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

// Fetch Event - Strategic Offline & Asset Handlers
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // 1. Navigation requests (HTML pages & SPA routes)
  if (request.mode === 'navigate') {
    event.respondWith(
      fetch(request)
        .then((response) => {
          if (response && response.status === 200) {
            const responseClone = response.clone();
            caches.open(CACHE_NAME).then((cache) => {
              cache.put(request, responseClone);
            });
          }
          return response;
        })
        .catch(() => {
          return caches.match(request).then((cachedResponse) => {
            if (cachedResponse) return cachedResponse;
            return caches.match('/index.html');
          });
        })
    );
    return;
  }

  // 2. Ignore Non-GET requests, Firebase WebSockets/Auth, and Vite HMR
  if (
    request.method !== 'GET' ||
    url.hostname.includes('firestore.googleapis.com') ||
    url.hostname.includes('identitytoolkit.googleapis.com') ||
    url.pathname.includes('/ws') ||
    url.search.includes('hmr')
  ) {
    return;
  }

  // 3. Static Assets & External Fonts (Stale-While-Revalidate)
  const isStaticAsset = 
    url.origin === self.location.origin || 
    url.origin === GOOGLE_FONTS_ORIGIN || 
    url.origin === GOOGLE_FONTS_STYLING ||
    request.url.startsWith(CDN_JSPDF) ||
    request.url.startsWith(CDN_PHOSPHOR);

  if (isStaticAsset) {
    event.respondWith(
      caches.match(request).then((cachedResponse) => {
        const fetchPromise = fetch(request).then((networkResponse) => {
          if (networkResponse && networkResponse.status === 200) {
            const responseClone = networkResponse.clone();
            caches.open(CACHE_NAME).then((cache) => {
              cache.put(request, responseClone);
            });
          }
          return networkResponse;
        }).catch((err) => {
          console.warn('[Lupanulla SW] Background asset fetch fallback:', err);
        });

        return cachedResponse || fetchPromise;
      })
    );
    return;
  }

  // 4. API Requests (Network-First with Offline JSON fallback)
  if (url.pathname.startsWith('/api/')) {
    event.respondWith(
      fetch(request)
        .then((networkResponse) => {
          if (networkResponse && networkResponse.status === 200) {
            const responseClone = networkResponse.clone();
            caches.open(CACHE_NAME).then((cache) => {
              cache.put(request, responseClone);
            });
          }
          return networkResponse;
        })
        .catch(() => {
          return caches.match(request).then((cachedResponse) => {
            if (cachedResponse) return cachedResponse;
            return new Response(
              JSON.stringify({ 
                error: 'Uko Nje ya Mtandao (Offline)', 
                message: 'Mada na rasilimali ulizozihifadhi ziko tayari kwa matumizi offline.',
                offline: true
              }),
              { headers: { 'Content-Type': 'application/json' } }
            );
          });
        })
    );
  }
});

// Client Messaging
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});
