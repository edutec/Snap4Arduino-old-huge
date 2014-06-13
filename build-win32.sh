#!/bin/sh
cd snap
rm -R node_modules
cp -R modules/win32/* .
mv modules ..
zip -r win32.nw *
mv win32.nw ..
mv ../modules .
cd ..
