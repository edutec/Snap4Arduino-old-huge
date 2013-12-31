#!/bin/sh
rm -R release/gnu
mkdir release/gnu
mkdir release/gnu/snap4arduino
mkdir release/gnu/snap4arduino/shared
cp shared/logo-splash.png release/gnu/snap4arduino/shared
cp shared/Pharo2.0.changes release/gnu/snap4arduino/shared
cp shared/Pharo2.0.image release/gnu/snap4arduino/shared
cp shared/PharoV20.sources release/gnu/snap4arduino/shared
cp -R shared/snap release/gnu/snap4arduino/shared
mkdir release/gnu/snap4arduino/bin
cp -R bin/gnu release/gnu/snap4arduino/bin
cp snap4arduino release/gnu/snap4arduino/
cp -R icons release/gnu/snap4arduino/
cp -R README.md release/gnu/snap4arduino/
cd release/gnu
tar -zcvf snap4arduino.tar.gz snap4arduino
cd ../..
