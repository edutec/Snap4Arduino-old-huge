/*
    Changes to WorldMorph for managing Snap4Arduino functions
*/

/**
 * Global object (world.Arduino) used for s4a/arduino properties
 */
WorldMorph.prototype.Arduino = {
    firmata : require('firmata'),
    serialport : require('serialport'),
    portList : [],
    usedPorts : []
};

/**
 * Locks the given port to prevent its use in other connection (until it is unlocked)
 */
WorldMorph.prototype.Arduino.lockPort = function (port) {
    var usedPorts = this.usedPorts;

    if (usedPorts.indexOf(port) === -1) {
        usedPorts.push(port);
    }
}

/**
 * Unlocks a previously Locked port to permit it's use in new connections
 * Should be called when closing connections
 */
WorldMorph.prototype.Arduino.unlockPort = function (port) {
    var usedPorts = this.usedPorts;

    if (usedPorts.indexOf(port) > -1) {
        usedPorts.splice(usedPorts.indexOf(port));
    }
}

/**
 * Informs wether the port is locked or unlocked
 */
WorldMorph.prototype.Arduino.isPortLocked = function (port) {
    return (this.usedPorts.indexOf(port) > -1)
}


/**
 * Gets a list of available serial ports (paths) and return it through callback function
 */
WorldMorph.prototype.Arduino.getSerialPorts = function (callback) {
    var myself = this;

    var portList = [];
    var portcheck = /usb|DevB|rfcomm|acm|^com/i; // Not sure about rfcomm! We must dig further how bluetooth works in Gnu/Linux

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
WorldMorph.prototype.Arduino.start = function () {
    var myself = this;

    // Polls list of serial ports
    myself.portPollInterval = setInterval(function(){
         myself.getSerialPorts(function(portList) {
            myself.portList = portList;
         });
    }, 500);

};
