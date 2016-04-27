FROM node:latest

MAINTAINER Karl Podger <karl@cookadlib.com>

RUN npm install --global --loglevel=warn bower gulp-cli

ADD package.json /tmp/package.json
ADD shell_scripts/npm /tmp/shell_scripts/npm
RUN chmod -R +x /tmp/shell_scripts/npm
RUN cd /tmp && npm install --loglevel=warn
RUN mkdir -p /opt/deploy && cp -a /tmp/node_modules /opt/www/

ADD bower.json /tmp/bower.json
ADD .bowerrc /tmp/.bowerrc
ADD shell_scripts/bower /tmp/shell_scripts/bower
RUN chmod -R +x /tmp/shell_scripts/bower
RUN cd /tmp && bower install
RUN mkdir -p /opt/www && cp -a /tmp/app/bower_components /opt/www/

ADD . /tmp/

ENV NODE_ENV docker

RUN cd /tmp && gulp all
RUN mkdir -p /opt/www && cp -a /tmp/www /opt/

WORKDIR /opt/www

EXPOSE 8080

ENTRYPOINT ["npm", "start"]
