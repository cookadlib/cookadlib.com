FROM node:latest

MAINTAINER Karl Podger <karl@cookadlib.com>

RUN mkdir -p /src

WORKDIR /src

COPY package.json package.json

COPY scripts/npm scripts/npm

RUN chmod -R +x scripts/npm

RUN npm install pm2 -g

RUN npm install --production --loglevel=warn

COPY . ./

RUN chmod -R +x scripts

EXPOSE 8080

ENTRYPOINT ["npm", "start"]
