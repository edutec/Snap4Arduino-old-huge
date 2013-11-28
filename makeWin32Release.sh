#!/bin/sh
rm -R release/win32
mkdir release/win32/
mkdir release/win32/snap4arduino/
mkdir release/win32/snap4arduino/shared
cp shared/logo-splash.png release/win32/snap4arduino/shared
cp shared/Pharo2.0.changes release/win32/snap4arduino/shared
cp shared/Pharo2.0.image release/win32/snap4arduino/shared
cp shared/PharoV20.sources release/win32/snap4arduino/shared
cp -R shared/snap release/win32/snap4arduino/shared
mkdir release/win32/snap4arduino/bin
cp -R bin/win32 release/win32/snap4arduino/bin
cp Snap4Arduino.exe release/win32/snap4arduino/
cp -R icons release/win32/snap4arduino/
cp -R README.md release/win32/snap4arduino/
