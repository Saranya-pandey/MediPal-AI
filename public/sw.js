const CACHE_NAME = 'medipal-offline-v1';

// Add the Emergency Help and Knowledge Base to offline cache immediately
const OFFLINE_URLS = [
  '/',
  '/emergency',
  '/knowledge-base'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      // Don't wait for these to cache to finish installing, but attempt to cache them
      cache.addAll(OFFLINE_URLS);
    })
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames
          .filter((name) => name !== CACHE_NAME)
          .map((name) => caches.delete(name))
      );
    })
  );
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  // If request is for a cached offline page, serve it
  if (event.request.mode === 'navigate') {
    event.respondWith(
      fetch(event.request).catch(() => {
        return caches.match(event.request).then((response) => {
          if (response) {
            return response;
          }
          // If completely offline and not in cache, fallback to emergency page
          return caches.match('/emergency');
        });
      })
    );
  } else {
    // Stale-while-revalidate for assets
    event.respondWith(
      caches.match(event.request).then((cachedResponse) => {
        const fetchPromise = fetch(event.request).then((networkResponse) => {
          if (networkResponse.ok && event.request.method === 'GET') {
            const responseClone = networkResponse.clone();
            caches.open(CACHE_NAME).then((cache) => {
              cache.put(event.request, responseClone);
            });
          }
          return networkResponse;
        }).catch(() => {
          // Ignore fetch errors during offline
        });
        
        return cachedResponse || fetchPromise;
      })
    );
  }
});
