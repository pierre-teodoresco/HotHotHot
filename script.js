let socket = new WebSocket("wss://ws.hothothot.dog:9502");

socket.onopen = function(event) {
	alert("[open] Connexion established");
};

socket.onmessage = function(event) {
	alert("[message] : " + event.data);
};

function getQueryJSON() {
	fetch("https://hothothot.dog/api/capteurs/exterieur").then(function(data) {
		data.json().then(function(json) {
			console.log(json);
			console.log(json.capteurs[0].Valeur);
			return json;
		});	
	});
}

function getRandomArbitrary(min, max) {
	return Math.floor(Math.random() * (max - min) + min);
}

var indoorInterval;

function alertIndoorSensors() {
	let val = getRandomArbitrary(-10, 60);

	if (val < 0) {
		alert("Canalisations gelées, appelez SOS plombier et mettez un bonnet !");
	} else if (val < 12) {
		alert("Montez le chauffage ou mettez un gros pull !");
	} else if (val > 22) {
		alert("Baissez le chauffage !");
	} else if (val > 50) {
		alert("Appelez les pompiers ou arrêtez votre barbecue !");
	}

	console.log("temp : " + val);
}

var outdoorInterval;

function alertOutdoorSensors() {
	let val = getRandomArbitrary(-20, 40);

	if (val < 0) {
		alert("Banquise en vue !");
	} else if (val > 35) {
		alert("Hot Hot Hot !");
	}

	console.log("temp : " + val);
}

indoorInterval = setInterval(alertIndoorSensors, 2000);
outdoorInterval = setInterval(alertOutdoorSensors, 2000);
