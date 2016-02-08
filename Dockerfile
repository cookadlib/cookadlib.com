FROM node:latest

MAINTAINER Karl Podger <karl@cookadlib.com>

WORKDIR /tmp

ADD package.json package.json

ADD *.js ./

ADD *.json ./

ADD .* ./

ADD app app

npm install -g superstatic

RUN npm install

EXPOSE 8080

WORKDIR .

ENTRYPOINT ["node", "server.js"]
