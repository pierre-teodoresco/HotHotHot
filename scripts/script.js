if ('serviceWorker' in navigator) {
    navigator.serviceWorker
        .register('/HotHotHot/service-worker.js')
        .then(() => { console.log('Service Worker Registered'); });
}

sortHandler();

const timer = 60000 * 0.5;

getIndoorSensorValue();
getOutdoorSensorValue();

function test() {
    if (socket.readyState !== 1) {
        console.log('fetch');
        getIndoorSensorValue();
        getOutdoorSensorValue();
    } else {
        console.log('fetch down');
    }
}

interval = setInterval(test, timer);