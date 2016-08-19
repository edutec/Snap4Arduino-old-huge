#!/bin/sh
cd snap
rm -Rf node_modules
cp -R ../modules/osx/* .
zip -r app.nw *
mv app.nw ../release/osx/Snap4Phiro.app/Contents/Resources
cd ../release/osx
#rm -f Snap4Phiro.dmg
#hdiutil create -volname Snap4Phiro -srcfolder . -ov -format UDZO Snap4Phiro.dmg
zip -r Snap4Phiro Snap4Phiro.app
cd ../..
