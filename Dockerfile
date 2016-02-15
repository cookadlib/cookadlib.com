FROM node:latest

MAINTAINER Karl Podger <karl@cookadlib.com>

RUN mkdir -p /src

WORKDIR /src

COPY . ./

RUN npm install --production --loglevel=warn

RUN pwd

RUN ls -lai

RUN ls -lai www

EXPOSE 8080

ENTRYPOINT ["npm", "start"]
