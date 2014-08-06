/*
    Changes to WorldMorph for managing Snap4Arduino functions
*/

/**
 * Global object (world.arduino) used for s4a/arduino properties
 */
WorldMorph.prototype.arduino = {
    firmata : require('firmata'),
    serialport : require('serialport'),
    portList : [],
    usedPorts : []
};

/**
 * Gets a list of available serial ports (paths) and return it through callback function
 */
WorldMorph.prototype.arduino.getSerialPorts = function (callback) {
    var myself = this;

    var portList = [];

    myself.serialport.list(function (err, ports) { 
        if(ports){ 
            ports.forEach(function(each) { 
                portList[each.comName] = each.comName; 
            });
        }
        callback(portList);
    });
    
};

/**
 * Startup required for Arduino
 * - Starts polling list of SerialPorts
 */
WorldMorph.prototype.arduino.start = function () {
    var myself = this;

    // Pollr list of serial ports
    myself.portPollInterval = setInterval(function(){
         myself.getSerialPorts(function(portList) {
            myself.portList = portList;
         });
    }, 500);

};
