#!/bin/sh
#
# We make use of the Inno Setup Compiler
# This script will not work for you if you haven't installed Inno Setup via wine
#
# Instructions taken from:
# https://katastrophos.net/andre/blog/2009/03/16/setting-up-the-inno-setup-compiler-on-debian/

unset DISPLAY  
cd snap
rm -Rf node_modules
cp -R ../modules/win32/* .
zip -r app.nw *
mv app.nw ../release/win32
cd ../release/win32
rm Snap4Phiro-*.exe
wine "C:\Program Files\Inno Setup 5\ISCC.exe" "Snap4Phiro.iss"
zip Snap4Phiro.zip Snap4Phiro-*.exe
cd ../..
