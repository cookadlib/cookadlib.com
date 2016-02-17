FROM node:latest

MAINTAINER Karl Podger <karl@cookadlib.com>

RUN mkdir -p /src

WORKDIR /src

COPY package.json package.json

COPY scripts/npm/pre-install.sh scripts/npm/pre-install.sh

COPY scripts/npm/post-install.sh scripts/npm/post-install.sh

RUN chmod -R +x scripts/npm

RUN npm install pm2 -g

RUN npm install --production --loglevel=warn

COPY . ./

RUN chmod -R +x scripts

EXPOSE 8080

ENTRYPOINT ["npm", "start"]
