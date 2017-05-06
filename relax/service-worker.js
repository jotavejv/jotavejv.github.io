let cacheName = 'v4';
let cacheFiles = [
    '/relax/',
    '/relax/index.html',
    '/relax/css/font-awesome.css',
    '/relax/css/style.css',
    '/relax/fonts/FontAwesome.otf',
    '/relax/fonts/fontawesome-webfont.eot',
    '/relax/fonts/fontawesome-webfont.svg',
    '/relax/fonts/fontawesome-webfont.ttf',
    '/relax/fonts/fontawesome-webfont.woff',
    '/relax/fonts/fontawesome-webfont.woff2',
    '/relax/fonts/roboto-regular-webfont.woff',
    '/relax/fonts/roboto-regular-webfont.woff2',
    '/relax/fonts/roboto-thin-webfont.woff',
    '/relax/fonts/roboto-thin-webfont.woff2',
    '/relax/app.js',
    '/relax/images/icons/icon-72x72.png',
    '/relax/images/icons/icon-96x96.png',
    '/relax/images/icons/icon-128x128.png',
    '/relax/images/icons/icon-192x192.png',
    '/relax/images/icons/icon-384x384.png',
    '/relax/images/icons/icon-512x512.png'
]
self.addEventListener('install', function (event){
    // cache files
    event.waitUntil(
        caches.open(cacheName).then(function (cache){
            return cache.addAll(cacheFiles)
        })
    )
});

self.addEventListener("activate", function(event) {
    /* Just like with the install event, event.waitUntil blocks activate on a promise.
     Activation will fail unless the promise is fulfilled.
     */
    console.log('WORKER: activate event in progress.');

    event.waitUntil(
        caches
        /* This method returns a promise which will resolve to an array of available
         cache keys.
         */
            .keys()
            .then(function (keys) {
                // We return a promise that settles when all outdated caches are deleted.
                return Promise.all(
                    keys
                        .filter(function (key) {
                            // Filter by keys that don't start with the latest version prefix.
                            return !key.startsWith(version);
                        })
                        .map(function (key) {
                            /* Return a promise that's fulfilled
                             when each outdated cache is deleted.
                             */
                            return caches.delete(key);
                        })
                );
            })
            .then(function() {
                console.log('WORKER: activate completed.');
            })
    );
});

// fetch pattern
self.addEventListener('fetch', function(event) {
    //console.log(event.request);
    event.respondWith(
        caches.match(event.request).then(function(cachedResponse) {
            return cachedResponse || fetch(event.request);
        })
    );
});

// self.addEventListener('push', function (event){
//     event.waitUntil(
//         self.registration.showNotification('Hello', options)
//     )
// });