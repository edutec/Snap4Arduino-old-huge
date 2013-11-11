// Process WebSocket message send

Process.prototype.webSocketSend = function (message) {
    socket.send(message)
};

// Analog and Digital readings

Process.prototype.reportAnalogReading = function (pin) {

	// If we never activated the pin before, we do so
	// We'll be luckier next time

	if (!analogReadingThreadId) { analogReadingThreadId = setInterval(requestAnalogReadings, webSocketRefreshInterval) }
	if (isNil(analogReadings[pin])) { 
			socket.send("activateAnalogPin&" + pin) 
	} else {
			return analogReadings[pin];
	}
	return 0;
};

Process.prototype.reportDigitalReading = function (pin) {

	// If we never activated the pin before, we do so
	// We'll be luckier next time
	
	if (!digitalReadingThreadId) { digitalReadingThreadId = setInterval(requestDigitalReadings, webSocketRefreshInterval) }

	if (pin>1) {
		if (isNil(digitalReadings[pin-2])) { socket.send("activateDigitalPin&" + pin) }	
		return (digitalReadings[pin-2] == 1)
	}
	return false;
};

