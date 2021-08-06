FROM node:12-alpine as build-step

WORKDIR /backend

COPY package.json /backend

RUN npm install

COPY . /backend

CMD [ "node","server.js" ]