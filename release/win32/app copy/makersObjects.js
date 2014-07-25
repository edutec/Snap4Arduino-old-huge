/**
* Makers extension for Snap4Arduino
* We create an additional block group - makers - with specific functions for the Makers shield for arduino
*/


/**
* We create areference to the origina Block definition following the same apporach as snap4arduino
*/
StageMorph.prototype.originalBlockTemplates_Makers = StageMorph.prototype.blockTemplates;
SpriteMorph.prototype.originalBlockTemplates_Makers = SpriteMorph.prototype.blockTemplates;


// Definition of a new Makers Category

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
        'makers',
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
    makers : new Color(64, 64, 230),
    other: new Color(150, 150, 150)
};


// Definition of our new primitive blocks
function overridenBlockTemplates(category) {
    SpriteMorph.prototype.blocks.makersAutoconnectArduino =
    {
        type: 'command',
        category: 'makers',
        spec: 'auto connect arduino'
    };

    SpriteMorph.prototype.blocks.makersDisConnectArduino =
    {
        type: 'command',
        category: 'makers',
        spec: 'disconnect arduino'
    };

    SpriteMorph.prototype.blocks.makersIsConnectedArduino =
    {
        type: 'reporter',
        category: 'makers',
        spec: 'arduino is connected'
    };

    SpriteMorph.prototype.blocks.makersBuzzer =
    {
        type: 'command',
        category: 'makers',
        spec: 'buzzer at %buzzerval'
    };

    SpriteMorph.prototype.blocks.makersLedOn =
    {
        type: 'command',
        category: 'makers',
        spec: 'led on'
    };


    SpriteMorph.prototype.blocks.makersLedOff =
    {
        type: 'command',
        category: 'makers',
        spec: 'led off'
    };

    SpriteMorph.prototype.blocks.makersPotentiometer =
    {
        type: 'reporter',
        category: 'makers',
        spec: 'potentiometer'
    };
 
    SpriteMorph.prototype.blocks.makersTemperature =
    {
        type: 'reporter',
        category: 'makers',
        spec: 'temperature'
    };

    SpriteMorph.prototype.blocks.makersAudio =
    {
        type: 'reporter',
        category: 'makers',
        spec: 'audio'
    };

    SpriteMorph.prototype.blocks.makersLight =
    {
        type: 'reporter',
        category: 'makers',
        spec: 'light'
    };


 
    SpriteMorph.prototype.blocks.makersSwitch =
    {
        type: 'predicate',
        category: 'makers',
        spec: 'switch'
    };
    


    // *this* will either be StageMorph or SpriteMorph
    var blocks = this.originalBlockTemplates_Makers(category); 

    function blockBySelector(selector) {
        var newBlock = SpriteMorph.prototype.blockForSelector(selector, true);
        newBlock.isTemplate = true;
        return newBlock;
    }

    if (category === 'makers') {
        blocks.push(blockBySelector('makersAutoconnectArduino'));
        blocks.push(blockBySelector('makersDisConnectArduino'));
        blocks.push(blockBySelector('makersIsConnectedArduino'));
        blocks.push('-');
        blocks.push(blockBySelector('makersLedOn'));
        blocks.push(blockBySelector('makersLedOff'));
        blocks.push(blockBySelector('makersBuzzer'));
        blocks.push('-');
        blocks.push(blockBySelector('makersTemperature'));
        blocks.push(blockBySelector('makersLight'));
        blocks.push(blockBySelector('makersAudio'));
        blocks.push(blockBySelector('makersPotentiometer'));
        blocks.push('-');
        blocks.push(blockBySelector('makersSwitch'));

    }

    return blocks;
}

StageMorph.prototype.blockTemplates = overridenBlockTemplates;
SpriteMorph.prototype.blockTemplates = overridenBlockTemplates;
