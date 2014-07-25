Snap4Arduino4Makers (S4A4Makers)
===================================================
Makers branch derivated from Snap4Arduino
--

This software is possible thanks to the great job made previously by the teams behind Snap4Arduino (http://s4a.cat/snap/), Snap (http://byob.berkeley.edu) and Arduino (www.arduino.cc).

Snap4Arduino is a modified version of Snap (which is a derivare form Scratch visual programming language), which allows to control and an Arduino microcontroller with simple and easy visual programming blocks.

The Makers branch (Snap4Arduino4Makers) is a derivate with new functionality for making an even easier first step into the Physical Computing world.  It is part of the "First Makers" initiative.

![alt text](https://github.com/elaval/Snap4Arduino/blob/makers/images/code_eg1.png "Hello World")


The first version (0.0.1) pre-alpha currently includes:

- Mac (OSX) version
- Autodetection of an Arduino board at startup (no need to specify port path)
- Board disconnection (and autoconnection after disconnected)
- New "Makers" block group which includes: "auto connect arduino", "diconnect arduino", "is arduino connected", "led on", "led off", "buzzer at {value}", "switch", "temperature", "sound", "light", "potentiometer"

First Makers combines hardware (an Arduino shield) software (Scratch & Snap 4 Arduino modules and examples) and turorials for teachers & students.

Makers Shield 
![alt text](https://github.com/elaval/Snap4Arduino/blob/makers/images/tide_makers.jpg "Tide Makers first prototype")

Software interface (running on Mac) 
![alt text](https://github.com/elaval/Snap4Arduino/blob/makers/images/screen1.jpg "S4A4Makers interface")

The initiative is under a very initial development and when we have a stable version of hardware/software & support materials will be officially announced.

Quick start
-----
In order to use Snap4Arduino4Makers, you need to

1) Donwload the software
For Mac: https://github.com/elaval/Snap4Arduino/blob/makers/release/osx/Snap4Arduino.dmg

(Win versions still don't have the installer configured & built, if you know how to deal with it, you can access the components here:https://github.com/elaval/Snap4Arduino/tree/makers/release/win32)

For Linux: THIS HAS NOT BEEN TESTED AT ALL but the release files are here
https://github.com/elaval/Snap4Arduino/tree/makers/release/gnu

2) You need and Arduino with the StandardFirmata firmware installed.
StandardFirmata is included as part of the code - Sketches - that come with the Arduino official IDE (File | Examples | Firmata | StandardFirmata).  Arduno IDE can be downloaded from http://arduino.cc/en/Main/Software

3) Ideally you should have a First Makers shield connected to your Arduino, but the software will also work with a plain Arduino.
The First Makers shield is currently being designed and developed as part of a initiative with Universities and ICT companies interested in promoting the Makers movement in schools.  It includes a number of pre-connected sensors (temperature, audio, potentiometer, light, humidity, infrared) and actuators (LEDs, Buzzer).  It is easily connecetd to external modules (more sensors & actuators) through standard 3.5 audio plugs & jacks.  You can connect cheap available devices or build your own modules!!

4) Connect your Arduino boar to the software
Once the software is running, it will automatically search for USB devices and try to connect and Arduino. When connected, you will receive an alert that tells you that the Arduino board was connected and you are ready to work!!

In order to "talk" to your Arduino, you can use any of the available blocks on the "Arduino" group (which allows you to control any digital or analog pin) or the "Makers" group (which has blocks with specific functionalito on some of the pins).

Caution: if you disconnect the Arduino while the software is running, you might get some problems: the software might crash (and you loose all your work) and/or you can leave the port incorrectly connected (with problems for next connections).  Before disconnecting your Arduino, we suggest to use the "disconnect arduino" block (in the "Makers" block group).

Known problems
--
This is not a stable version of the software and you might find some problems:

- The alert box when an Arduino is connected works well on Mac but not on Windows (the Ok button is semi hidden and you neet to click it to start working)
- 


First Makers Team