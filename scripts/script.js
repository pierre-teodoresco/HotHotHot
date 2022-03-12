if ('serviceWorker' in navigator) {
    navigator.serviceWorker
        .register('/HotHotHot/service-worker.js')
        .then(() => { console.log('Service Worker Registered'); });
}

sortHandler();
let graph = createGraph();
const timer = 60000 * 0.1;

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