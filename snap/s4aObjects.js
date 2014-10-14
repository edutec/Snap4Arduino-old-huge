// init proxy

SpriteMorph.prototype.originalInit = SpriteMorph.prototype.init;

SpriteMorph.prototype.init = function(globals) {
	var myself = this;
	myself.originalInit(globals);

	myself.arduino = {
		board : undefined,		// Reference to arduino board - to be created by new firmata.Board()
		connecting : false,		// Mark to avoid multiple attempts to connect
		disconnecting : false,  // Mark to avoid serialport communication when it is being closed
		justConnected: false,	// Mark to avoid double attempts
	};

	myself.arduino.disconnect = function() {

		if (myself.arduino.board) {
			myself.arduino.disconnecting = true;
			myself.arduino.board.sp.close();
		} else {
			ide.inform(myself.name, localize('Board is not connected'))
		}
	}

	myself.arduino.showMessage = function(msg) {
		if (!myself.arduino.message) { myself.arduino.message = new DialogBoxMorph() };
	
		var txt = new TextMorph(
			msg,
	        this.fontSize,
			this.fontStyle,
			true,
			false,
			'center',
			null,
			null,
			MorphicPreferences.isFlat ? null : new Point(1, 1),
			new Color(255, 255, 255)
		);

		if (!myself.arduino.message.key) { myself.arduino.message.key = 'message' + myself.name + msg };

		myself.arduino.message.labelString = myself.name;
		myself.arduino.message.createLabel();
		if (msg) { myself.arduino.message.addBody(txt) };
		myself.arduino.message.drawNew();
		myself.arduino.message.fixLayout();
		myself.arduino.message.popUp(world);
		myself.arduino.message.show();
	}

	myself.arduino.hideMessage = function() {
		if (myself.arduino.message) {
			myself.arduino.message.cancel();
			myself.arduino.message = null;
		}
	}

	myself.arduino.attemptConnection = function() {
		if (!myself.arduino.connecting) {
			if (myself.arduino.board === undefined) {

				// Get list of ports (Arduino compatible)
				var ports = world.Arduino.getSerialPorts(function(ports) {
				
					var port;
				
					// Check if there is at least one port on ports object (which for some reason was defined as an array)
					if (Object.keys(ports).length == 0) {
						ide.inform(myself.name, localize('Could not connect an Arduino\nNo boards found'));
						return;
					} else if (Object.keys(ports).length == 1) {
						port = ports[Object.keys(ports)[0]]; // Choose the first compatible port
						myself.arduino.connect(port);
					} else if (Object.keys(ports).length > 1) { 
						var portMenu = new MenuMorph(this, 'select a port');
						Object.keys(ports).forEach(function(each) {
							portMenu.addItem(each, function() { 
								port = each;
								myself.arduino.connect(port);
							})
						});
						portMenu.popUpAtHand(world);		
					}
	
				});
			} else {
				ide.inform(myself.name, localize('There is already a board connected to this sprite'));
			}
		}
	
		if (myself.arduino.justConnected) {
			myself.arduino.justConnected = undefined;
			return;
		}
	
	}

	myself.arduino.closeHandler = function(silent) {

		if (!myself.arduino.oldBoards) { myself.arduino.oldBoards = [] };

		if (myself.arduino.board) {
			var port = myself.arduino.board.sp.path;

			myself.arduino.board.sp.removeListener('disconnect', myself.arduino.disconnectHandler);
			myself.arduino.board.sp.removeListener('close', myself.arduino.closeHandler);
			myself.arduino.board.sp.removeListener('error', myself.arduino.errorHandler);
			
			myself.arduino.oldBoards.push(myself.arduino.board);
			myself.arduino.board = undefined;
		};

		world.Arduino.unlockPort(myself.arduino.port);
		myself.arduino.connecting = false;
		myself.arduino.disconnecting = false;

		if (myself.arduino.disconnected & !silent) {
			ide.inform(myself.name, localize('Board was disconnected from port\n') + port + '\n\nIt seems that someone pulled the cable!');
			myself.arduino.disconnected = false;
		} else {
			ide.inform(myself.name, localize('Board was disconnected from port\n') + port);
		}
	}

	myself.arduino.disconnectHandler = function() {
		myself.arduino.disconnected = true;
		// var port = myself.arduino.board.sp.path;
	}
			
	myself.arduino.errorHandler = function(err) {
		ide.inform(myself.name, localize('An error was detected on the board\n\n') + err, myself.arduino.closeHandler(true));
	}
	
	myself.arduino.connect = function(port) {

		myself.arduino.showMessage(localize('Connecting board at port\n') + port);
		myself.arduino.connecting = true;

		myself.arduino.board = new world.Arduino.firmata.Board(port, function(err) { 
			if (!err) { 
				
				clearTimeout(myself.arduino.connectionTimeout); // Clear timeout to avoid problems if connection is closed before timeout is completed

				myself.arduino.board.sp.on('disconnect', myself.arduino.disconnectHandler);
				myself.arduino.board.sp.on('close', myself.arduino.closeHandler);
				myself.arduino.board.sp.on('error', myself.arduino.errorHandler);

				world.Arduino.lockPort(port);
				myself.arduino.port = myself.arduino.board.sp.path;
				myself.arduino.connecting = false;
				myself.arduino.justConnected = true;
				myself.arduino.board.connected = true;
	
				myself.arduino.hideMessage();
				ide.inform(myself.name, localize('An Arduino board has been connected. Happy prototyping!'));   
			} else {
				myself.arduino.hideMessage();
				ide.inform(myself.name, localize('Error connecting the board.') + ' ' + err, myself.arduino.closeHandler(true));
			}
			return;
		});
	
		// Set timeout to check if device does not speak firmata (in such case new Board callback was never called, but board object exists) 
		myself.arduino.connectionTimeout = setTimeout(function() {
			// If board.versionReceived = false, the board has not established a firmata connection
			if (myself.arduino.board && !myself.arduino.board.versionReceived) {
				var port = myself.arduino.board.sp.path;
	
				myself.arduino.hideMessage();
				ide.inform(myself.name, localize('Could not talk to Arduino in port\n') + port + '\n\n' + localize('Check if firmata is loaded.'))
				
				// silently closing the connection attempt
				myself.arduino.closeHandler(true); 
			}
		}, 10000)
	}

	myself.arduino.isBoardReady = function() {
		return ((myself.arduino.board !== undefined) && (myself.arduino.board.pins.length>0) && (!myself.arduino.disconnecting));
	}
}



