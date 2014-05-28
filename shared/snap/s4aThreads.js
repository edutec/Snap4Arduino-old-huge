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
	if (this.reportURL(pharoUrl + 'connect?port=' + port + '&type=' + type) === 'OK') {
		socket.send("boardSpecs");
		inform("Board connected", "An Arduino board has been connected.\nHappy prototyping!");
	} 
}

Process.prototype.servoWrite = function (pin, value) {
	var numericValue;
	switch (value[0]) {
		case "clockwise":
			numericValue = 1750;
		break;
		case "counter-clockwise":
			numericValue = 1250;
		break;
		case "stopped":
			numericValue = 1500;
		break;
		default:
			numericValue = value;
		break;
	}
	socket.send("servoWrite&" + pin + "&" + numericValue);
}

Process.prototype.digitalWrite = function (pin, boolenValue) {
	var value = 0;
	if (boolenValue) { value = 1 };
	socket.send("digitalWrite&" + pin + "&" + value);
}

Process.prototype.pwmWrite = function (pin, value) {
	socket.send("pwmWrite&" + pin + "&" + value);
}

Process.prototype.setPinMode = function (pin, mode) {

	var modeChar;
	
	switch (mode[0]) {
		case 'digital input':
			modeChar = 'I';
		break;
		case 'digital output':
			modeChar = 'O';
		break;
		case 'PWM':
			modeChar = 'P';
		break;
		case 'servo':
			modeChar = 'S';
		break;
	}

	if (this.reportURL(pharoUrl + 'digitalPinMode?pin=' + pin + '&mode=' + modeChar) === 'OK') {
		return true; 
	} 
}
