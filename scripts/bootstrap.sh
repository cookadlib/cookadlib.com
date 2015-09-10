#!/bin/sh

dir=$(cd -P -- "$(dirname -- "$0")" && pwd -P)

cd $dir/..

ln -s bower_components www/bower_components

touch www/.htaccess
#chown $1:httpd .htaccess
#chown -R $1:httpd *
find www -type d -exec chmod 755 {} \;
find www -type f -exec chmod 644 {} \;
chmod g+w www/.htaccess

mkdir -p www/styleguide && cp -r node_modules/gulp-dss/templates www/styleguide
