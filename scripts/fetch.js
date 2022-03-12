    function getOutdoorSensorValue() {
    fetch("https://hothothot.dog/api/capteurs/exterieur").then(function(data) {
        data.json().then(function(json) {
            let val = json.capteurs[0].Valeur;
            let obj;
            if (!!localStorage.getItem("Temperature"))
                localStorage.setItem("Temperature", '[]');
            else {
                //stockage


                JSON.parse(localStorage.getItem("Temperature", val);
                obj = JSON.parse(json);
                console.log(json);
                console.log(obj);
            }
            alertOutdoorSensors(val);
            addEntryToHistory(new Temperature(val, "Extérieur", new Date()), true);
        });
    });
}

function getIndoorSensorValue() {
    fetch("https://hothothot.dog/api/capteurs/interieur").then(function(data) {
        data.json().then(function(json) {
            let val = json.capteurs[0].Valeur;
            alertIndoorSensors(val);
            addEntryToHistory(new Temperature(val, "Intérieur", new Date()), true);
        });
    });
}