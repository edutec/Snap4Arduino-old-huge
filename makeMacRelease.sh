#!/bin/sh
cp shared/logo-splash.png release/mac/Snap4Arduino.app/Contents/Resources/
cp shared/Pharo2.0.changes release/mac/Snap4Arduino.app/Contents/Resources/
cp shared/Pharo2.0.image release/mac/Snap4Arduino.app/Contents/Resources/
cp shared/PharoV20.sources release/mac/Snap4Arduino.app/Contents/Resources/
rm -R release/mac/Snap4Arduino.app/Contents/Resources/snap
cp -R shared/snap release/mac/Snap4Arduino.app/Contents/Resources/
cp -R icons/* release/mac/Snap4Arduino.app/Contents/Resources/
cp -R README.md release/mac/Snap4Arduino.app/
cd release/mac
zip -r snap4arduino.zip Snap4Arduino.app
cd ../..
