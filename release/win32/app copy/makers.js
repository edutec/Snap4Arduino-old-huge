"use strict";

// Global object to encapsulate general variables and functions related to Makers functionality
var MakerApp = {};

var SerialPort = require("serialport");


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
	if (board != undefined) {
		var port = board.sp.path;
		board.sp.disconnected( function(err) {
			alert("Arduino board disconnected from port "+port);
			if (err) { 
				console.log(err); 
				return 
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

        // Filter the ports to select only those "arduino" compatible
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
			console.log("Board", "No USB devices detected");

			// Return (not that it matters, but this is a good way
			// to indicate to readers of the code that nothing else
			// will happen in this function)
			return;
		}

		console.log(
			"Device(s)",
			ports.toString().grey
		);

      	// Get the first available device path from the list of
      	// detected ports
      	callback.call(this, ports[0]);
    }.bind(this));
}

/**
 * Attempt to create a board object (firmata connection) on the given port
 */
MakerApp.makersAttemptToConnectArduino = function() {
	if (board == undefined) {

		// First, try to find a compatible board
		MakerApp.makersFindCompatibleUSBPorts(function(port) {
			// If found, attempt connection (if global board is still not defined)
			if ((board == undefined) && (MakerApp.state != "connecting")) {
				// State mark to avoid multiple connection attempts
				MakerApp.state = "connecting";
				board = new firmata.Board(port, function(err) {
					if (err) {
						console.log(err)
					} else {
						alert("An Arduino board has been connected at port "+port);
						console.log('An Arduino board has been connected. Happy prototyping!');
					}
					MakerApp.state = null;
				})	

				// Go back to not connected state if after timeout has not connected
				setTimeout(function() {
					if (MakerApp.state == "connecting") {
						MakerApp.state = null;
					}
				},10000)
				
			}		
		})		
	}
}


