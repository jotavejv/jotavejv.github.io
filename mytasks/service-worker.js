let cacheName = 'v1';
let cacheFiles = [
    '/mytasks/',
    '/mytasks/index.html',
    '/mytasks/css/font-awesome.css',
    '/mytasks/css/style.css',
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

// self.addEventListener('push', function(event) {
//     console.log('Received a push message', event);
//
//     var title = 'Notification';
//     var body = 'There is newly updated content available on the site. Click to see more.';
//     var icon = 'https://raw.githubusercontent.com/deanhume/typography/gh-pages/icons/typography.png';
//     var tag = 'simple-push-demo-notification-tag';
//
//     event.waitUntil(
//         self.registration.showNotification(title, {
//             body: body,
//             icon: icon,
//             tag: tag
//         })
//     );
// });
