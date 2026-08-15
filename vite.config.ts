import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig } from 'vite';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig(() => {
  return {
    plugins: [
      react(),
      tailwindcss(),
      VitePWA({
        registerType: 'autoUpdate',
        injectRegister: 'auto',
        includeAssets: [
          'favicon-16x16.png',
          'favicon-32x32.png',
          'apple-touch-icon.png',
          'icon.svg',
          'logo.jpg',
          'robots.txt',
        ],
        manifest: {
          name: 'Lupanulla Elimu Hub',
          short_name: 'Lupanulla',
          description: 'Kitovu cha Elimu Tanzania - Notisi, Mitihani ya NECTA, Ratiba, Matokeo, Vitabu na Msaidizi wa AI',
          theme_color: '#0891b2',
          background_color: '#ffffff',
          display: 'standalone',
          orientation: 'portrait',
          scope: '/',
          start_url: '/',
          categories: ['education', 'books', 'productivity'],
          icons: [
            {
              src: '/icon-192x192.png',
              sizes: '192x192',
              type: 'image/png',
              purpose: 'any',
            },
            {
              src: '/icon-192x192.png',
              sizes: '192x192',
              type: 'image/png',
              purpose: 'maskable',
            },
            {
              src: '/icon-512x512.png',
              sizes: '512x512',
              type: 'image/png',
              purpose: 'any',
            },
            {
              src: '/icon-512x512.png',
              sizes: '512x512',
              type: 'image/png',
              purpose: 'maskable',
            },
            {
              src: '/icon.svg',
              sizes: 'any',
              type: 'image/svg+xml',
              purpose: 'any maskable',
            },
          ],
        },
        workbox: {
          globPatterns: ['**/*.{js,css,html,ico,png,svg,webp,json,woff2}'],
          maximumFileSizeToCacheInBytes: 15 * 1024 * 1024, // 15MB
          cleanupOutdatedCaches: true,
          clientsClaim: true,
          skipWaiting: true,
          navigateFallback: '/index.html',
          navigateFallbackDenylist: [/^\/api\//, /^\/oauth\//],
          runtimeCaching: [
            // 1. Google Drive & Docs Previews for NECTA Past Papers (Background prefetching & offline fallback)
            {
              urlPattern: /^https:\/\/(?:drive|docs)\.google\.com\/.*/i,
              handler: 'StaleWhileRevalidate',
              options: {
                cacheName: 'necta-past-papers-drive-cache',
                expiration: {
                  maxEntries: 500,
                  maxAgeSeconds: 90 * 24 * 60 * 60, // 90 days
                },
                cacheableResponse: {
                  statuses: [0, 200],
                },
              },
            },
            // 2. Google User Content CDN (PDF previews, thumbnails, diagram images)
            {
              urlPattern: /^https:\/\/.*\.googleusercontent\.com\/.*/i,
              handler: 'StaleWhileRevalidate',
              options: {
                cacheName: 'necta-google-usercontent-cache',
                expiration: {
                  maxEntries: 500,
                  maxAgeSeconds: 90 * 24 * 60 * 60, // 90 days
                },
                cacheableResponse: {
                  statuses: [0, 200],
                },
              },
            },
            // 3. Direct PDF Documents & NECTA Exam Files (Cache-first for instant offline viewing)
            {
              urlPattern: /\.(?:pdf|doc|docx|epub)$/i,
              handler: 'CacheFirst',
              options: {
                cacheName: 'necta-past-papers-pdf-vault',
                expiration: {
                  maxEntries: 400,
                  maxAgeSeconds: 180 * 24 * 60 * 60, // 180 days
                },
                cacheableResponse: {
                  statuses: [0, 200],
                },
              },
            },
            // 4. Maktaba Tetea & National Examination Repositories
            {
              urlPattern: /^https:\/\/maktaba\.tetea\.org\/past-papers\/.*/i,
              handler: 'StaleWhileRevalidate',
              options: {
                cacheName: 'necta-tetea-papers-cache',
                expiration: {
                  maxEntries: 300,
                  maxAgeSeconds: 120 * 24 * 60 * 60, // 120 days
                },
                cacheableResponse: {
                  statuses: [0, 200],
                },
              },
            },
            // 5. Firestore & Firebase Academic Documents & Exam Metadata
            {
              urlPattern: /^https:\/\/(?:firestore|firebasestorage)\.googleapis\.com\/.*/i,
              handler: 'NetworkFirst',
              options: {
                cacheName: 'necta-firestore-documents-cache',
                networkTimeoutSeconds: 3,
                expiration: {
                  maxEntries: 300,
                  maxAgeSeconds: 30 * 24 * 60 * 60, // 30 days
                },
                cacheableResponse: {
                  statuses: [0, 200],
                },
              },
            },
            // 6. Internal Academic APIs, Exam Metadata & Local Data
            {
              urlPattern: /^\/api\/(?:documents|mitihani|pastpapers|exams|necta|notes|masomo|search).*/i,
              handler: 'StaleWhileRevalidate',
              options: {
                cacheName: 'necta-api-past-papers-cache',
                expiration: {
                  maxEntries: 200,
                  maxAgeSeconds: 30 * 24 * 60 * 60, // 30 days
                },
                cacheableResponse: {
                  statuses: [0, 200],
                },
              },
            },
            // 7. Static Diagrams, Educational Images & Web Assets
            {
              urlPattern: /\.(?:png|jpg|jpeg|svg|gif|webp|ico)$/i,
              handler: 'CacheFirst',
              options: {
                cacheName: 'necta-static-images-cache',
                expiration: {
                  maxEntries: 250,
                  maxAgeSeconds: 60 * 24 * 60 * 60, // 60 days
                },
                cacheableResponse: {
                  statuses: [0, 200],
                },
              },
            },
            // 8. Google Fonts Stylesheets
            {
              urlPattern: /^https:\/\/fonts\.googleapis\.com\/.*/i,
              handler: 'CacheFirst',
              options: {
                cacheName: 'google-fonts-stylesheets',
                expiration: {
                  maxEntries: 10,
                  maxAgeSeconds: 60 * 60 * 24 * 365,
                },
                cacheableResponse: {
                  statuses: [0, 200],
                },
              },
            },
            // 9. Google Fonts Webfonts
            {
              urlPattern: /^https:\/\/fonts\.gstatic\.com\/.*/i,
              handler: 'CacheFirst',
              options: {
                cacheName: 'google-fonts-webfonts',
                expiration: {
                  maxEntries: 30,
                  maxAgeSeconds: 60 * 60 * 24 * 365,
                },
                cacheableResponse: {
                  statuses: [0, 200],
                },
              },
            },
          ],
        },
        devOptions: {
          enabled: false,
        },
      }),
    ],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
      dedupe: ['react', 'react-dom'],
    },
    optimizeDeps: {
      include: ['react', 'react-dom', 'motion', 'motion/react', 'lucide-react'],
    },
    server: {
      hmr: process.env.DISABLE_HMR !== 'true',
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
