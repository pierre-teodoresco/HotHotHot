import Observer from "./Observer.js";

class SensorsDisplay extends Observer {
    constructor() {
        super();

    }

    update(data) {
        document.getElementById("out-temp").innerText = data.state[1].Valeur;
        document.getElementById('in-temp').innerText = data.state[0].Valeur;

        const maxTempExt = document.getElementById('max-temp-out').innerText;
        const minTempExt = document.getElementById('min-temp-out').innerText;
        const maxTempIn = document.getElementById('max-temp-in').innerText;
        const minTempIn = document.getElementById('min-temp-in').innerText;

        if (maxTempExt !== '') {
            if (maxTempExt < data.state[1].Valeur) {
                document.getElementById('max-temp-out').innerText = data.state[1].Valeur;
            } else if (minTempExt < data.state[1].Valeur) {
                document.getElementById('min-temp-out').innerText = data.state[1].Valeur;
            }

            if (maxTempIn < data.state[1].Valeur) {
                document.getElementById('max-temp-in').innerText = data.state[0].Valeur;
            } else if (minTempIn < data.state[1].Valeur) {
                document.getElementById('min-temp-in').innerText = data.state[0].Valeur;
            }
        } else {
            document.getElementById('max-temp-out').innerText = data.state[1].Valeur;
            document.getElementById('min-temp-out').innerText = data.state[1].Valeur;

            document.getElementById('max-temp-in').innerText = data.state[0].Valeur;
            document.getElementById('min-temp-in').innerText = data.state[0].Valeur;
        }
    }
}

export default SensorsDisplay;