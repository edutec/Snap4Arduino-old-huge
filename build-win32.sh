#!/bin/sh
cd snap
rm -Rf node_modules
cp -R modules/win32/* .
mv modules ..
zip -r app.nw *
mv app.nw ../release/win32
mv ../modules .
cd ..
