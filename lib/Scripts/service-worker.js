if ('serviceWorker' in navigator) {
    navigator.serviceWorker
        .register('/HotHotHot/service-worker.js')
        .then(() => { console.log('Service Worker Registered'); });
}