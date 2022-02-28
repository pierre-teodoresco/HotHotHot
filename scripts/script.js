/* Websocket */

// let socket = new WebSocket("wss://ws.hothothot.dog:9502");

// socket.onopen = function(event) {
// 	alert("[open] Connexion established");
// };

// socket.onmessage = function(event) {
// 	alert("[message] : " + event.data);
// };

/* main */

getIndoorSensorValue();
getOutdoorSensorValue();

const timer = 60000 * 0.5;

outdoorInterval = setInterval(getOutdoorSensorValue, timer);
indoorInterval = setInterval(getIndoorSensorValue, timer);