FROM node:18-alpine as dev

WORKDIR /app

COPY *.json /app
RUN npm install

COPY ./public ./public
COPY ./src ./src

CMD npm start

FROM node:18-alpine as prod

WORKDIR /app

COPY *.json /app
RUN npm install
RUN npm install -g serve
RUN npm install -g watch

COPY ./public ./public
COPY ./src ./src