/*
var myInterval = setInterval(function(){
  console.log("Try to connect");
  if (connected == false) {
    TryConnection(tryConnCallback);
  } else {
    clearInterval(myInterval)
  }
},5000);


var rport = /usb|acm|^com/i;

var TryConnection = function(callback) {
  SerialPort.list(function(err, result) {
      var ports,
        length;

      ports = result.filter(function(val) {
        var available = true;

        console.log(val);

        // Match only ports that Arduino cares about
        // ttyUSB#, cu.usbmodem#, COM#
        if (!rport.test(val.comName)) {
          available = false;
        }


        return available;
      }).map(function(val) {
        return val.comName;
      });

      length = ports.length;

      // If no ports are detected when scanning /dev/, then there is
      // nothing left to do and we can safely exit the program
      if (!length) {
        // Alert user that no devices were detected
        console.log("Board", "No USB devices detected");


        // Return (not that it matters, but this is a good way
        // to indicate to readers of the code that nothing else
        // will happen in this function)
        return;
      }

      console.log(
        "Device(s)",
        ports.toString().grey
      );

      // Get the first available device path from the list of
      // detected ports
      callback.call(this, ports[0]);
    }.bind(this));
  }
  /*
    SerialPort.list(function (err, ports) {
      ports.forEach(function(port) {
        console.log(port.comName);
        console.log(port.pnpId);
        console.log(port.manufacturer);
      });
    });
*/
      
      /*
var connected = false;

var tryConnCallback = function(path) {
    if (path) {
    console.log("Arduino detected on "+path)
    var serialport = new SerialPort.SerialPort(path, {
      //baudrate:9600,
      parser: SerialPort.parsers.readline("\n")
    });

    serialport.on("open", function () {
      console.log('open');
      connected = true;

      serialport.on('data', function(data) {
        console.log(data);


        values = data.split(",");
        console.log('r1: ' + values[0]+ ' r2: '+values[1] + ' time: '+values[2] );

        var ratio1 = values[0];
        var ratio2 = values[1];


        var concentration1 = 0.000464374*Math.pow(ratio1,3)-0.00624688*Math.pow(ratio1,2)+0.128844*ratio1-0.0455532;
        var concentration2 = 0.000464374*Math.pow(ratio2,3)-0.00624688*Math.pow(ratio2,2)+0.128844*ratio2-0.0455532;
        
        concentration1 = concentration1 > 0 ? concentration1 : 0;
        concentration2 = concentration2 > 0 ? concentration2 : 0;

        recordSample({'ratio1': ratio1, 'concentration1': 1000*concentration1,'ratio2': ratio2, 'concentration2': 1000*concentration2});

        agregator1 = agregator1 + parseFloat(ratio1);
        agregator2 = agregator2 + parseFloat(ratio2);
        agregator_count = agregator_count+1;

        console.log("agregator1: "+agregator1);
        console.log("agregator count: "+agregator_count);

        console.log("agregator2: "+agregator2);

        if (agregator_count >= 10) {
          var ratio1Agg = (agregator1+0.0)/agregator_count;
          var concentration1Agg = 0.000464374*Math.pow(ratio1Agg,3)-0.00624688*Math.pow(ratio1Agg,2)+0.128844*ratio1Agg-0.0455532;

          var ratio2Agg = (agregator2+0.0)/agregator_count;
          var concentration2Agg = 0.000464374*Math.pow(ratio2Agg,3)-0.00624688*Math.pow(ratio2Agg,2)+0.128844*ratio2Agg-0.0455532;

          concentration1Agg = concentration1Agg > 0 ? concentration1Agg : 0;
          concentration2Agg = concentration2Agg > 0 ? concentration2Agg : 0;
          
          console.log("Agg1: "+ratio1Agg+" - "+concentration1Agg);
          console.log("Agg2: "+ratio2Agg+" - "+concentration2Agg);
          recordSampleAggregated({'ratio1': ratio1Agg, 'concentration1': 1000*concentration1Agg,'ratio2': ratio2Agg, 'concentration2': 1000*concentration2Agg});

          agregator1 = 0;
          agregator2 = 0;
          agregator_count =0;

        }



      });
    
    });
  } else {
    console.log("No arduino detected")
  }
}



/*
SyntaxElementMorph.prototype.originalLabelPart = SyntaxElementMorph.prototype.labelPart;

function overridenLabelPart(spec) {
	var part;
	switch (spec) {
		case '%port':
			part = new InputSlotMorph(
				null,
				false,
				function() {
					

					return portList;

					//require('fs').readdirSync('/dev/').filter(function(each){ return each.match('^ttyACM*|^ttyUSB*') }).map(function(each) { return '/dev/' + each }).forEach(function(each) { ports[each] = each });
				} 
				);
			break;
		case '%servoValue':
			part = new InputSlotMorph(
				null,
				false,
				{
					'angle (0-180)' : 90,
					'stopped' : ['stopped'] , 
					'clockwise' : ['clockwise'] ,
				 	'counter-clockwise' : ['counter-clockwise']
				}
				);
			part.setContents(['clockwise']);
			break;
		case '%pinMode':
			part = new InputSlotMorph(
				null,
				false,
				{
					'digital input' : ['digital input'],
					'digital output' : ['digital output'] ,
				 	'PWM' : ['PWM'] ,
				 	'servo' : ['servo']
				},
				true
				);
			part.setContents(['servo']);
			break;
		case '%servoPin':
			part = new InputSlotMorph(
				null,
				true,
				function() { 
			   		if (board) {
						return pinsSetToMode(board.MODES.SERVO);
					} else {
						return [];
					}
				},
				true
				);
			break;
		case '%pwmPin':
			part = new InputSlotMorph(
				null,
				true,
				function() { 
			   		if (board) {
						return pinsSetToMode(board.MODES.PWM);
					} else {
						return [];
					}
				},
				true
				);
			break;
		case '%analogPin':
            part = new InputSlotMorph(
                null,
                true,
				function() { 
					if (board) { 
						return board.analogPins.map(function(each){ return (each - board.analogPins[0]).toString() });
					} else { 
						return [];
					} 
				},
				true
            );
            break;
		case '%digitalPin':
			part = new InputSlotMorph(
				null,
				true,
				function() {
					if (board) {
						var pinNumbers = [];
						var pins = board.pins.filter(function(each){ return each.analogChannel == 127 });
						pins.forEach(function(each){ pinNumbers.push(pins.indexOf(each).toString()) });
						return pinNumbers;
					} else {
						return [];
					}
				},
				true
				);
			break;
		default:
			part = SyntaxElementMorph.prototype.originalLabelPart(spec);
		}
	return part;
}

SyntaxElementMorph.prototype.labelPart = overridenLabelPart
*/
