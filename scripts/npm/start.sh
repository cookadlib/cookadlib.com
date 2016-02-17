#!/bin/sh

dir=$(cd -P -- "$(dirname -- "$0")" && pwd -P)

cd $dir/../..

pm2 start www/server.js --watch --name="www"
pm2 show www
pm2 logs www --timestamp

# node www/superstatic.js

exit
