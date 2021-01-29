#!/bin/bash

docker image tag watcher_appserver:latest jmguru/watcher_appserver:latest
docker image tag watcher_dbserver:latest jmguru/watcher_dbserver:latest
docker login -u _DOCKERLOGIN_ -p _DOCKERPASS_ docker.io
docker push jmguru/watcher_dbserver:latest
docker push jmguru/watcher_appserver:latest
