function notificationHandler(title, message) {
    if (!"Notification" in window) {
        console.log("Votre navigateur ne supporte pas les norifications");
    } else if (Notification.permission === "granted") {
        const notif = new Notification(title, {
            icon : "../images/hot-dog.png",
            body: message});
    } else if (Notification.permission !== "denied" || Notification.permission === "default") {
        Notification.requestPermission().then(function(result) {
            if (result === "granted") {
                const notif = new Notification(title, {
                    icon : "../images/hot-dog.png",
                    body: message});
            }
        });
    }
}

function updateMinMax(sensor, val) {
    let minSpan = document.getElementById('min-temp-' + sensor);
    let oldMinVal = parseInt(minSpan.innerText);
    if (isNaN(oldMinVal)) {
        minSpan.innerText = val;
    } else if (oldMinVal > val) {
        minSpan.innerText = val;
    }

    let maxSpan = document.getElementById('max-temp-' + sensor);
    let oldMaxVal = parseInt(maxSpan.innerText);
    if (isNaN(oldMaxVal)) {
        maxSpan.innerText = val;
    } else if (oldMaxVal < val) {
        maxSpan.innerText = val;
    }
}

function alertIndoorSensors(val) {
    if (val < 0) {
        notificationHandler('Alerte Intérieur : ' + val + '°C',
            'Canalisation gelées, appelez SOS pompier et mettez un bonnet !');
    } else if (val < 12) {
        notificationHandler('Alerte Intérieur : ' + val + '°C',
            'Montez le chauffage ou mettez un gros pull !');
    } else if (val > 22) {
        notificationHandler('Alerte Intérieur : ' + val + '°C',
            'Baissez le chauffage !');
    } else if (val > 50) {
        notificationHandler('Alerte Intérieur : ' + val + '°C',
            'Appelez les pompiers ou arrêtez votre barbecue !');
    }
    document.getElementById("in-temp").innerText = val;

    updateMinMax('in', val);
}

function alertOutdoorSensors(val) {
    if (val < 0) {
        notificationHandler('Alerte Extérieur : ' + val + '°C',
            'Banquise en vue !');
    } else if (val > 35) {
        notificationHandler('Alerte Extérieur : ' + val + '°C',
            'Hot Hot Hot !');
    }
    document.getElementById("out-temp").innerText = val;

    updateMinMax('out', val);
}
