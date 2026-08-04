/**
 * Lupanulla Elimu Hub - Service Worker (service-worker.js)
 * --------------------------------------------------------
 * High-performance PWA Service Worker for offline access to study notes,
 * NECTA past papers, static assets, and dynamic API caching.
 */

const CACHE_VERSION = 'v3';
const CACHE_NAMES = {
  APP_SHELL: `lupanulla-app-shell-${CACHE_VERSION}`,
  STUDY_NOTES: `lupanulla-study-notes-${CACHE_VERSION}`,
  PAST_PAPERS: `lupanulla-past-papers-${CACHE_VERSION}`,
  ASSETS: `lupanulla-static-assets-${CACHE_VERSION}`,
  API: `lupanulla-api-cache-${CACHE_VERSION}`
};

const PRECACHE_APP_SHELL = [
  '/',
  '/index.html',
  '/manifest.json',
  '/manifest.webmanifest',
  '/icon.svg',
  '/logo.jpg',
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

const EXTERNAL_CDNS = [
  'https://fonts.gstatic.com',
  'https://fonts.googleapis.com',
  'https://cdnjs.cloudflare.com',
  'https://unpkg.com'
];

// Helper: Determine if URL is a study note resource
function isStudyNoteRequest(urlStr, request) {
  const url = new URL(urlStr);
  return (
    url.pathname.includes('/api/notes') ||
    url.pathname.includes('/notes') ||
    url.pathname.includes('/masomo') ||
    url.search.includes('view=masomo') ||
    url.search.includes('topic=') ||
    (url.pathname.endsWith('.pdf') && urlStr.includes('note'))
  );
}

// Helper: Determine if URL is a past paper resource
function isPastPaperRequest(urlStr, request) {
  const url = new URL(urlStr);
  return (
    url.pathname.includes('/api/pastpapers') ||
    url.pathname.includes('/api/mitihani') ||
    url.pathname.includes('/necta') ||
    url.pathname.includes('/mock') ||
    url.search.includes('view=mitihani') ||
    urlStr.toLowerCase().includes('necta') ||
    urlStr.toLowerCase().includes('past-paper') ||
    (url.pathname.endsWith('.pdf') && (urlStr.includes('exam') || urlStr.includes('paper') || urlStr.includes('necta')))
  );
}

// Helper: Send message to all connected clients
async function notifyClients(message) {
  const clients = await self.clients.matchAll({ includeUncontrolled: true, type: 'window' });
  for (const client of clients) {
    client.postMessage(message);
  }
}

// 1. Install Event - Precache Core App Shell
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAMES.APP_SHELL).then(async (cache) => {
      console.log('[Lupanulla SW] Precaching core app shell assets');
      try {
        await cache.addAll(PRECACHE_APP_SHELL);
      } catch (err) {
        console.warn('[Lupanulla SW] App shell precache warning:', err);
      }
    }).then(() => self.skipWaiting())
  );
});

// 2. Activate Event - Clean Up Obsolete Caches
self.addEventListener('activate', (event) => {
  const currentCacheValues = Object.values(CACHE_NAMES);
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cache) => {
          if (!currentCacheValues.includes(cache)) {
            console.log('[Lupanulla SW] Deleting obsolete cache:', cache);
            return caches.delete(cache);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

// 3. Fetch Event - Intelligent Caching Strategies
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // A. Navigation requests (HTML pages & SPA routes) -> Network First with fallback to index.html
  if (request.mode === 'navigate') {
    event.respondWith(
      fetch(request)
        .then((response) => {
          if (response && response.status === 200) {
            const responseClone = response.clone();
            caches.open(CACHE_NAMES.APP_SHELL).then((cache) => {
              cache.put(request, responseClone);
            });
          }
          return response;
        })
        .catch(() => {
          return caches.match(request).then((cachedResponse) => {
            if (cachedResponse) return cachedResponse;
            return caches.match('/index.html') || caches.match('/');
          });
        })
    );
    return;
  }

  // B. Skip Non-GET requests, Firebase WebSockets/Auth, and Vite HMR
  if (
    request.method !== 'GET' ||
    url.hostname.includes('firestore.googleapis.com') ||
    url.hostname.includes('identitytoolkit.googleapis.com') ||
    url.pathname.includes('/ws') ||
    url.search.includes('hmr')
  ) {
    return;
  }

  // C. Study Notes Requests -> Cache First with Background Refresh
  if (isStudyNoteRequest(request.url, request)) {
    event.respondWith(
      caches.open(CACHE_NAMES.STUDY_NOTES).then(async (cache) => {
        const cachedResponse = await cache.match(request);
        const fetchPromise = fetch(request)
          .then((networkResponse) => {
            if (networkResponse && networkResponse.status === 200) {
              cache.put(request, networkResponse.clone());
            }
            return networkResponse;
          })
          .catch((err) => {
            console.warn('[Lupanulla SW] Study notes offline fallback:', err);
          });

        return cachedResponse || fetchPromise;
      })
    );
    return;
  }

  // D. Past Papers & NECTA Exam Requests -> Cache First with Background Refresh
  if (isPastPaperRequest(request.url, request)) {
    event.respondWith(
      caches.open(CACHE_NAMES.PAST_PAPERS).then(async (cache) => {
        const cachedResponse = await cache.match(request);
        const fetchPromise = fetch(request)
          .then((networkResponse) => {
            if (networkResponse && networkResponse.status === 200) {
              cache.put(request, networkResponse.clone());
            }
            return networkResponse;
          })
          .catch((err) => {
            console.warn('[Lupanulla SW] Past paper offline fallback:', err);
          });

        return cachedResponse || fetchPromise;
      })
    );
    return;
  }

  // E. Static Assets & External CDNs -> Stale While Revalidate
  const isStaticAsset =
    url.origin === self.location.origin ||
    EXTERNAL_CDNS.some((cdn) => request.url.startsWith(cdn));

  if (isStaticAsset && !url.pathname.startsWith('/api/')) {
    event.respondWith(
      caches.open(CACHE_NAMES.ASSETS).then((cache) => {
        return cache.match(request).then((cachedResponse) => {
          const fetchPromise = fetch(request)
            .then((networkResponse) => {
              if (networkResponse && networkResponse.status === 200) {
                cache.put(request, networkResponse.clone());
              }
              return networkResponse;
            })
            .catch((err) => {
              console.warn('[Lupanulla SW] Static asset background fetch error:', err);
            });

          return cachedResponse || fetchPromise;
        });
      })
    );
    return;
  }

  // F. Dynamic API Requests -> Network First with Cached Fallback
  if (url.pathname.startsWith('/api/')) {
    event.respondWith(
      fetch(request)
        .then((networkResponse) => {
          if (networkResponse && networkResponse.status === 200) {
            const responseClone = networkResponse.clone();
            caches.open(CACHE_NAMES.API).then((cache) => {
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
                message: 'Mada na rasilimali zote ulizozihifadhi ziko tayari kwa matumizi offline.',
                offline: true,
                timestamp: Date.now()
              }),
              {
                headers: { 'Content-Type': 'application/json' },
                status: 200
              }
            );
          });
        })
    );
  }
});

