// Definition of our new primitive blocks

SpriteMorph.prototype.blocks.reportAnalogReading = 
		{
            type: 'reporter',
            category: 'sensing',
            spec: 'analog reading %analogPin'
        };
SpriteMorph.prototype.blocks.reportDigitalReading = 
		{
            type: 'reporter',
            category: 'sensing',
            spec: 'digital reading %digitalPin'
        };

SpriteMorph.prototype.blocks.connectArduino =
		{
			type: 'command',
			category: 'sensing',
			spec: 'connect arduino %arduinoType at %port',
		};

SpriteMorph.prototype.blocks.setPinMode =
		{
			type: 'command',
			category: 'sensing',
			spec: 'setup digital pin %digitalPin as %pinMode',
		};
SpriteMorph.prototype.blocks.digitalWrite =
		{
			type: 'command',
			category: 'sensing',
			spec: 'set digital pin %digitalPin to %b',
		};
SpriteMorph.prototype.blocks.servoWrite =
		{
			type: 'command',
			category: 'sensing',
			spec: 'set servo %servoPin to %servoValue',
		};

// blockTemplates() proxy

StageMorph.prototype.originalBlockTemplates = StageMorph.prototype.blockTemplates;
SpriteMorph.prototype.originalBlockTemplates = SpriteMorph.prototype.blockTemplates;

function overridenBlockTemplates(category) {

	// *this* will either be StageMorph or SpriteMorph
	var blocks = this.originalBlockTemplates(category); 

	function blockBySelector(selector) {
        var newBlock = SpriteMorph.prototype.blockForSelector(selector, true);
        newBlock.isTemplate = true;
        return newBlock;
    }

	if (category === 'sensing') {
		blocks.push('-');
        blocks.push(blockBySelector('connectArduino'));
        blocks.push(blockBySelector('setPinMode'));
		blocks.push('-');
        blocks.push(blockBySelector('reportAnalogReading'));
        blocks.push(blockBySelector('reportDigitalReading'));
		blocks.push('-');
        blocks.push(blockBySelector('servoWrite'));
        blocks.push(blockBySelector('digitalWrite'));
	};

	return blocks;
}

StageMorph.prototype.blockTemplates = overridenBlockTemplates;
SpriteMorph.prototype.blockTemplates = overridenBlockTemplates;
