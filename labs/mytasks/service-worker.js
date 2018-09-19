// // let cacheName = 'v6';
// // let cacheFiles = [
// //     '/mytasks/',
// //     '/mytasks/index.html',
// //     '/mytasks/css/font-awesome.css',
// //     '/mytasks/css/style.css',
// //     '/mytasks/fonts/FontAwesome.otf',
// //     '/mytasks/fonts/fontawesome-webfont.eot',
// //     '/mytasks/fonts/fontawesome-webfont.svg',
// //     '/mytasks/fonts/fontawesome-webfont.ttf',
// //     '/mytasks/fonts/fontawesome-webfont.woff',
// //     '/mytasks/fonts/fontawesome-webfont.woff2',
// //     '/mytasks/fonts/roboto-regular-webfont.woff',
// //     '/mytasks/fonts/roboto-regular-webfont.woff2',
// //     '/mytasks/fonts/roboto-thin-webfont.woff',
// //     '/mytasks/fonts/roboto-thin-webfont.woff2',
// //     '/mytasks/app.js',
// //     '/mytasks/images/icons/icon-72x72.png',
// //     '/mytasks/images/icons/icon-96x96.png',
// //     '/mytasks/images/icons/icon-128x128.png',
// //     '/mytasks/images/icons/icon-192x192.png',
// //     '/mytasks/images/icons/icon-384x384.png',
// //     '/mytasks/images/icons/icon-512x512.png'
// // ]
// // self.addEventListener('install', function (event){
// //     // cache files
// //     event.waitUntil(
// //         caches.open(cacheName).then(function (cache){
// //             return cache.addAll(cacheFiles)
// //         })
// //     )
// // });
// //
// // self.addEventListener("activate", function(event) {
// //     /* Just like with the install event, event.waitUntil blocks activate on a promise.
// //      Activation will fail unless the promise is fulfilled.
// //      */
// //     console.log('WORKER: activate event in progress.');
// //
// //     event.waitUntil(
// //         caches
// //         /* This method returns a promise which will resolve to an array of available
// //          cache keys.
// //          */
// //             .keys()
// //             .then(function (keys) {
// //                 // We return a promise that settles when all outdated caches are deleted.
// //                 return Promise.all(
// //                     keys
// //                         .filter(function (key) {
// //                             // Filter by keys that don't start with the latest version prefix.
// //                             return !key.startsWith(version);
// //                         })
// //                         .map(function (key) {
// //                             /* Return a promise that's fulfilled
// //                              when each outdated cache is deleted.
// //                              */
// //                             return caches.delete(key);
// //                         })
// //                 );
// //             })
// //             .then(function() {
// //                 console.log('WORKER: activate completed.');
// //             })
// //     );
// // });
// //
// // // fetch pattern
// // self.addEventListener('fetch', function(event) {
// //     //console.log(event.request);
// //     event.respondWith(
// //         caches.match(event.request).then(function(cachedResponse) {
// //             return cachedResponse || fetch(event.request);
// //         })
// //     );
// // });
// //
// // //This is the service worker with the Cache-first network
//
// var CACHE = 'pwabuilder-precache2';
//
// //Install stage sets up the cache-array to configure pre-cache content
// self.addEventListener('install', function(evt) {
//   console.log('The service worker is being installed.');
//   evt.waitUntil(precache().then(function() {
//     console.log('[ServiceWorker] Skip waiting on install');
//       return self.skipWaiting();
//
//   })
//   );
// });
//
//
// //allow sw to control of current page
// self.addEventListener('activate', function(event) {
// console.log('[ServiceWorker] Claiming clients for current page');
//       return self.clients.claim();
//
// });
//
// self.addEventListener('fetch', function(evt) {
//   console.log('The service worker is serving the asset.'+ evt.request.url);
//   evt.respondWith(fromCache(evt.request).catch(fromServer(evt.request)));
//   evt.waitUntil(update(evt.request));
// });
//
//
// function precache() {
//   return caches.open(CACHE).then(function (cache) {
//     return cache.addAll(precacheFiles);
//   });
// }
//
//
// function fromCache(request) {
//   //we pull files from the cache first thing so we can show them fast
//   return caches.open(CACHE).then(function (cache) {
//     return cache.match(request).then(function (matching) {
//       return matching || Promise.reject('no-match');
//     });
//   });
// }
//
//
// function update(request) {
//   //this is where we call the server to get the newest version of the
//   //file to use the next time we show view
//   return caches.open(CACHE).then(function (cache) {
//     return fetch(request).then(function (response) {
//       return cache.put(request, response);
//     });
//   });
// }
//
// function fromServer(request){
//   //this is the fallback if it is not in the cahche to go to the server and get it
// return fetch(request).then(function(response){ return response})
// }
//
//
//
 importScripts('https://storage.googleapis.com/workbox-cdn/releases/3.2.0/workbox-sw.js');
 var precacheFiles = [
     '/mytasks/',
     '/mytasks/index.html',
     '/mytasks/css/font-awesome.css',
     '/mytasks/fonts/FontAwesome.otf',
     '/mytasks/fonts/fontawesome-webfont.eot',
     '/mytasks/fonts/fontawesome-webfont.svg',
     '/mytasks/fonts/fontawesome-webfont.ttf',
     '/mytasks/fonts/fontawesome-webfont.woff',
     '/mytasks/fonts/fontawesome-webfont.woff2',
     '/mytasks/fonts/roboto-regular-webfont.woff',
     '/mytasks/fonts/roboto-regular-webfont.woff2',
     '/mytasks/fonts/roboto-thin-webfont.woff',
     '/mytasks/fonts/roboto-thin-webfont.woff2',
     '/mytasks/app.js',
     '/mytasks/images/icons/icon-72x72.png',
     '/mytasks/images/icons/icon-96x96.png',
     '/mytasks/images/icons/icon-128x128.png',
     '/mytasks/images/icons/icon-192x192.png',
     '/mytasks/images/icons/icon-384x384.png',
     '/mytasks/images/icons/icon-512x512.png'
 ];
if (workbox) {
  console.log(`Yay! Workbox is loaded 🎉`);
} else {
  console.log(`Boo! Workbox didn't load 😬`);
}

workbox.precaching.precacheAndRoute(precacheFiles);

workbox.routing.registerRoute(
  new RegExp('.*\.js'),
  workbox.strategies.networkFirst()
);

workbox.routing.registerRoute(
  // Cache CSS files
  /.*\.css/,
  // Use cache but update in the background ASAP
  workbox.strategies.staleWhileRevalidate({
    // Use a custom cache name
    cacheName: 'css-cache3',
  })
);

workbox.routing.registerRoute(
  'https://unpkg.com/axios/dist/axios.min.js',
  workbox.strategies.cacheFirst(),
);
workbox.routing.registerRoute(
  'https://code.jquery.com/jquery-3.3.1.min.js',
  workbox.strategies.cacheFirst(),
);

workbox.routing.registerRoute(
  // Cache image files
  /.*\.(?:png|jpg|jpeg|svg|gif)/,
  // Use the cache if it's available
  workbox.strategies.cacheFirst({
    // Use a custom cache name
    cacheName: 'image-cache',
    plugins: [
      new workbox.expiration.Plugin({
        // Cache only 20 images
        maxEntries: 20,
        // Cache for a maximum of a week
        maxAgeSeconds: 7 * 24 * 60 * 60,
      })
    ],
  })
);
