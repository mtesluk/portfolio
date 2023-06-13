#!/bin/bash

######################### CLIENT ########################
rm -rf app
[ $? != 0 ] && echo "Cannot remove client directory"

rsync -av --exclude='node_modules' --exclude='build' --exclude='dist' ../../../client/ ./app > /dev/null 2>&1

cd client
docker build . -t mtesluk/portfolio-gui
docker push mtesluk/portfolio-gui
