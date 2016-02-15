FROM node:latest

MAINTAINER Karl Podger <karl@cookadlib.com>

RUN mkdir -p /usr/src/app

WORKDIR /usr/src/app

COPY . ./

RUN ls -lai

RUN npm install --production --loglevel=warn

EXPOSE 8080

ENTRYPOINT ["npm", "start"]
