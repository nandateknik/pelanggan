const CACHE_NAME = 'nanda-teknik-v1';
const ASSETS_TO_CACHE = [
  '/',
  '/index.html', // Sesuaikan jika nama file utama Anda berbeda
  'https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;600;700;800&display=swap',
  'https://cdn.tailwindcss.com'
];

// Install Service Worker
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS_TO_CACHE);
    })
  );
});

// Aktivasi & Pembersihan Cache Lama
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cache) => {
          if (cache !== CACHE_NAME) {
            return caches.delete(cache);
          }
        })
      );
    })
  );
});

// Strategi Fetch: Network First, Fallback to Cache
// Bagus untuk aplikasi dinamis yang butuh data terbaru dari Google Script
self.addEventListener('fetch', (event) => {
  event.respondWith(
    fetch(event.request)
      .catch(() => {
        return caches.match(event.request);
      })
  );
});
