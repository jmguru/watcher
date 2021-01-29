#!/bin/bash

kubectl create secret docker-registry watcher-pull-secret \
 --docker-server=docker.io \
 --docker-username=_DOCKERLOGIN_ \
 --docker-password=_DOCKERPASS_ \
 --docker-email=_DOCKEREMAIL_
