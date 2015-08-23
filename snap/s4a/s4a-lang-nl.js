s4aTempDict = {

/*
    Special characters: (see <http://0xcc.net/jsescape/>)

    Ä, ä   \u00c4, \u00e4
    Ö, ö   \u00d6, \u00f6
    Ü, ü   \u00dc, \u00fc
    ß      \u00df
*/
    // primitive blocks:

    /*
        Attention Translators:
        ----------------------
        At this time your translation of block specs will only work
        correctly, if the order of formal parameters and their types
        are unchanged. Placeholders for inputs (formal parameters) are
        indicated by a preceding % prefix and followed by a type
        abbreviation.

        For example:

            'say %s for %n secs'

        can currently not be changed into

            'say %n secs long %s'

        and still work as intended.

        Similarly

            'point towards %dst'

        cannot be changed into

            'point towards %cst'

        without breaking its functionality.
    */

    // arduino:
	'digital input':
		'digitale ingang',

	'digital output':
		'digitale uitgang',

	'PWM':
		'PWM',

	'servo':
		'servo',

	'clockwise':
		'rechtsom',

	'counter-clockwise':
		'linksom',

	'stopped':
		'gestopt',

	'angle (0-180)':
		'hoek (0-180)',

    'connect to Arduino':
        'maak verbinding met Arduino',

    'disconnect Arduino':
        'verbreek verbinding met Arduino',

	'Connect Arduino':
        'verbinding maken',

    'Disconnect Arduino':
        'verbinding verbreken',

    'analog reading %analogPin':
        'lees analoge pin %analogPin uit',

    'digital reading %digitalPin':
        'lees digitale pin %digitalPin uit',

    'connect arduino at %port':
        'verbind Arduino met %port',

    'setup digital pin %digitalPin as %pinMode':
        'stel digitale pin %digitalPin in als %pinMode',

    'set digital pin %digitalPin to %b':
        'zet digitale pin %digitalPin op %b',

    'set servo %servoPin to %servoValue':
        'zet servo %servoPin op %servoValue',

    'set PWM pin %pwmPin to %n':
        'zet PWM-pin %pwmPin op %n',

    'Connecting board at port\n': 
        'Verbinding maken op poort\n',

    'An Arduino board has been connected. Happy prototyping!':
        'Een Arduino is verbonden. Veel prototyping-plezier!',

    'Board was disconnected from port\n':
        'De verbinding is verbroken op poort\n',

    'It seems that someone pulled the cable!':
        'Blijkbaar heeft iemand de kabel eruit getrokken!',

    'Error connecting the board.':
        'Fout bij het maken van de verbinding.',

    'There is already a board connected to this sprite':
        'Er is al een verbinding voor deze sprite',

    'Could not connect an Arduino\nNo boards found':
        'Het is niet gelukt om verbinding te maken met de Arduino\nEr is geen Arduino gevonden',

    'Could not talk to Arduino in port\n':
        'Er is geen communicatie mogelijk op poort\n',

    'Check if firmata is loaded.':
        'Controleer of Firmata is geladen.',

    'An error was detected on the board\n\n':
        'Er is een fout opgetreden in de Arduino\n\n',

    'Board is not connected':
        'Arduino is niet verbonden',
		
	'New Arduino translatable project':
		'Nieuw Arduino-project maken',
		
	'make melody %c':
		'maak melodie %c',
	
	'play melody on pin %buzPin':
		'speel melodie op pin %buzPin',
	
	'play song %songs on pin %buzPin':
		'speel lied %songs op pin %buzPin',
	
	'play note %tones for 1/ %n beats':
		'speel noot %tones 1/ %n tel',
		
	'rest for 1/ %n beats':
		'pauzeer 1/ %n tel',
	
	'fade to color %colors on pins R %redPin G %grnPin B %bluPin':
		'ga naar kleur %colors op pin R %redPin G %grnPin B %bluPin',
		
	'black':
		'zwart',
		
	'white':
		'wit',
		
	'red':
		'rood',
		
	'green':
		'groen',
		
	'blue':
		'blauw',
		
	'yellow':
		'geel',
		
	'softWhite':
		'zacht wit',
		
	'export as Arduino sketch...':
		'exporteer als Arduino-sketch...'
	

};

// Add attributes to original SnapTranslator.dict.nl
for (var attrname in s4aTempDict) { SnapTranslator.dict.nl[attrname] = s4aTempDict[attrname]; }
