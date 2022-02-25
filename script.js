/* Button */

O_optionsBar = document.getElementById('options');
O_optionsBar.querySelectorAll('a').forEach(function (element) {
	element.addEventListener('click', function (event) {
		Array.from(document.querySelectorAll('.active')).forEach(function(element) {
			element.removeAttribute('class');
		});
		let S_sectionToDisplay = event.target.attributes.href.value.replace('#', '');
		document.getElementById(S_sectionToDisplay).setAttribute('class', 'active');
	})
});

/* Websocket */

let socket = new WebSocket("wss://ws.hothothot.dog:9502");

socket.onopen = function(event) {
	alert("[open] Connexion established");
};

socket.onmessage = function(event) {
	alert("[message] : " + event.data);
};

/* Récupération des données du serveur avec fetch en attendant l'ouverture pour websocket */

function getOutdoorSensorValue() {
	fetch("https://hothothot.dog/api/capteurs/exterieur").then(function(data) {
		data.json().then(function(json) { 
			alertOutdoorSensors(json.capteurs[0].Valeur);
		});	
	});
	console.log("REFRESH_OUT");
}

function getIndoorSensorValue() {
	fetch("https://hothothot.dog/api/capteurs/interieur").then(function(data) {
		data.json().then(function(json) {
			alertIndoorSensors(json.capteurs[0].Valeur);
		});	
	});
	console.log("REFRESH_IN");
}

function alertIndoorSensors(val) {

	if (val < 0) {
		alert("Canalisations gelées, appelez SOS plombier et mettez un bonnet !");
	} else if (val < 12) {
		alert("Montez le chauffage ou mettez un gros pull !");
	} else if (val > 22) {
		alert("Baissez le chauffage !");
	} else if (val > 50) {
		alert("Appelez les pompiers ou arrêtez votre barbecue !");
	}

	document.getElementById("in-temp").innerText = val;
}

function alertOutdoorSensors(val) {

	if (val < 0) {
		alert("Banquise en vue !");
	} else if (val > 35) {
		alert("Hot Hot Hot !");
	}

	document.getElementById("out-temp").innerText = val;
}

outdoorInterval = setInterval(getOutdoorSensorValue(), 10000);
indoorInterval = setInterval(getIndoorSensorValue(), 10000);