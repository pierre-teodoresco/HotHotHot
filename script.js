var minIn;
var maxIn;
var minOut;
var maxOut;

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

/* Récupération des données du serveur avec fetch en attendant l'ouverture pour websocket */

function getOutdoorSensorValue() {
	fetch("https://hothothot.dog/api/capteurs/exterieur").then(function(data) {
		data.json().then(function(json) { 
			alertOutdoorSensors(json.capteurs[0].Valeur);
			findOutdoorMin(json.capteurs[0].Valeur);
			findOutdoorMax(json.capteurs[0].Valeur);
		});	
	});
	console.log("REFRESH_OUT");
}

function getIndoorSensorValue() {
	fetch("https://hothothot.dog/api/capteurs/interieur").then(function(data) {
		data.json().then(function(json) {
			alertIndoorSensors(json.capteurs[0].Valeur);
			findIndoorMin(json.capteurs[0].Valeur);
			findIndoorMax(json.capteurs[0].Valeur);
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

getIndoorSensorValue();
getOutdoorSensorValue();

const timer = 60000;

outdoorInterval = setInterval(getOutdoorSensorValue, timer);
indoorInterval = setInterval(getIndoorSensorValue, timer);


/* Find Min / Max*/
function findIndoorMin(val) {
	if(minIn == null)
		minIn = val;
	if(val < minIn)
		minIn = val;
	document.getElementById("MinTempIndoor").innerText = "Le min à l'intérieur est : " + minIn;
}

function findIndoorMax(val) {
	if(maxIn == null)
		maxIn = val;
	if(val > maxIn)
		maxIn = val;
	document.getElementById("MaxTempIndoor").innerText = "Le max à l'intérieur est : " + maxIn;
}

function findOutdoorMin(val) {
	if(minOut == null)
		minOut = val;
	if(val < minOut)
		minOut = val;
	document.getElementById("MinTempOutdoor").innerText = "Le min à l'exterieur est : " + minOut;
}

function findOutdoorMax(val) {
	if(maxOut == null)
		maxOut = val;
	if(val > maxOut)
		maxOut = val;
	document.getElementById("MaxTempOutdoor").innerText = "Le max à l'exterieur est : " + maxOut;
}