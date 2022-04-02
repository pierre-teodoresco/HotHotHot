import Observer from "./Observer.js";

class NotificationHandler extends Observer {
    constructor() {
        super();

    }

    notificationHandler(title, message) {
        if (!"Notification" in window) {
            console.log("Votre navigateur ne supporte pas les norifications");
        } else if (Notification.permission === "granted") {
            const notif = new Notification(title, {
                icon: "../images/hot-dog.png",
                body: message,
            });
        } else if (Notification.permission !== "denied" || Notification.permission === "default") {
            Notification.requestPermission().then(function (result) {
                if (result === "granted") {
                    const notif = new Notification(title, {
                        icon: "../images/hot-dog.png",
                        body: message,
                    });
                }
            });
        }
    }

    alertIndoorSensors(val) {
        if (val < 0) {
            this.notificationHandler('Alerte Intérieur : ' + val + '°C',
                'Canalisation gelées, appelez SOS pompier et mettez un bonnet !');
        } else if (val < 12) {
            this.notificationHandler('Alerte Intérieur : ' + val + '°C',
                'Montez le chauffage ou mettez un gros pull !');
        } else if (val > 22) {
            this.notificationHandler('Alerte Intérieur : ' + val + '°C',
                'Baissez le chauffage !');
        } else if (val > 50) {
            this.notificationHandler('Alerte Intérieur : ' + val + '°C',
                'Appelez les pompiers ou arrêtez votre barbecue !');
        }
    }

    alertOutdoorSensors(val) {
        if (val < 0) {
            this.notificationHandler('Alerte Extérieur : ' + val + '°C',
                'Banquise en vue !');
        } else if (val > 35) {
            this.notificationHandler('Alerte Extérieur : ' + val + '°C',
                'Hot Hot Hot !');
        }
    }

    update(data) {
        let extTempVal = data.state[1].Valeur;
        let intTempVal = data.state[0].Valeur;

        this.alertIndoorSensors(intTempVal);
        this.alertOutdoorSensors(extTempVal);
    }
}

export default NotificationHandler;