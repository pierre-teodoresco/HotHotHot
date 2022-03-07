function getOutdoorSensorValue() {
    fetch("https://hothothot.dog/api/capteurs/exterieur").then(function(data) {
        data.json().then(function(json) {
            let val = json.capteurs[0].Valeur;
            alertOutdoorSensors(val);
            addEntryToHistory(new Temperature(val, "Extérieur", new Date()), true);
            graphHistory(graph);
        });
    });
}

function getIndoorSensorValue() {
    fetch("https://hothothot.dog/api/capteurs/interieur").then(function(data) {
        data.json().then(function(json) {
            let val = json.capteurs[0].Valeur;
            alertIndoorSensors(val);
            addEntryToHistory(new Temperature(val, "Intérieur", new Date()), true);
            graphHistory(graph);
        });
    });
}