// Definition of a new Arduino Category

SpriteMorph.prototype.categories.push('arduino');
SpriteMorph.prototype.blockColor['arduino'] = new Color(64, 136, 182);

SpriteMorph.prototype.originalInitBlocks = SpriteMorph.prototype.initBlocks;

SpriteMorph.prototype.initBlocks = function() {
	
	this.originalInitBlocks();

	this.blocks.reportAnalogReading = 
	{
		only: SpriteMorph,
       	type: 'reporter',
        category: 'arduino',
        spec: 'analog reading %analogPin'
	};

	this.blocks.reportDigitalReading = 
	{
		only: SpriteMorph,
        type: 'reporter',
		category: 'arduino',
		spec: 'digital reading %digitalPin',
	};

	this.blocks.connectArduino =
	{
		only: SpriteMorph,
		type: 'command',
		category: 'arduino',
		spec: 'connect arduino at %port'
	};

	this.blocks.setPinMode =
	{
		only: SpriteMorph,
		type: 'command',
		category: 'arduino',
		spec: 'setup digital pin %digitalPin as %pinMode',
		defaults: [null, 'servo']
	};

	this.blocks.digitalWrite =
	{
		only: SpriteMorph,
		type: 'command',
		category: 'arduino',
		spec: 'set digital pin %digitalPin to %b'
	};

	this.blocks.servoWrite =
	{
		only: SpriteMorph,
		type: 'command',
		category: 'arduino',
		spec: 'set servo %servoPin to %servoValue',
		defaults: [null, 'clockwise']
	};

	this.blocks.pwmWrite =
	{
		only: SpriteMorph,
		type: 'command',
		category: 'arduino',
		spec: 'set PWM pin %pwmPin to %n'
	};

}

SpriteMorph.prototype.initBlocks();

// blockTemplates proxy

SpriteMorph.prototype.originalBlockTemplates = SpriteMorph.prototype.blockTemplates;

// Definition of our new primitive blocks

SpriteMorph.prototype.blockTemplates = function(category) {
	var myself = this;

	var blocks = myself.originalBlockTemplates(category); 

	//  Button that triggers a connection attempt 

    var arduinoConnectButton = new PushButtonMorph(
            null,
            function () {
                myself.arduino.attemptConnection();
            },
            'Connect Arduino'
    );

    //  Button that triggers a disconnection from board

    var arduinoDisconnectButton = new PushButtonMorph(
            null,
            function () {
                myself.arduino.disconnect();;
            },
            'Disconnect Arduino'
    );

	function blockBySelector(selector) {
        var newBlock = SpriteMorph.prototype.blockForSelector(selector, true);
        newBlock.isTemplate = true;
        return newBlock;
    };

	if (category === 'arduino') {
		blocks.push(arduinoConnectButton);
        blocks.push(arduinoDisconnectButton);
		blocks.push('-');
        blocks.push(blockBySelector('setPinMode'));
		blocks.push('-');
        blocks.push(blockBySelector('servoWrite'));
        blocks.push(blockBySelector('digitalWrite'));
        blocks.push(blockBySelector('pwmWrite'));
		blocks.push('-');
        blocks.push(blockBySelector('reportAnalogReading'));
        blocks.push(blockBySelector('reportDigitalReading'));
	};

	return blocks;
}
