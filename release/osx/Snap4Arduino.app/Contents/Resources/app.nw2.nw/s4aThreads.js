Process.prototype.autoConnectArduino = function () {	
	var myself = this;

	serialport = require("serialport");

	// Viable ports types for an Arduino connection
	rport = /usb|acm|^com/i;

	var connected = myself.context.boardConnected;

	var tryToConnect = function(port) {
		console.log(port);

		if (board === undefined && connected === undefined) {
			board = new firmata.Board(port, function(err) { 
				connected = true;
				
				alert("Board connected");
				/*
				board.on("open", function() {
					alert("Board connected");
				}); 
				
				board.on("close", function() {
					alert("Board closed");
				})*/
			

				if (err) { 
					console.log(err); 
					return 
				} else {
					console.log('An Arduino board has been connected. Happy prototyping!');
				}
			});
		}
		if (connected) {
			return null;
		}
		this.pushContext('doYield');
		this.pushContext();
	}.bind(this);
	
	// Check list of possible serial ports (borrowed from johnny-five)
	serialport.list(function(err, result) {
      var ports,
        length;

      ports = result.filter(function(val) {
        var available = true;

        // Match only ports that Arduino cares about
        // ttyUSB#, cu.usbmodem#, COM#
        if (!rport.test(val.comName)) {
          available = false;
        }

/*
        // Don't allow already used/encountered usb device paths
        if (Serial.used.indexOf(val.comName) > -1) {
          available = false;
        }
        */

        return available;
      }).map(function(val) {
        return val.comName;
      });

      length = ports.length;

      // If no ports are detected when scanning /dev/, then there is
      // nothing left to do and we can safely exit the program
      if (!length) {
        // Alert user that no devices were detected
        this.error("Board", "No USB devices detected");

        // Exit the program by sending SIGABRT
        process.exit(3);

        // Return (not that it matters, but this is a good way
        // to indicate to readers of the code that nothing else
        // will happen in this function)
        return;
      }

      // Continue with connection routine attempts
      console.log(
        "Serial",
        "Found possible serial port" + (length > 1 ? "s" : ""),
        ports.toString().grey
      );

      // Get the first available device path from the list of
      // detected ports
      tryToConnect.call(this, ports[0]);
    }.bind(this));
  



}

Process.prototype.disConnectArduino = function () {
	var myself = this;
	if (board) {
		board.sp.disconnected( function(err) {
			alert("Board closed");
			if (err) { 
				console.log(err); 
				return 
			} else {
				console.log('An Arduino board has been disconnected.');
			}

		});
		board = undefined;

	}
	if (board === undefined) {
		return null;
	}
	this.pushContext('doYield');
	this.pushContext();
}

Process.prototype.connectedArduino = function () {
	return (board != undefined);
}



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
	return null;
}

Process.prototype.reportAnalogReading = function (pin) {
	if (board.pins[board.analogPins[pin]].mode != board.MODES.ANALOG) {
		board.pinMode(board.analogPins[pin],board.MODES.ANALOG);
	}
	return board.pins[board.analogPins[pin]].value;
};
	
Process.prototype.reportDigitalReading = function (pin) {
	if (board.pins[pin].mode != board.MODES.INPUT) {
		board.pinMode(pin,board.MODES.INPUT);
	}
	return board.pins[pin].value == 1;
};


Process.prototype.digitalWrite = function (pin, booleanValue) {
	var val;
	if (booleanValue) { val = board.HIGH } else { val = board.LOW };
	board.digitalWrite(pin, val);
	return null;
}

Process.prototype.pwmWrite = function (pin, value) {
	board.analogWrite(pin, value);
	return null;
}
