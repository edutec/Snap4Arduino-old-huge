#!/bin/sh
cd snap
rm -Rf node_modules
cp -R modules/gnu/* .
mv modules ..
zip -r app.nw *
mv app.nw ../release/gnu
mv ../modules .
cd ..
