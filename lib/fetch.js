class TemperatureController {
    static storageName = 'temperatures';

    constructor() {
        if (!localStorage.getItem(TemperatureController.storageName)) {
            localStorage.setItem(TemperatureController.storageName, '[]');
        }
    }

    show() {
        let temperatures = Temperature.prototype.all();

        let xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
            if (this.readyState === 4 && this.status === 200) {
                
                document.getElementById("temperature").innerHTML = ;
            }
        };
        xhttp.open("GET", "views/")
        xhttp.send();
    }

    store(data) {
        let temperatures = JSON.parse(localStorage.getItem(TemperatureController.storageName));

        !temperatures ? temperatures = data : temperatures.push(data);

        localStorage.setItem(TemperatureController.storageName, JSON.stringify(temperatures));
    }
}
/* ************************************************* */
async function fetchTemperatures(url) {
    let response = await fetch(url);

    return await response.json();
}

function Temperature(slots) {
    this.name = slots.Nom;
    this.type = slots.type;
    this.value = slots.Valeur;
    this.timestamp = slots.Timestamp;
}

Temperature.prototype.all = function () {
    return localStorage.getItem('temperatures');
}

let i = 0;

let interval = setInterval(function () {
    fetchTemperatures("https://hothothot.dog/api/capteurs/exterieur").then(function (data) {
        let temp = new Temperature(data.capteurs[0]);

        let controller = new TemperatureController();
        controller.store(temp);
        controller.show();
    });

}, 10000)


