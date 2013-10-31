/*
 * :: Snap4Arduino v.0.1a - October 2013 ::
 * 
 * Allowing to control Arduino boards from Snap! by means of WebSocket messages.
 * 
 * NodeJs WebSockets     : https://github.com/einaros/ws
 * NodeJs Firmata        : https://github.com/jgautier/firmata
 * NodeJs Connect module : http://www.senchalabs.org/connect
 * NodeJs Open module    : https://github.com/pwnall/node-open
 *
 * (Ɔ) Bernat Romagosa 2013
 */

var defaultWebSocketPort = 4001;
var defaultWebPort = 8080;

var board;

var isDebugMode = (process.argv[2] == '--debug');
function debugLog(string) { if (isDebugMode) console.log(string) };

var firmata = require('/usr/local/lib/node_modules/firmata/lib/firmata');

// WebSocket server to communicate with Snap!
var WebSocketServer = require('/usr/local/lib/node_modules/ws').Server
  , webSocketServer = new WebSocketServer({port: defaultWebSocketPort});
debugLog("websocket server started on port " + defaultWebSocketPort);

// WebServer to serve Snap!
var connect = require('/usr/local/lib/node_modules/connect');
connect.createServer(connect.static('snap')).listen(defaultWebPort);
debugLog("web server serving Snap! at port " + defaultWebPort);

// We open Snap! on a web browser
var open = require('/usr/local/lib/node_modules/open');
open('http://localhost:' + defaultWebPort + '/snap.html#open:blocks.xml');

webSocketServer.on('connection', function(webSocket) {
	debugLog('WebSocket connected');

    	webSocket.on('message', function(message) {
		debugLog("received message: " + message);
		messageArray = message.split("&");

		// Message handling
		switch(messageArray[0]) {
			case 'connect':	
				if (!board) {
					board = new firmata.Board(messageArray[1], function(err) { if (err) { debugLog(err); return }});
					debugLog('board connected at ' + messageArray[1]);
				} else {
					debugLog('board was already connected, ignoring command');
				};
				break;
			case 'pinMode':
				var val;
				switch(messageArray[2]) {
					case 'I': val = board.MODES.INPUT; break;
					case 'O': val = board.MODES.OUTPUT; break;
					case 'A': val = board.MODES.ANALOG; break;
					case 'P': val = board.MODES.PWM; break;
					case 'S': val = board.MODES.SERVO; break;
				}
				board.pinMode(parseInt(messageArray[1]), val);
				debugLog('pin number ' + messageArray[1] + ' set to mode ' + messageArray[2]);
				break;
			case 'digitalWrite':
				var val;
				if (parseInt(messageArray[2]) > 0) { val = board.HIGH } else { val = board.LOW };
				board.digitalWrite(parseInt(messageArray[1]), val);
				debugLog('digital value ' + val + ' written to pin ' + messageArray[1]);
				break;
			case 'analogWrite':
				board.analogWrite(parseInt(messageArray[1]), parseInt(messageArray[2]));
				debugLog('analog value ' + messageArray[2] + ' written to pin ' + messageArray[1]);
				break;
			case 'digitalRead':
				var pinNumber = parseInt(messageArray[1]);
				webSocket.send('digitalValue&' + pinNumber + '&' + 0);
				board.digitalRead(pinNumber, function(val) { webSocket.send('digitalValue&' + pinNumber + '&' + val) });
				debugLog('started reading digital values from ' + messageArray[1]); 
				break;
			case 'analogRead':
				var pinNumber = parseInt(messageArray[1]);
				board.analogRead(pinNumber, function(val) { webSocket.send('analogValue&' + pinNumber + '&' + val) });
				debugLog('started reading analog values from ' + messageArray[1]); 
				break;
			case 'servoWrite':
				var pinNumber = parseInt(messageArray[1]);
				board.servoWrite(parseInt(messageArray[1]), parseInt(messageArray[2]));
				debugLog('servo value ' + messageArray[2] + ' written to pin ' + messageArray[1]);
				break;
			default:
				debugLog("command unknown: " + messageArray);
				break;
		}
   	});
});
