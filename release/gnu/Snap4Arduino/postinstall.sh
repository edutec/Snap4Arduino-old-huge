#!/bin/sh
if test -e /lib/i386-linux-gnu/libudev.so.0
	then
		echo "Installation successful"
	else
		if test -e /lib/i386-linux-gnu/libudev.so.1
			then
				ln -s /lib/i386-linux-gnu/libudev.so.1 /lib/i386-linux-gnu/libudev.so.0 
				echo "Installation successful"
			else
				cp libudev.so.0 /lib/i386-linux-gnu/
				echo "Installation successful"
		fi
fi
