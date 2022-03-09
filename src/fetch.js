import TemperatureController from 'controllers/TemperatureController';

/* ************************************************* */
async function fetchTemperature(url) {
    let response = await fetch(url);

    return await response.json();
}

function Temperature(slots) {
    this.name = slots.Nom;
    this.type = slots.type;
    this.value = slots.Valeur;
    this.timestamp = slots.Timestamp;
}

let i = 0;

let interval = setInterval(function () {
    fetchTemperature("https://hothothot.dog/api/capteurs/exterieur").then(function (data) {
        let temp = new Temperature(data.capteurs[0]);

        let controller = new TemperatureController();
        controller.store(temp);

        ++i;
        if (i >= 5) {
            clearInterval(interval);
        }
    });

}, 10000)
