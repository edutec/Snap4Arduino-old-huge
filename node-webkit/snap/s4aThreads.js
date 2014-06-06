Process.prototype.connectArduino = function (port) {
	var myself = this;
	if (board === undefined && myself.context.boardConnected === undefined) {
		board = new firmata.Board(port, function(err) { 
			myself.context.boardConnected = true;
			if (err) { 
				console.log(err); 
				return 
			} else {
				console.log('An Arduino board has been connected. Happy prototyping!');
				board.analogReadings = [];
				board.digitalReadings = [];
			}
		});
	}
	if (myself.context.boardConnected) {
		return null;
	}
	this.pushContext('doYield');
	this.pushContext();
}

Process.prototype.setPinMode = function (pin, mode) {
	var val;
	switch(mode[0]) {
		case 'digital input': val = board.MODES.INPUT; break;
		case 'digital output': val = board.MODES.OUTPUT; break;
		// not used, but left it here anyway:
		case 'analog input': val = board.MODES.ANALOG; break;
		case 'PWM': val = board.MODES.PWM; break;
		case 'servo': val = board.MODES.SERVO; break;
	}
	if (this.context.pinSet === undefined) {
		if (board.pins[pin].supportedModes.indexOf(val) > -1) {	
			board.pinMode(pin, val);
		} else { 
			return null
		}
	}
	if (board.pins[pin].mode === val) {
		this.context.pinSet = true;
		console.log('pin ' + pin + ' set to mode ' + mode);
		return null;
	}
	this.pushContext('doYield');
	this.pushContext();
}

Process.prototype.servoWrite = function (pin, value) {
	var numericValue;
	switch (value[0]) {
		case "clockwise":
			numericValue = 1200;
		break;
		case "counter-clockwise":
			numericValue = 1700;
		break;
		case "stopped":
			numericValue = 1500;
		break;
		default:
			numericValue = value;
		break;
	}
	board.servoWrite(pin, numericValue);
	console.log('servo value ' + numericValue + ' written to pin ' + pin);
	return null;
}

Process.prototype.reportAnalogReading = function (pin) {
	var myself = this;
	if (board.analogReadings[pin] === undefined && myself.context.startedReading === undefined) {
		myself.context.startedReading = true;
		board.pinMode(board.analogPins[pin],board.MODES.ANALOG);
		board.analogRead(pin, function(val) {
			board.analogReadings[pin] = val;
		});
		return 0;
	} else if (board.analogReadings[pin]) {
		return board.analogReadings[pin];
	} 
	this.pushContext('doYield');
	this.pushContext();
};
	
Process.prototype.reportDigitalReading = function (pin) {

	// REVIEW!!

	var myself = this;
	if (board.digitalReadings[pin] === undefined && myself.context.startedReading === undefined) {
		myself.context.startedReading = true;
		board.pinMode(board.digitalPins[pin],board.MODES.INPUT);
		board.digitalRead(pin, function(val) {
			board.digitalReadings[pin] = (val == 1);
		});
		return 0;
	} else if (board.digitalReadings[pin] != undefined) {
		return board.digitalReadings[pin];
	} 
	this.pushContext('doYield');
	this.pushContext();
};


Process.prototype.digitalWrite = function (pin, booleanValue) {
	var val;
	if (booleanValue) { val = board.HIGH } else { val = board.LOW };
	board.digitalWrite(pin, val);
	console.log('digital value ' + booleanValue + ' written to pin ' + pin);
	return null;
}

Process.prototype.pwmWrite = function (pin, value) {
	board.analogWrite(pin, value);
	console.log('pwm value ' + value + ' written to pin ' + pin);
	return null;
}


