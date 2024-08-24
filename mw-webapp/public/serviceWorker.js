self.addEventListener("install", (event) => {
  // console.log("Service Worker installing.", event);
});

self.addEventListener("activate", (event) => {
  // console.log("Service Worker activating.", event);
});

self.addEventListener('push', function(event) {
  const data = event.data.json();
  const options = {
    body: data.body,
    icon: '/icon.png',
    badge: '/badge.png',
    tag: 'notification-tag',
  };

  event.waitUntil(
    self.registration.showNotification(data.title, options)
  );
});