#!/bin/sh

export POSTGIS=gangstead/postgis:13-arm
export POSTGRES_USER=user
export POSTGRES_PASSWORD=password

docker-compose up