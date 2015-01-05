To update the modules, go to the snap directory and run:

    rm -fr node_modules
    npm install
    cd node_modules/serialport
    node-pre-gyp rebuild --runtime=node-webkit --target=0.11.5
    ln -s node-webkit-v0.11.5-linux-x64 build/serialport/v1.4.10/Release/node-webkit-v14-linux-x64
    # Clean up some
    rm -fr build/Release
    cd ../..

Test these changes out by running the following in the snap directory:

    LD_LIBRARY_PATH=/opt/google/chrome ../release/linux64/Snap4Arduino/nw .

When you're happy, go back to the modules/linux64 directory and replace the
node_modules directory with the new one.
