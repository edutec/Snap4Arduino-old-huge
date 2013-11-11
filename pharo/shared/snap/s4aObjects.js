// Definition of our new primitive blocks

SpriteMorph.prototype.blocks.webSocketSend = {
            type: 'command',
            category: 'sensing',
            spec: 'send WebSocket message %s',
            defaults: ['hello']
		};
SpriteMorph.prototype.blocks.reportAnalogReading = 
		{
            type: 'reporter',
            category: 'sensing',
            spec: 'analog reading %n'
        };
SpriteMorph.prototype.blocks.reportDigitalReading = 
		{
            type: 'reporter',
            category: 'sensing',
            spec: 'digital reading %n'
        };


// Our way of overriding blockTemplates() without having to copy all of its code:

StageMorph.prototype.originalBlockTemplates = StageMorph.prototype.blockTemplates;
SpriteMorph.prototype.originalBlockTemplates = SpriteMorph.prototype.blockTemplates;

function overridenBlockTemplates(category) {

	var cat = category || 'motion',
		blocks = this.__proto__.originalBlockTemplates(cat); // this will either be StageMorph or SpriteMorph

	function blockBySelector(selector) {
        var newBlock = SpriteMorph.prototype.blockForSelector(selector, true);
        newBlock.isTemplate = true;
        return newBlock;
    }

	if (cat === 'sensing') {
		blocks.push('-');
		blocks.push(blockBySelector('webSocketSend'));
        blocks.push(blockBySelector('reportAnalogReading'));
        blocks.push(blockBySelector('reportDigitalReading'));
	};

	return blocks;
}

StageMorph.prototype.blockTemplates = overridenBlockTemplates;
SpriteMorph.prototype.blockTemplates = overridenBlockTemplates;
