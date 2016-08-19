#!/bin/sh
cd snap
rm -Rf node_modules
cp -R ../modules/gnu64/node_modules .
zip -r app.nw *
mv app.nw ../release/gnu64/Snap4Phiro
cd ../release/gnu64
rm -f Snap4Phiro.tar.gz
tar -zcvf Snap4Phiro.tar.gz Snap4Phiro
cd ../..
