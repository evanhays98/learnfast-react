const CACHE_NAME = 'version-2';
const urlsToCache = ['index.html', 'offline.html'];

function createNotification() {
  this.registration.showNotification('Memorix', {
    body: 'Long time no see! Come back and learn with us!',
    icon: 'path_to_your_image.png', // Replace with the actual image path
  });
}

// Schedule notification every 2 minutes
function scheduleNotification() {
  setInterval(
    () => {
      createNotification();
    },
    2 * 60 * 1000,
  ); // 2 minutes in milliseconds
}

this.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('Opened cache');
      scheduleNotification();

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
