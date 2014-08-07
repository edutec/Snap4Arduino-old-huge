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
 * Locks the given port to prevent its use in other connection (until it is unlocked)
 */
WorldMorph.prototype.arduino.lockPort = function (port) {
    var usedPorts = this.usedPorts;

    if (usedPorts.indexOf(port) === -1) {
        usedPorts.push(port);
    }
}

/**
 * Unlocks a previously Locked port to permit it's use in new connections
 * Should be called when closing connections
 */
WorldMorph.prototype.arduino.unlockPort = function (port) {
    var usedPorts = this.usedPorts;

    if (usedPorts.indexOf(port) > -1) {
        usedPorts.splice(usedPorts.indexOf(port));
    }
}

/**
 * Informs wether the port is locked or unlocked
 */
WorldMorph.prototype.arduino.isPortLocked = function (port) {
    return (this.usedPorts.indexOf(port) > -1)
}


/**
 * Gets a list of available serial ports (paths) and return it through callback function
 */
WorldMorph.prototype.arduino.getSerialPorts = function (callback) {
    var myself = this;

    var portList = [];
    var portcheck = /usb|acm|^com/i;

    myself.serialport.list(function (err, ports) { 
        if(ports){ 
            ports.forEach(function(each) { 
                if(!myself.isPortLocked(each.comName) && portcheck.test(each.comName)) {
                    portList[each.comName] = each.comName; 
                }
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
