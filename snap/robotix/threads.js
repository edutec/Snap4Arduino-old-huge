// Motors
Process.prototype.leftMotorForward = function (value) {
    var board = this.homeContext.receiver.arduino.board;

    if (board.pins[11].mode != board.MODES.PWM) {
        board.pinMode(11, board.MODES.PWM);
    }

    this.pwmWrite(11, Math.min(100, value) / 100 * 255);
};
Process.prototype.leftMotorBackward = function (value) {
    var board = this.homeContext.receiver.arduino.board;

    if (board.pins[10].mode != board.MODES.PWM) {
        board.pinMode(10, board.MODES.PWM);
    }

    this.pwmWrite(10, Math.min(100, value) / 100 * 255);
};
Process.prototype.rightMotorForward = function (value) {
    var board = this.homeContext.receiver.arduino.board;

    if (board.pins[12].mode != board.MODES.PWM) {
        board.pinMode(12, board.MODES.PWM);
    }

    this.pwmWrite(12, Math.min(100, value) / 100 * 255);
};
Process.prototype.rightMotorBackward = function (value) {
    var board = this.homeContext.receiver.arduino.board;

    if (board.pins[2].mode != board.MODES.PWM) {
        board.pinMode(2, board.MODES.PWM);
    }

    this.pwmWrite(2, Math.min(100, value) / 100 * 255);
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
    var board = this.homeContext.receiver.arduino.board;

    if (board.pins[4].mode != board.MODES.PWM) {
        board.pinMode(4, board.MODES.PWM);
    }

    this.pwmWrite(4, value);
};
Process.prototype.leftLEDGreen = function (value) {
    var board = this.homeContext.receiver.arduino.board;

    if (board.pins[5].mode != board.MODES.PWM) {
        board.pinMode(5, board.MODES.PWM);
    }

    this.pwmWrite(5, value);
};
Process.prototype.leftLEDBlue = function (value) {
    var board = this.homeContext.receiver.arduino.board;

    if (board.pins[6].mode != board.MODES.PWM) {
        board.pinMode(6, board.MODES.PWM);
    }

    this.pwmWrite(6, value);
};
Process.prototype.rightLEDRed = function (value) {
    var board = this.homeContext.receiver.arduino.board;

    if (board.pins[7].mode != board.MODES.PWM) {
        board.pinMode(7, board.MODES.PWM);
    }

    this.pwmWrite(7, value);
};
Process.prototype.rightLEDGreen = function (value) {
    var board = this.homeContext.receiver.arduino.board;

    if (board.pins[8].mode != board.MODES.PWM) {
        board.pinMode(8, board.MODES.PWM);
    }
    this.pwmWrite(8, value);
};
Process.prototype.rightLEDBlue = function (value) {
    var board = this.homeContext.receiver.arduino.board;

    if (board.pins[9].mode != board.MODES.PWM) {
        board.pinMode(9, board.MODES.PWM);
    }

    this.pwmWrite(9, value);
};

// Speaker
Process.prototype.speaker = function (value) {
    var board = this.homeContext.receiver.arduino.board;

    if (board.pins[3].mode != board.MODES.PWM) {
        board.pinMode(3, board.MODES.PWM);
    }

    this.pwmWrite(3, value);
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

