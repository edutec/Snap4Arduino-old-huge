function pinsSettableToMode(aMode) {
    // Retrieve a list of pins that support a particular mode
    var sprite = world.children[0].currentSprite,
        board = sprite.arduino.board;

    var pinNumbers = {};
    var pins = board.pins;
    pins.forEach(
        function(each){ 
            if (each.supportedModes.indexOf(aMode) > -1) { 
                var number = pins.indexOf(each).toString(); 
                pinNumbers[number] = number;
            }
        }
    );
    return pinNumbers;
}

// labelPart() proxy

SyntaxElementMorph.prototype.originalLabelPart = SyntaxElementMorph.prototype.labelPart;

SyntaxElementMorph.prototype.labelPart = function(spec) {
    var part;
    switch (spec) {
        case '%servoValue':
            part = new InputSlotMorph(
                null,
                false,
                {
                    'angle (0-180)' : 90,
                    'stopped' : ['stopped'], 
                    'clockwise' : ['clockwise'],
                    'counter-clockwise' : ['counter-clockwise']
                }
        );
        break;
        case '%pinMode':
            part = new InputSlotMorph(
                null,
                false,
                {
                    'digital input' : ['digital input'],
                    'digital output' : ['digital output'] ,
                    'PWM' : ['PWM'],
                    'servo' : ['servo']
                },
                true
        );
        break;
        case '%servoPin':
            part = new InputSlotMorph(
                null,
                true,
                function() { 
                    // Get board associated to currentSprite
                    var sprite = world.children[0].currentSprite,
                        board = sprite.arduino.board;

                    if (board) {
                        return pinsSettableToMode(board.MODES.SERVO);
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
                    // Get board associated to currentSprite
                    var sprite = world.children[0].currentSprite,
                        board = sprite.arduino.board;

                    if (board) {
                        return pinsSettableToMode(board.MODES.PWM);
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
                    // Get board associated to currentSprite
                    var sprite = world.children[0].currentSprite,
                        board = sprite.arduino.board;

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
                    // Get board associated to currentSprite
                    var sprite = world.children[0].currentSprite,
                        board = sprite.arduino.board;

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
		//SDM
        case '%buzPin':
            part = new InputSlotMorph(
                null,
                true,
                function() {
                    // Get board associated to currentSprite
                    var sprite = world.children[0].currentSprite,
                        board = sprite.arduino.board;

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
        case '%redPin':
            part = new InputSlotMorph(
                null,
                true,
                function() {
                    // Get board associated to currentSprite
                    var sprite = world.children[0].currentSprite,
                        board = sprite.arduino.board;

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
        case '%grnPin':
            part = new InputSlotMorph(
                null,
                true,
                function() {
                    // Get board associated to currentSprite
                    var sprite = world.children[0].currentSprite,
                        board = sprite.arduino.board;

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
        case '%bluPin':
            part = new InputSlotMorph(
                null,
                true,
                function() {
                    // Get board associated to currentSprite
                    var sprite = world.children[0].currentSprite,
                        board = sprite.arduino.board;

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
        case '%songs':
            part = new InputSlotMorph(
                null,
                false,
                { //predefSongs
                    'Happy' : ['Happy']
                },
                true
        );
        break;
		case '%tones':
			part = new InputSlotMorph(
				null,
				false,
				{
					'C3' : ['C3__131'],
					'Cis3' : ['Cis3__139'],
					'D3' : ['D3__147'],
					'Dis3' : ['Dis3__156'],
					'E3' : ['E3__165'],
					'F3' : ['F3__175'],
					'Fis3' : ['Fis3__185'],
					'G3' : ['G3__196'],
					'Gis3' : ['Gis3__208'],
					'A3' : ['A3__220'],
					'Ais3' : ['Ais3__233'],
					'B3' : ['B3__247'],
					'C4' : ['C4__262'],
					'Cis4' : ['Cis4__277'],
					'D4' : ['D4__294'],
					'Dis4' : ['Dis4__311'],
					'E4' : ['E4__330'],
					'F4' : ['F4__349'],
					'Fis4' : ['Fis4__370'],
					'G4' : ['G4__392'],
					'Gis4' : ['Gis4__415'],
					'A4' : ['A4__440'],
					'Ais4' : ['Ais4__466'],
					'B4' : ['B4__494'],
					'C5' : ['C5__523'],
					'Cis5' : ['Cis5__554'],
					'D5' : ['D5__587'],
					'Dis5' : ['Dis5__622'],
					'E5' : ['E5__659'],
					'F5' : ['F5__698'],
					'Fis5' : ['Fis5__740'],
					'G5' : ['G5__784'],
					'Gis5' : ['Gis5__831'],
					'A5' : ['A5__880'],
					'Ais5' : ['Ais5__932'],
					'B5' : ['B5__988']
				},
				true
		);
		break;
        case '%colors':
            part = new InputSlotMorph(
                null,
                false,
                {
                    'black' : [localize('black') + '__black'],
					'white' : [localize('white') + '__white'],
					'red' : [localize('red') + '__red'],
					'green' : [localize('green') + '__green'],
					'blue' : [localize('blue') + '__blue'],
					'yellow' : [localize('yellow') + '__yellow'],
					'softWhite' : [localize('softWhite') + '__softWhite']
                },
                true
        );
        break;		
		//SDM
        default:
            part = this.originalLabelPart(spec);
    }
    return part;
}

BlockMorph.prototype.userMenu = function () {
    var menu = new MenuMorph(this),
        world = this.world(),
        myself = this,
        shiftClicked = world.currentKey === 16,
        alternatives,
        top,
        blck;

    menu.addItem(
        "help...",
        'showHelp'
    );
    if (shiftClicked) {
        top = this.topBlock();
        if (top instanceof ReporterBlockMorph) {
            menu.addItem(
                "script pic with result...",
                function () {
                    top.ExportResultPic();
                },
                'open a new window\n' +
                    'with a picture of both\nthis script and its result',
                new Color(100, 0, 0)
            );
        }
    }
    if (this.isTemplate) {
        if (!(this.parent instanceof SyntaxElementMorph)) {
            if (this.selector !== 'evaluateCustomBlock') {
                menu.addItem(
                    "hide",
                    'hidePrimitive'
                );
            }
        }
        return menu;
    }

    menu.addLine();
    if (this.selector === 'reportGetVar') {
        blck = this.fullCopy();
        blck.addShadow();
        menu.addItem(
            'rename...',
            function () {
                new DialogBoxMorph(
                    myself,
                    myself.setSpec,
                    myself
                ).prompt(
                    "Variable name",
                    myself.blockSpec,
                    world,
                    blck.fullImage(), // pic
                    InputSlotMorph.prototype.getVarNamesDict.call(myself)
                );
            }
        );
    } else if (SpriteMorph.prototype.blockAlternatives[this.selector]) {
        menu.addItem(
            'relabel...',
            function () {
                myself.relabel(
                    SpriteMorph.prototype.blockAlternatives[myself.selector]
                );
            }
        );
    } else if (this.definition && this.alternatives) { // custom block
        alternatives = this.alternatives();
        if (alternatives.length > 0) {
            menu.addItem(
                'relabel...',
                function () {myself.relabel(alternatives); }
            );
        }
    }

    menu.addItem(
        "duplicate",
        function () {
            var dup = myself.fullCopy(),
                ide = myself.parentThatIsA(IDE_Morph);
            dup.pickUp(world);
            if (ide) {
                world.hand.grabOrigin = {
                    origin: ide.palette,
                    position: ide.palette.center()
                };
            }
        },
        'make a copy\nand pick it up'
    );
    if (this instanceof CommandBlockMorph && this.nextBlock()) {
        menu.addItem(
            this.thumbnail(0.5, 60, false),
            function () {
                var cpy = this.fullCopy(),
                    nb = cpy.nextBlock(),
                    ide = myself.parentThatIsA(IDE_Morph);
                if (nb) {nb.destroy(); }
                cpy.pickUp(world);
                if (ide) {
                    world.hand.grabOrigin = {
                        origin: ide.palette,
                        position: ide.palette.center()
                    };
                }
            },
            'only duplicate this block'
        );
    }
    menu.addItem(
        "delete",
        'userDestroy'
    );
    menu.addItem(
        "script pic...",
        function () {
            window.open(myself.topBlock().fullImage().toDataURL());
        },
        'open a new window\nwith a picture of this script'
    );
    if (this.parentThatIsA(RingMorph)) {
        menu.addLine();
        menu.addItem("unringify", 'unringify');
        menu.addItem("ringify", 'ringify');
        return menu;
    }

    if (StageMorph.prototype.enableCodeMapping && this.selector == 'receiveGo') {
        menu.addLine();
        menu.addItem(
            localize('export as Arduino sketch...'),
            'exportAsArduinoC'
        );
    }

    if (this.parent instanceof ReporterSlotMorph
            || (this.parent instanceof CommandSlotMorph)
            || (this instanceof HatBlockMorph)
            || (this instanceof CommandBlockMorph
                && (this.topBlock() instanceof HatBlockMorph))) {
        return menu;
    }
    menu.addLine();
    menu.addItem("ringify", 'ringify');

    return menu;
};

BlockMorph.prototype.exportAsArduinoC = function () {
    var fs = require('fs'),
        ide = this.parentThatIsA(IDE_Morph),
        fileName = homePath() + (ide.projectName ? ide.projectName.replace(/[^a-zA-Z0-9]/g,'') : 'snap4arduino') + '.ino'; //SDM added numbers to regex

    try {
        fs.writeFileSync(fileName, this.world().Arduino.processC(this.mappedCode()));
        ide.showMessage('Exported as ' + fileName, 1);
    } catch (error) {
        ide.inform('Error exporting to Arduino sketch!', error.message)
    }
};


