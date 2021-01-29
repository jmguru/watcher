#!/bin/bash
HERE=$(pwd)

arch=$(dpkg --print-architecture)
export NODE_VERSION=node:8
export DB_VERSION=mariadb:latest

if [[ $arch == "arm"* ]]; then
  export NODE_VERSION=hypriot/rpi-node:8
  export DB_VERSION=hypriot/rpi-mysql
fi

rm -f $HERE/db-service/Dockerfile
sed "s/_DBVERSION_/${DB_VERSION}/" $HERE/db-service/Dockerfile.template > $HERE/db-service/Dockerfile

rm -f $HERE/food-service/Dockerfile
sed "s/_NODEVERSION_/$NODE_VERSION/" $HERE/food-service/Dockerfile.template > $HERE/food-service/Dockerfile

docker-compose up --build
