const socket = new WebSocket("wss://ws.hothothot.dog:9502");

socket.onopen = function() {
	socket.send('hello world');
};

socket.onmessage = function(event) {
	let json = JSON.parse(event.data);

	console.log('web socket');

	/* Mise à jour des données extérieurs */
	let valOutdoor = json.capteurs[1].Valeur;
	alertOutdoorSensors(valOutdoor);
	addEntryToHistory(new Temperature(valOutdoor, 'Extérieur', new Date()), true);

	/* Mise à jour des données intérieurs */
	let valIndoor = json.capteurs[0].Valeur;
	alertIndoorSensors(valIndoor);
	addEntryToHistory(new Temperature(valIndoor, 'Intérieur', new Date()), true);
	graphHistory(graph);
};
