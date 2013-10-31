var analogReadings = {};
var digitalReadings = {};
var socket = new WebSocket("ws://localhost:4001");

socket.onmessage = function(message) {
	messageArray = message.data.split("&");
	switch (messageArray[0]) {
		case 'analogValue':
			analogReadings[parseInt(messageArray[1])] = parseInt(messageArray[2]);
			break;
		case 'digitalValue':
			digitalReadings[parseInt(messageArray[1])] = parseInt(messageArray[2]);
			break;
	}
};
