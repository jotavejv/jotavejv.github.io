// //sw register

// navigator.serviceWorker.register('/mytasks/service-worker.js', {
//     scope: '/mytasks/'
// }).then(function (event){

//     if(event.installing) {
//         console.log('Service worker installing');
//     } else if(event.waiting) {
//         console.log('Service worker installed');
//     } else if(event.active) {
//         console.log('Service worker active');
//     }

// }).catch(function(error) {
//     // registration failed
//     console.log('Registration failed with ' + error);
// });
