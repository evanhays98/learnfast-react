const CACHE_NAME = 'version-2';
const urlsToCache = ['index.html', 'offline.html'];

this.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('Opened cache');

      return cache.addAll(urlsToCache);
    }),
  );
});

this.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then(() => {
      return fetch(event.request).catch(() => caches.match('offline.html'));
    }),
  );
});

this.addEventListener('activate', (event) => {
  const cacheWhitelist = [];
  cacheWhitelist.push(CACHE_NAME);

  event.waitUntil(
    caches.keys().then((cacheNames) =>
      Promise.all(
        cacheNames.map((cacheName) => {
          if (!cacheWhitelist.includes(cacheName)) {
            return caches.delete(cacheName);
          }
        }),
      ),
    ),
  );
});

this.addEventListener('message', (event) => {
  if (event.data.action === 'skipWaiting') {
    this.skipWaiting();
  }
});

this.addEventListener('push', (event) => {
  const data = event.data.json();
  const options = {
    body: data.body,
    icon: data.icon,
    badge: data.badge,
  };
  event.waitUntil(this.registration.showNotification(data.title, options));
});

this.addEventListener('notificationclick', (event) => {
  event.notification.close();
  event.waitUntil(this.clients.openWindow(event.notification.data.url));
});