// 4. Message Event Handler (Inter-process communication with client UI)
self.addEventListener('message', async (event) => {
  if (!event.data) return;

  const { type, payload, favorites, assets } = event.data;

  // A. Skip Waiting
  if (type === 'SKIP_WAITING') {
    self.skipWaiting();
    return;
  }

  // B. Sync Favorites / Offline Study Topics
  if (type === 'SYNC_FAVORITES' || type === 'CACHE_FAVORITES') {
    const topicList = favorites || payload || [];
    console.log('[Lupanulla SW] Syncing favorite study topics offline:', topicList.length);

    try {
      const notesCache = await caches.open(CACHE_NAMES.STUDY_NOTES);
      let cachedCount = 0;

      for (const topic of topicList) {
        const topicUrl = typeof topic === 'string' 
          ? `/?view=masomo&topic=${encodeURIComponent(topic)}`
          : topic.url || `/?view=masomo&topic=${encodeURIComponent(topic.title || topic.name || '')}`;

        try {
          const res = await fetch(topicUrl, { mode: 'no-cors' });
          if (res) {
            await notesCache.put(topicUrl, res);
            cachedCount++;
          }
        } catch (e) {
          console.warn('[Lupanulla SW] Failed to cache individual topic URL:', topicUrl, e);
        }
      }

      await notifyClients({
        type: 'SYNC_COMPLETE',
        timestamp: Date.now(),
        cachedCount,
        message: 'Masomo yote unayoyapenda yamesawazishwa offline kwa ufanisi!'
      });
    } catch (err) {
      console.error('[Lupanulla SW] Sync favorites error:', err);
    }
    return;
  }

  // C. Cache Explicit Study Assets & Past Papers
  if (type === 'CACHE_STUDY_ASSETS' || type === 'CACHE_PAST_PAPERS') {
    const assetUrls = assets || payload || [];
    console.log('[Lupanulla SW] Explicitly caching study assets:', assetUrls.length);

    try {
      const papersCache = await caches.open(CACHE_NAMES.PAST_PAPERS);
      const notesCache = await caches.open(CACHE_NAMES.STUDY_NOTES);
      let successCount = 0;

      for (const urlStr of assetUrls) {
        try {
          const res = await fetch(urlStr, { mode: 'no-cors' });
          if (res) {
            if (isPastPaperRequest(urlStr)) {
              await papersCache.put(urlStr, res);
            } else {
              await notesCache.put(urlStr, res);
            }
            successCount++;
          }
        } catch (e) {
          console.warn('[Lupanulla SW] Asset fetch error:', urlStr, e);
        }
      }

      await notifyClients({
        type: 'STUDY_ASSETS_CACHED',
        timestamp: Date.now(),
        successCount,
        totalRequested: assetUrls.length
      });
    } catch (err) {
      console.error('[Lupanulla SW] Cache study assets error:', err);
    }
    return;
  }

  // D. Query Offline Status & Cache Counts
  if (type === 'CHECK_OFFLINE_STATUS') {
    try {
      const notesCache = await caches.open(CACHE_NAMES.STUDY_NOTES);
      const papersCache = await caches.open(CACHE_NAMES.PAST_PAPERS);
      const notesKeys = await notesCache.keys();
      const papersKeys = await papersCache.keys();

      if (event.source && event.source.postMessage) {
        event.source.postMessage({
          type: 'OFFLINE_STATUS_RESPONSE',
          isOffline: !navigator.onLine,
          notesCount: notesKeys.length,
          papersCount: papersKeys.length,
          totalCached: notesKeys.length + papersKeys.length,
          timestamp: Date.now()
        });
      }
    } catch (err) {
      console.error('[Lupanulla SW] Check offline status error:', err);
    }
  }
});
