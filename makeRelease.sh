#!/bin/bash
./updateSnap.sh
./makeWin32Release.sh
./makeGnuLinuxRelease.sh
cp release/win32/snap4arduino.zip ~/Scratch/s4a/web/snap/downloads/win32/snap4arduino.zip
cp release/gnu/snap4arduino.tar.gz ~/Scratch/s4a/web/snap/downloads/gnu/snap4arduino.tar.gz
