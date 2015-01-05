#!/bin/sh
cd snap
rm -Rf node_modules
cp -R ../modules/gnu64/node_modules .
zip -r app.nw *
mv app.nw ../release/gnu64/Snap4Arduino
cd ../release/gnu64
rm -f Snap4Arduino.tar.gz
tar -zcvf Snap4Arduino.tar.gz Snap4Arduino
cd ../..
