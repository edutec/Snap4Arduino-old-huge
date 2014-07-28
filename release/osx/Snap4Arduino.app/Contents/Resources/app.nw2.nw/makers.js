'use strict';

// Global object to encapsulate general variables and functions related to Makers functionality
var MakerApp = {};

var SerialPort = require('serialport');


/**
 * If no board is connected, check if a new USB device is available and try to connect
 * every 30 seconds
 */
MakerApp.makersStartArduinoAutoConnect = function() {
	MakerApp.makersAttemptToConnectArduino();
	MakerApp.connectInterval = setInterval(MakerApp.makersAttemptToConnectArduino, 10000);
};

/**
 * If no board is connected, check if a new USB device is available and try to connect
 * every 30 seconds
 */
MakerApp.makersStopArduinoAutoConnect = function() {
	if (board !== undefined) {
		var port = board.sp.path;
		board.sp.disconnected( function(err) {
			alert('Arduino board disconnected from port '+port);
			if (err) { 
				console.log(err); 
				return; 
			} else {
				console.log('An Arduino board has been disconnected.');
			}

		});
		board = null;

	}
	clearInterval(MakerApp.connectInterval);
};

/**
 * Gets a list of active USB ports that are compatible with Arduino devices
 */
MakerApp.makersFindCompatibleUSBPorts = function(callback) {

	// Get a list of active serial ports
	SerialPort.list(function(err, result) {
    	var ports,
        length;

        // Filter the ports to select only those 'arduino' compatible
    	ports = result.filter(function(val) {
        	var available = true;

	        // Get compatible ports -> Match only ports that Arduino cares about
	        // ttyUSB#, cu.usbmodem#, COM#
	        var rport = /usb|acm|^com/i;
	        if (!rport.test(val.comName)) {
	          available = false;
	        }

        	return available;
      	}).map(function(val) {
        	return val.comName;
      	});

      	// Get number of compatible ports
      	length = ports.length;

		// If no ports are detected when scanning /dev/, then there is
		// nothing left to do and we can safely exit the program
		if (!length) {
			// Alert user that no devices were detected
			console.log('Board', 'No USB devices detected');

			// Return (not that it matters, but this is a good way
			// to indicate to readers of the code that nothing else
			// will happen in this function)
			return;
		}

		console.log(
			'Device(s)',
			ports.toString().grey
		);

      	// Get the first available device path from the list of
      	// detected ports
      	callback.call(this, ports[0]);
    }.bind(this));
};

/**
 * Attempt to create a board object (firmata connection) on the given port
 */
MakerApp.makersAttemptToConnectArduino = function() {
	if (board === undefined) {

		// First, try to find a compatible board
		MakerApp.makersFindCompatibleUSBPorts(function(port) {
			// If found, attempt connection (if global board is still not defined)
			if ((board === undefined) && (MakerApp.state !== 'connecting')) {
				// State mark to avoid multiple connection attempts
				MakerApp.state = 'connecting';
				board = new firmata.Board(port, function(err) {
					if (err) {
						console.log(err);
					} else {
						alert('An Arduino board has been connected at port '+port);
						console.log('An Arduino board has been connected. Happy prototyping!');
					}
					MakerApp.state = null;
				});

				// Go back to not connected state if after timeout has not connected
				setTimeout(function() {
					if (MakerApp.state === 'connecting') {
						MakerApp.state = null;
					}
				},10000);
				
			}		
		});		
	}
};


