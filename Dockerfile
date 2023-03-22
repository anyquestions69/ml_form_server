FROM python:3.8
FROM node:14
FROM ubuntu:latest

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY requirements.txt ./

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 80
CMD [ "node", "index.js" ]
