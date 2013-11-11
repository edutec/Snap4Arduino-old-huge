var socket = new WebSocket("ws://localhost:4001/s4a");
var webSocketRefreshInterval = 20; //milliseconds

var analogReadings = [];
var digitalReadings = [];
var analogReadingThreadId;
var digitalReadingThreadId;


function requestAnalogReadings() {
	socket.send('analogReadings');
}

function requestDigitalReadings() {
	socket.send('digitalReadings');
}



function inform(title, message) {
	(new DialogBoxMorph()).inform(title, message, world);
}


socket.onmessage = function(message) {
	messageArray = message.data.split("&");
	switch (messageArray[0]) {
		case 'analogReadings':
			analogReadings = JSON.parse(messageArray[1]);
			break;
		case 'digitalReadings':
			digitalReadings = JSON.parse(messageArray[1]);
			break;
	}
};


socket.onclose = function() { 
	inform("Connection lost!", "Lost connection to the server.\nPlease make sure the server is running, then reload this page and try again.");
	if (analogReadingThreadId) { clearInterval(analogReadingThreadId) };
	if (digitalReadingThreadId) { clearInterval(digitalReadingThreadId) };
}
