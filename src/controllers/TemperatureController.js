class TemperatureController {
    static storageName = 'temperatures';

    constructor() {
        if (!localStorage.getItem(TemperatureController.storageName)) {
            localStorage.setItem(TemperatureController.storageName, '[]');
        }
    }

    store(data) {
        let temperatures = JSON.parse(localStorage.getItem(TemperatureController.storageName));

        !temperatures ? temperatures = data : temperatures.push(data);

        localStorage.setItem(TemperatureController.storageName, JSON.stringify(temperatures));
    }
}