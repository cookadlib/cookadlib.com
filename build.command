cd `dirname $0`

sass -r sass-css-importer -I ./node_modules/ -I ./public/bower_components/ --compass --watch public/styles:public/styles
