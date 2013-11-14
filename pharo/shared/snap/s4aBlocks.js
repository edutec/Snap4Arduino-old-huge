// labelPart() proxy

SyntaxElementMorph.prototype.originalLabelPart = SyntaxElementMorph.prototype.labelPart;

function overridenLabelPart(spec) {
	var part;
	switch (spec) {
		case '%port':
			part = new InputSlotMorph(
				null,
				false,
				serialPortNames
				);
			part.setContents(Object.keys(serialPortNames)[0]);
		break;
		case '%arduinoType':
			part = new InputSlotMorph(
				null,
				false,
				arduinoTypes,
				true
				);
			part.setContents('ArduinoUNO');
		break; 
		case '%servoValue':
			part = new InputSlotMorph(
				null,
				false,
				{
					'stopped' : 1500,
					'clockwise' : 1200,
				 	'counter-clockwise' : 1700
				},
				true
				);
			part.setContents(1200);
		break;
		case '%pinMode':
			part = new InputSlotMorph(
				null,
				false,
				{
					'digital input' : 'I',
					'digital output' : 'O',
				 	'PWM' : 'P',
				 	'servo' : 'S'
				},
				true
				);
			part.setContents('I');
		break;
		case '%servoPin':
			part = new InputSlotMorph(
				null,
				true,
				function() { return boardSpecs.servoPins }
				);
		break;
		case '%analogPin':
			part = new InputSlotMorph(
				null,
				true,
				function() { return boardSpecs.analogPins }
				);
		break;
		case '%digitalPin':
			part = new InputSlotMorph(
				null,
				true,
				function() { return boardSpecs.digitalPins }
				);
		break;
		default:
			part = SyntaxElementMorph.prototype.originalLabelPart(spec);
		}
	return part;
}

SyntaxElementMorph.prototype.labelPart = overridenLabelPart
