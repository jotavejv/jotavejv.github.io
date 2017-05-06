let cacheName = 'v2';
let cacheFiles = [
    '/',
    '/index.html',
    '/css/font-awesome.css',
    '/css/style.css',
    '/fonts/FontAwesome.otf',
    '/fonts/fontawesome-webfont.eot',
    '/fonts/fontawesome-webfont.svg',
    '/fonts/fontawesome-webfont.ttf',
    '/fonts/fontawesome-webfont.woff',
    '/fonts/fontawesome-webfont.woff2',
    '/fonts/roboto-regular-webfont.woff',
    '/fonts/roboto-regular-webfont.woff2',
    '/fonts/roboto-thin-webfont.woff',
    '/fonts/roboto-thin-webfont.woff2',
    '/app.js',
    '/images/icon-72x72.png',
    '/images/icon-96x96.png',
    '/images/icon-128x128.png',
    '/images/icon-192x192.png',
    '/images/icon-384x384.png',
    '/images/icon-512x512.png'
]
self.addEventListener('install', function (event){
    // cache files
    event.waitUntil(
        caches.open(cacheName).then(function (cache){
            return cache.addAll(cacheFiles)
        })
    )
});

self.addEventListener('activate', function (event){
    // clean up old sw versions
});

// self.addEventListener('push', function (event){
//     event.waitUntil(
//         self.registration.showNotification('Hello', options)
//     )
// });