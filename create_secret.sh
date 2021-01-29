#!/bin/bash

kubectl create secret docker-registry watcher-pull-secret \
 --docker-server=docker.io \
 --docker-username=jmguru \
 --docker-password=Racerb0y! \
 --docker-email=jmguru@gmail.com
