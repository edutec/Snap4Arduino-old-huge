/**
 * Attempts to connect to the first USB Device available.
 * Assumes that the device has firmata firmware installed
 */
Process.prototype.makersAutoconnectArduino = function () {	
	MakerApp.makersStartArduinoAutoConnect();
}

/**
 * Disconnects current device (attached to board).
 */
Process.prototype.makersDisConnectArduino = function () {
	MakerApp.makersStopArduinoAutoConnect();
}

/**
 * Checks is there is a connected device (if there is a board object).
 */
Process.prototype.makersIsConnectedArduino = function () {
	return (board != undefined);
}

/**
 * Turn on led on pin 13
 */
Process.prototype.makersLedOn = function () {
	this.digitalWrite(13,true);
}

/**
 * Turn off led on pin 13
 */
Process.prototype.makersLedOff = function () {
	this.digitalWrite(13,false);
}

/**
 * Gets potentiometer value (in scale of 1 to 100)
 */
Process.prototype.makersPotentiometer = function () {
	var val;

	val = this.reportAnalogReading(1);
	return Math.round(10*100*val/1023.0)/10;
}

/**
 * Gets temperature value (in Celcius degrees)
 */
Process.prototype.makersTemperature = function () {
	var val;

	val = this.reportAnalogReading(3);
	return Math.round(10*500*val/1023.0)/10;
}

/**
 * Gets light value (in scale of 1 to 100)
 */
Process.prototype.makersLight = function () {
	var val;

	val = this.reportAnalogReading(2);
	return Math.round(10*100*val/1023.0)/10;
}

/**
 * Gets potentiometer value (in scale of 1 to 100)
 */
Process.prototype.makersAudio = function () {
	var val;

	val = this.reportAnalogReading(0);
	return Math.round(10*100*val/1023.0)/10;
}

/**
 * Sets signal level for the buzzer
 */
Process.prototype.makersBuzzer = function(buzzlevel) {
	this.setPinMode(6,['PWM'])
	this.pwmWrite(6,buzzlevel);
}

/**
 * Gets switch on/off state
 */
Process.prototype.makersSwitch = function() {
	var val;

	val = this.reportDigitalReading(3);

	// Invert true/false value
	return !val;
}



