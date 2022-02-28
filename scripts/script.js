/* Utilities */

function updateMinMax(sensor, val) {
	let minSpan = document.getElementById('min-temp-' + sensor);
	let oldMinVal = parseInt(minSpan.innerText);
	if (isNaN(oldMinVal)) {
		minSpan.innerText = val;
	} else if (oldMinVal < val) {
		minSpan.innerText = val;
	}

	let maxSpan = document.getElementById('max-temp-' + sensor);
	let oldMaxVal = parseInt(maxSpan.innerText);
	if (isNaN(oldMaxVal)) {
		maxSpan.innerText = val;
	} else if (oldMaxVal > val) {
		maxSpan.innerText = val;
	}
}

/* Permet de télécharger le site */

if ('serviceWorker' in navigator) {

	navigator.serviceWorker

		.register('/HotHotHot/service-worker.js') // à adapter à l'URL du projet

		.then(() => { console.log('Service Worker Registered'); });

}


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
}

function getIndoorSensorValue() {
	fetch("https://hothothot.dog/api/capteurs/interieur").then(function(data) {
		data.json().then(function(json) {
			let val = json.capteurs[0].Valeur;
			alertIndoorSensors(val);
			addEntryToHistory(new Temperature(val, "Intérieur", new Date().toLocaleString()));
		});	
	});
}

function alertIndoorSensors(val) {
	if (val < 0) {
		notificationHandler('Alerte Intérieur : ' + val + '°C',
			'Canalisation gelées, appelez SOS pompier et mettez un bonnet !');
	} else if (val < 12) {
		notificationHandler('Alerte Intérieur : ' + val + '°C',
			'Montez le chauffage ou mettez un gros pull !');
	} else if (val > 22) {
		notificationHandler('Alerte Intérieur : ' + val + '°C',
			'Baissez le chauffage !');
	} else if (val > 50) {
		notificationHandler('Alerte Intérieur : ' + val + '°C',
			'Appelez les pompiers ou arrêtez votre barbecue !');
	}
	document.getElementById("in-temp").innerText = val;

	updateMinMax('in', val);
}

function alertOutdoorSensors(val) {
	if (val < 0) {
		notificationHandler('Alerte Extérieur : ' + val + '°C',
			'Banquise en vue !');
	} else if (val > 35) {
		notificationHandler('Alerte Extérieur : ' + val + '°C',
			'Hot Hot Hot !');
	}
	document.getElementById("out-temp").innerText = val;

	updateMinMax('out', val);
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

/* Notifications */

function notificationHandler(title, message) {
	if (!"Notification" in window) {
		console.log("Votre navigateur ne supporte pas les norifications");
	} else if (Notification.permission === "granted") {
		const notif = new Notification(title, {body: message});
	} else if (Notification.permission !== "denied" || Notification.permission === "default") {
		Notification.requestPermission().then(function(result) {
			if (result === "granted") {
				const notif = new Notification(title, {body: message});
			}
		});
	}
}

/* main */

getIndoorSensorValue();
getOutdoorSensorValue();

const timer = 60000 * 0.5;

outdoorInterval = setInterval(getOutdoorSensorValue, timer);
indoorInterval = setInterval(getIndoorSensorValue, timer);