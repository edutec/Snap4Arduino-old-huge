#!/bin/sh
cd snap
rm -Rf node_modules
cp -R ../modules/gnu/* .
zip -r app.nw *
mv app.nw ../release/gnu/Snap4Phiro
cd ../release/gnu
rm -f Snap4Phiro.tar.gz
tar -zcvf Snap4Phiro.tar.gz Snap4Phiro
cd ../..
