const CACHE_NAME = 'version-2.4';
const urlsToCache = ['index.html', 'offline.html'];

this.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('Opened cache');
      return cache.addAll(urlsToCache);
    }),
    this.registration.showNotification('Memorix', {
      body: `Welcome back to Memorix! ${CACHE_NAME}`,
      icon: '%PUBLIC_URL%/memorix.ico', // Replace with the actual image path
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
  const cacheWhitelist = [CACHE_NAME];

  event.waitUntil(
    // Clean up old caches except for the current CACHE_NAME
    caches
      .keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => {
            if (!cacheWhitelist.includes(cacheName)) {
              return caches.delete(cacheName);
            }
          }),
        );
      })
      .then(() => {
        // Start sending notifications at intervals when the service worker is activated
        function createNotification() {
          this.registration
            .showNotification('Memorix', {
              body: `Long time no see! Come back to Memorix! ${CACHE_NAME}`,
              icon: '%PUBLIC_URL%/memorix.ico', // Replace with the actual image path
            })
            .then(() => {
              console.log('Notification sent');
            })
            .catch((error) => {
              console.error('Notification error:', error);
            })
            .finally(() => {
              // Schedule the next notification after 2 minutes
              setTimeout(createNotification, 2 * 60 * 1000);
            });
        }

        createNotification();
      }),
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
