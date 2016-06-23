// Definition of a new Phiro+ Category

// SpriteMorph.prototype.categories.remove('arduino');

SpriteMorph.prototype.categories[SpriteMorph.prototype.categories.length - 1] = 'phiro Pro';
SpriteMorph.prototype.blockColor['phiro Pro'] = new Color(64, 136, 182);

SpriteMorph.prototype.blockColor['leds'] = new Color(00, 255, 00);

SpriteMorph.prototype.oldInitBlocks = SpriteMorph.prototype.initBlocks;
SpriteMorph.prototype.initBlocks = function() {

    this.oldInitBlocks();

    // Motors
    this.blocks.leftMotorForward =
        {
        only: SpriteMorph,
        type: 'command',
        category: 'phiro Pro',
        spec: 'Left Motor Forward %n'
    };

    this.blocks.leftMotorBackward =
        {
        only: SpriteMorph,
        type: 'command',
        category: 'phiro Pro',
        spec: 'Left Motor Backward %n'
    };

    this.blocks.rightMotorForward =
        {
        only: SpriteMorph,
        type: 'command',
        category: 'phiro Pro',
        spec: 'Right Motor Forward %n'
    };

    this.blocks.rightMotorBackward =
        {
        only: SpriteMorph,
        type: 'command',
        category: 'phiro Pro',
        spec: 'Right Motor Backward %n'
    };

    // Sensors
    this.blocks.frontLeftSensor = 
        {
        only: SpriteMorph,
        type: 'reporter',
        category: 'variables',
        spec: 'Front Left Sensor'
    };
    this.blocks.frontRightSensor = 
        {
        only: SpriteMorph,
        type: 'reporter',
        category: 'variables',
        spec: 'Front Right Sensor'
    };
    this.blocks.sideLeftSensor = 
        {
        only: SpriteMorph,
        type: 'reporter',
        category: 'variables',
        spec: 'Side Left Sensor'
    };
    this.blocks.sideRightSensor = 
        {
        only: SpriteMorph,
        type: 'reporter',
        category: 'variables',
        spec: 'Side Right Sensor'
    };
    this.blocks.bottomLeftSensor = 
        {
        only: SpriteMorph,
        type: 'reporter',
        category: 'variables',
        spec: 'Bottom Left Sensor'
    };
    this.blocks.bottomRightSensor = 
        {
        only: SpriteMorph,
        type: 'reporter',
        category: 'variables',
        spec: 'Bottom Right Sensor'
    };

    // LEDs
    this.blocks.leftLEDRed =
        {
        only: SpriteMorph,
        type: 'command',
        category: 'leds',
        spec: 'Left LED Red %n'
    };
    this.blocks.leftLEDGreen =
        {
        only: SpriteMorph,
        type: 'command',
        category: 'leds',
        spec: 'Left LED Green %n'
    };
    this.blocks.leftLEDBlue =
        {
        only: SpriteMorph,
        type: 'command',
        category: 'leds',
        spec: 'Left LED Blue %n'
    };
    this.blocks.rightLEDRed =
        {
        only: SpriteMorph,
        type: 'command',
        category: 'leds',
        spec: 'Right LED Red %n'
    };
    this.blocks.rightLEDGreen =
        {
        only: SpriteMorph,
        type: 'command',
        category: 'leds',
        spec: 'Right LED Green %n'
    };
    this.blocks.rightLEDBlue =
        {
        only: SpriteMorph,
        type: 'command',
        category: 'leds',
        spec: 'Right LED Blue %n'
    };

    // Speaker
    this.blocks.speaker =
        {
        only: SpriteMorph,
        type: 'command',
        category: 'sound',
        spec: 'Speaker %n'
    };

    // Values
    this.blocks.low = 
        {
        only: SpriteMorph,
        type: 'predicate',
        category: 'variables',
        spec: 'low'
    };	
    this.blocks.high = 
        {
        only: SpriteMorph,
        type: 'predicate',
        category: 'variables',
        spec: 'high'
    };	

    // Stop All
    this.blocks.stopAll = 
        {
        only: SpriteMorph,
        type: 'command',
        category: 'control',
        spec: 'Stop All'
    };	

};

SpriteMorph.prototype.initBlocks();

SpriteMorph.prototype.oldBlockTemplates = SpriteMorph.prototype.blockTemplates;
SpriteMorph.prototype.blockTemplates = function(category) {
    var myself = this;

    var blocks = myself.oldBlockTemplates(category); 

    //  Button that triggers a connection attempt 

    var arduinoConnectButton = new PushButtonMorph(
        null,
        function () {
            myself.arduino.attemptConnection();
        },
        'Connect Phiro Pro'
    );

    //  Button that triggers a disconnection from board

    var arduinoDisconnectButton = new PushButtonMorph(
        null,
        function () {
            myself.arduino.disconnect();;
        },
        'Disconnect Phiro Pro'
    );

    function blockBySelector(selector) {
        var newBlock = SpriteMorph.prototype.blockForSelector(selector, true);
        newBlock.isTemplate = true;
        return newBlock;
    };

    if (category === 'phiro Pro') {
        blocks.push(arduinoConnectButton);
        blocks.push(arduinoDisconnectButton);
        blocks.push('-');

        // Motors
        blocks.push(blockBySelector('leftMotorForward'));
        blocks.push(blockBySelector('leftMotorBackward'));
        blocks.push(blockBySelector('rightMotorForward'));
        blocks.push(blockBySelector('rightMotorBackward'));
        blocks.push('-');

        // Sensors
        blocks.push(blockBySelector('frontLeftSensor'));
        blocks.push(blockBySelector('frontRightSensor'));
        blocks.push(blockBySelector('sideLeftSensor'));
        blocks.push(blockBySelector('sideRightSensor'));
        blocks.push(blockBySelector('bottomLeftSensor'));
        blocks.push(blockBySelector('bottomRightSensor'));
        blocks.push('-');

        // LEDs
        blocks.push(blockBySelector('leftLEDRed'));
        blocks.push(blockBySelector('leftLEDGreen'));
        blocks.push(blockBySelector('leftLEDBlue'));
        blocks.push(blockBySelector('rightLEDRed'));
        blocks.push(blockBySelector('rightLEDGreen'));
        blocks.push(blockBySelector('rightLEDBlue'));
        blocks.push('-');

        // Speaker
        blocks.push(blockBySelector('speaker'));
        blocks.push('-');

        // Stop All
        blocks.push(blockBySelector('stopAll'));
        blocks.push('-');

        // Values
        blocks.push(blockBySelector('low'));
        blocks.push(blockBySelector('high'));

    };

    return blocks;
};
