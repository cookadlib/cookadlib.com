FROM node:latest

MAINTAINER Karl Podger <karl@cookadlib.com>

ENV ENV docker

RUN npm install --global --loglevel=warn bower gulp-cli

ADD package.json /tmp/package.json
ADD shell_scripts/npm /tmp/shell_scripts/npm
RUN chmod -R +x /tmp/shell_scripts/npm
RUN cd /tmp && npm install --loglevel=warn
RUN mkdir -p /opt/build && cp -a /tmp/node_modules /opt/build/

ADD bower.json /tmp/bower.json
ADD .bowerrc /tmp/.bowerrc
ADD shell_scripts/bower /tmp/shell_scripts/bower
RUN chmod -R +x /tmp/shell_scripts/bower
RUN cd /tmp && bower install
RUN mkdir -p /opt/build/www && cp -a /tmp/app/bower_components /opt/build/www/

ADD . /tmp/

RUN cd /tmp && gulp all

RUN mkdir -p /opt/build && cp -a /tmp/www /opt/build/

RUN mkdir -p /opt/build && cp /tmp/.[a-zA-Z0-9]* /opt/build/ && cp /tmp/*.js /opt/build/ && cp /tmp/*.json /opt/build/ && cp /tmp/*.yaml /opt/build/ && cp /tmp/*.yml /opt/build/
# RUN mkdir -p /opt/build && cp /tmp/.[a-zA-Z0-9]* /opt/build/ && cp /tmp/*.{js,json,yaml,yml} /opt/build/

WORKDIR /opt/build

EXPOSE 8080

#ENTRYPOINT ["npm", "start"]
ENTRYPOINT ["node", "www/server.js"]
