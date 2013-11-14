Process.prototype.reportAnalogReading = function (pin) {

	// If we never activated the pin before, we do so
	// We'll be luckier next time

	if (!analogReadingThreadId) { 
		analogReadingThreadId = setInterval(requestAnalogReadings, webSocketRefreshInterval);
	} else {
		if (isNil(analogReadings[pin])) { 
			socket.send("activateAnalogPin&" + pin);
		} else {
			return analogReadings[pin];
		}
	}
	return 0;
};

Process.prototype.reportDigitalReading = function (pin) {

	// If we never activated the pin before, we do so
	// We'll be luckier next time
	
	if (!digitalReadingThreadId) { 
		digitalReadingThreadId = setInterval(requestDigitalReadings, webSocketRefreshInterval);
	} else {
		if (pin>1) {
			if (isNil(digitalReadings[pin-2])) {
				socket.send("activateDigitalPin&" + pin)
			} else {
				return (digitalReadings[pin-2] == 1)
			}
		}
	}
	return false;
};

Process.prototype.connectArduino = function (type, port) {
	if (this.reportURL('localhost:8080/connect?port=' + port + '&type=' + type) === 'OK') {
		socket.send("boardSpecs");	
	} 
}

Process.prototype.servoWrite = function (pin, value) {
	socket.send("servoWrite&" + pin + "&" + value);
}

Process.prototype.digitalWrite = function (pin, boolenValue) {
	var value = 0;
	if (boolenValue) { value = 1 };
	socket.send("digitalWrite&" + pin + "&" + value);
}

Process.prototype.Write = function (pin, value) {
	socket.send("servoWrite&" + pin + "&" + value);
}

Process.prototype.setPinMode = function (pin, mode) {
	if (this.reportURL('localhost:8080/digitalPinMode?pin=' + pin + '&mode=' + mode) === 'OK') {
		if (mode === 'S') {
			boardSpecs.servoPins[pin] = pin;
		}
		return true; 
	} 
}
