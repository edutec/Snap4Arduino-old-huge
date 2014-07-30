
// blockTemplates() proxy

StageMorph.prototype.originalBlockTemplates = StageMorph.prototype.blockTemplates;
SpriteMorph.prototype.originalBlockTemplates = SpriteMorph.prototype.blockTemplates;


// Definition of a new Arduino Category

SpriteMorph.prototype.categories =
    [
        'motion',
        'control',
        'looks',
        'sensing',
        'sound',
        'operators',
        'pen',
        'variables',
        'lists',
		'arduino',
        'other'
    ];

SpriteMorph.prototype.blockColor = {
    motion : new Color(74, 108, 212),
    looks : new Color(143, 86, 227),
    sound : new Color(207, 74, 217),
    pen : new Color(0, 161, 120),
    control : new Color(230, 168, 34),
    sensing : new Color(4, 148, 220),
    operators : new Color(98, 194, 19),
    variables : new Color(243, 118, 29),
    lists : new Color(217, 77, 17),
	arduino: new Color(64, 136, 182),
    other: new Color(150, 150, 150)
};


// Definition of our new primitive blocks
function overridenBlockTemplates(category) {
	SpriteMorph.prototype.blocks.reportAnalogReading = 
	{
       	type: 'reporter',
        category: 'arduino',
        spec: 'analog reading %analogPin'
	};

	SpriteMorph.prototype.blocks.reportDigitalReading = 
	{
        type: 'reporter',
		category: 'arduino',
		spec: 'digital reading %digitalPin'
	};

	SpriteMorph.prototype.blocks.connectArduino =
	{
		type: 'command',
		category: 'arduino',
		spec: 'connect arduino at %port'
	};

	SpriteMorph.prototype.blocks.setPinMode =
	{
		type: 'command',
		category: 'arduino',
		spec: 'setup digital pin %digitalPin as %pinMode'
	};

	SpriteMorph.prototype.blocks.digitalWrite =
	{
		type: 'command',
		category: 'arduino',
		spec: 'set digital pin %digitalPin to %b'
	};

	SpriteMorph.prototype.blocks.servoWrite =
	{
		type: 'command',
		category: 'arduino',
		spec: 'set servo %servoPin to %servoValue'
	};

	SpriteMorph.prototype.blocks.pwmWrite =
	{
		type: 'command',
		category: 'arduino',
		spec: 'set PWM pin %pwmPin to %n'
	};



	// *this* will either be StageMorph or SpriteMorph
	var blocks = this.originalBlockTemplates(category); 

	function blockBySelector(selector) {
        var newBlock = SpriteMorph.prototype.blockForSelector(selector, true);
        newBlock.isTemplate = true;
        return newBlock;
    }

	if (category === 'arduino') {
        blocks.push(blockBySelector('connectArduino'));
		blocks.push('-');
        blocks.push(blockBySelector('setPinMode'));
		blocks.push('-');
        blocks.push(blockBySelector('servoWrite'));
        blocks.push(blockBySelector('digitalWrite'));
        blocks.push(blockBySelector('pwmWrite'));
		blocks.push('-');
        blocks.push(blockBySelector('reportAnalogReading'));
        blocks.push(blockBySelector('reportDigitalReading'));
	}

	return blocks;
}

StageMorph.prototype.blockTemplates = overridenBlockTemplates;
SpriteMorph.prototype.blockTemplates = overridenBlockTemplates;
