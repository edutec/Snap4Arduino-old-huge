#!/bin/sh
cd snap
rm -R node_modules
cp -R modules/gnu/* .
mv modules ..
zip -r gnu.nw *
mv gnu.nw ..
mv ../modules .
cd ..
