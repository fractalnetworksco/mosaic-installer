#!/bin/bash

docker run -v /var/run/docker.sock:/var/run/docker.sock -it -e DEVICE_NAME $DEVICE_NAME -e API_TOKEN=$TOKEN -e DEVICE_SECRET=$DEVICE_SECRET --restart unless-stopped fractalnetworks/hive-device:alpha