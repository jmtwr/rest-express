FROM node:alpine3.12
WORKDIR /app
COPY . .
RUN ["node"]