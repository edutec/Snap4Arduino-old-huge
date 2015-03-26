// Motors
Process.prototype.leftMotorForward = function (value) {
	if (value) {
		this.digitalWrite(10, false);
		this.digitalWrite(11, true);
	} else {
		this.digitalWrite(10, false);
		this.digitalWrite(11, false);
	}
};
Process.prototype.leftMotorBackward = function (value) {
	if (value) {
		this.digitalWrite(10, true);
		this.digitalWrite(11, false);
	} else {
		this.digitalWrite(10, false);
		this.digitalWrite(11, false);
	}
};
Process.prototype.rightMotorForward = function (value) {
	if (value) {
		this.digitalWrite(13, false);
		this.digitalWrite(12, true);
	} else {
		this.digitalWrite(13, false);
		this.digitalWrite(12, false);
	}
};
Process.prototype.rightMotorBackward = function (value) {
	if (value) {
		this.digitalWrite(13, true);
		this.digitalWrite(12, false);
	} else {
		this.digitalWrite(13, false);
		this.digitalWrite(12, false);
	}
};

// Sensors
Process.prototype.frontLeftSensor = function () { 
	return this.reportAnalogReading(4);
};
Process.prototype.frontRightSensor = function () { 
	return this.reportAnalogReading(1);
};
Process.prototype.sideLeftSensor = function () { 
	return this.reportAnalogReading(5);
};
Process.prototype.sideRightSensor = function () { 
	return this.reportAnalogReading(0);
};
Process.prototype.bottomLeftSensor = function () { 
	return this.reportAnalogReading(3);
};
Process.prototype.bottomRightSensor = function () { 
	return this.reportAnalogReading(2);
};

// LEDs
Process.prototype.leftLEDRed = function (value) {
	this.digitalWrite(4, value);
};
Process.prototype.leftLEDGreen = function (value) {
	this.digitalWrite(5, value);
};
Process.prototype.leftLEDBlue = function (value) {
	this.digitalWrite(6, value);
};
Process.prototype.rightLEDRed = function (value) {
	this.digitalWrite(7, value);
};
Process.prototype.rightLEDGreen = function (value) {
	this.digitalWrite(8, value);
};
Process.prototype.rightLEDBlue = function (value) {
	this.digitalWrite(9, value);
};

// Speaker
Process.prototype.speaker = function (value) {
	this.digitalWrite(3, value);
};

// Values
Process.prototype.low = function () { 
	return false;
};	
Process.prototype.high = function () { 
	return true;
};	

Process.prototype.stopAll = function () {
	for (i = 2; i < 14; i++) {
		this.digitalWrite(i, 0);
	}
}

