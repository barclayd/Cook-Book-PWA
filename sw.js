const staticCacheName = "site-static-v4";
const assets = [
  "/",
  "/js/app.js",
  "/js/ui.js",
  "/js/materialize.min.js",
  "/css/materialize.min.css",
  "/css/style.css",
  "/img/dish.png",
  "/index.html",
  "/pages/about.html",
  "/pages/contact.html",
  "https://fonts.googleapis.com/icon?family=Material+Icons",
  "https://fonts.gstatic.com/s/materialicons/v47/flUhRq6tzZclQEJ-Vdg-IuiaDsNcIhQ8tQ.woff2"
];

// listen to service worker install event
self.addEventListener("install", async event => {
  // cache shell of pwa
  event.waitUntil(
    (cache = await caches.open(staticCacheName)),
    console.log("caching shell assets"),
    cache.addAll(assets)
  );
});

// activate service worker
self.addEventListener("activate", async event => {
  console.log("service worker has been activated");
  // delete old caches
  event.waitUntil(
    (keys = await caches.keys()),
    await keys
      .filter(key => key !== staticCacheName)
      .map(key => caches.delete(key))
  );
});

// fetch event
self.addEventListener("fetch", event => {
  const { request } = event;
  return event.respondWith(caches.match(request)) || fetch(request);
});
