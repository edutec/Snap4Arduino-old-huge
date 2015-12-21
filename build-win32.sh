#!/bin/sh
#
# We make use of the Inno Setup Compiler
#
# So, if you are using Linux to cross compile:
# Please install Inno Setup via wine, instructions taken from:
# https://katastrophos.net/andre/blog/2009/03/16/setting-up-the-inno-setup-compiler-on-debian/
#
# If you are using Windows:
# Install 32-bit cygwin: https://cygwin.com/install.html (even for 64-bit machine)
# Install Inno Setup 5 from here: http://www.jrsoftware.org/isdl.php

unset DISPLAY  
cd snap
rm -Rf node_modules
cp -R ../modules/win32/* .
zip -r app.nw *
mv app.nw ../release/win32
cd ../release/win32
rm Snap4Arduino-*.exe
rm Snap4Arduino.zip
if [ -z "$PROGRAMFILES" ]; then
  wine "C:\Program Files\Inno Setup 5\ISCC.exe" "Snap4Arduino.iss"
else
  sh -c "exec '$PROGRAMFILES\\Inno Setup 5\\ISCC.exe' Snap4Arduino.iss"
fi

zip Snap4Arduino.zip Snap4Arduino-*.exe
cd ../..
