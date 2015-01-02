#!/bin/sh
cd snap
rm -Rf node_modules
cp -R ../modules/linux64/node_modules .
zip -r app.nw *
mv app.nw ../release/linux64/Snap4Arduino
cd ../release/linux64
rm -f Snap4Arduino.tar.gz
tar -zcvf Snap4Arduino.tar.gz Snap4Arduino
cd ../..
