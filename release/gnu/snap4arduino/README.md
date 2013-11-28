Snap4Arduino
============

Snap4Arduino lets you interact with your [Arduino](http://arduino.cc) board from within [Snap!](http://snap.berkeley.edu)

Developed at [Citilab](http://citilab.eu/) by the [Edutec](http://edutec.citilab.eu) team.

Libraries and third party software used in this project
-------------------------------------------------------

*    [Pharo 2.0](http://pharo-project.org) with:
    
     * [Zinc HTTP Components](http://zn.stfx.eu/zn/index.html)

     * [Arduino package for Pharo](http://ss3.gemstone.com/ss/Arduino.html)

GNU/Linux command line arguments
--------------------------------

On GNU/Linux, the snap4arduino executable accepts three different parameters:

* --serve    Starts the server. Technically does the same as no parameter at all.
* --debug    Starts the server in debug mode. All system messages will be printed in stdOut.
* --dev      *EXPERT ONLY*. Developer mode. Will open the Pharo 2.0 development environment.
