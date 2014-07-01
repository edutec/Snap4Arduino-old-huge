#!/bin/sh
cd snap
rm -Rf node_modules
cp -R ../modules/gnu/* .
zip -r app.nw *
mv app.nw ../release/gnu/Snap4Arduino
cd ../release/gnu
rm -f Snap4Arduino.tar.gz
tar -zcvf Snap4Arduino.tar.gz Snap4Arduino
cd ../..
