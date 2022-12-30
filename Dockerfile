# syntax=docker/dockerfile:1
FROM node:16-alpine
RUN mkdir -p /home/app
COPY . /home/app
WORKDIR /home/app
RUN npm install
CMD ["node", "routes.js"]