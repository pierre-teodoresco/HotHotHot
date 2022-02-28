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

// let socket = new WebSocket("wss://ws.hothothot.dog:9502");

// socket.onopen = function(event) {
// 	alert("[open] Connexion established");
// };

// socket.onmessage = function(event) {
// 	alert("[message] : " + event.data);
// };

/* class Temperature */

class Temperature {
	constructor(val, sensor, date) {
		this.val = val;
		this.sensor = sensor;
		this.date = date;
	}
}

/* Récupération des données du serveur avec fetch en attendant l'ouverture pour websocket */

function getOutdoorSensorValue() {
	fetch("https://hothothot.dog/api/capteurs/exterieur").then(function(data) {
		data.json().then(function(json) {
			let val = json.capteurs[0].Valeur;
			alertOutdoorSensors(val);
			addEntryToHistory(new Temperature(val, "Exterieur", new Date().toLocaleString()));
		});	
	});
	console.log("REFRESH_OUT");
}

function getIndoorSensorValue() {
	fetch("https://hothothot.dog/api/capteurs/interieur").then(function(data) {
		data.json().then(function(json) {
			let val = json.capteurs[0].Valeur;
			alertIndoorSensors(val);
			addEntryToHistory(new Temperature(val, "Intérieur", new Date().toLocaleString()));
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

/* Gestion Historique */

function addEntryToHistory(temp) {
	let template = document.getElementById('entry-template');
	let clonedRow = document.importNode(template.content, true);

	let cells = clonedRow.querySelectorAll('td');
	cells[0].innerText = temp.val + '°C';
	cells[1].innerText = temp.sensor;
	cells[2].innerText = temp.date;

	let tableBody = document.querySelector('#historic table tbody');
	tableBody.append(clonedRow);
}

/* main */

getIndoorSensorValue();
getOutdoorSensorValue();

const timer = 60000;

outdoorInterval = setInterval(getOutdoorSensorValue, timer);
indoorInterval = setInterval(getIndoorSensorValue, timer);