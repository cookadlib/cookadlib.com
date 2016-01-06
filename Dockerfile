FROM node:latest

MAINTAINER Karl Podger <karl@cookadlib.com>

WORKDIR /tmp

ADD package.json package.json

ADD *.js ./

ADD *.json ./

ADD .* ./

ADD app app

RUN npm install

EXPOSE 8080

WORKDIR .

ENTRYPOINT ["node", "server.js"]
