# Watcher - A Journey through the World of Containerized Madness

## Introduction
This is a really dumb node-based application, but it demonstrates the following:
- Turn a node app into a Docker containerized app using docker-compose
- Turn a docker containerized app into a kubernetes containerized app using kompose

## Pre-reqs
- docker or docker-ce
- docker.io user/password
- kompose

## Node application
The app has a front-end using Nodejs express and a back-end which uses MariaDB

## Turning this application into two containers within Docker
This section describes how to use docker-compose to build the application. 
Take a look at `docker-compose.yml` for details. 

Run the following:
```
# build.sh
```

This will build each component of the application (appserver & dbserver).
You can optionally disable building it and let it pull from the docker repo (docker.io). To do this, comment out build statements in `docker-compose.yml`.

After starting the containerized application, navigate to http://<HOST>:2115
  
## Preparing for Kubernetes
We need to do a few things before we convert the docker-based app into kubernetes app. This section instructs you how to:
- Re-tag and push an image to docker.io
- Create a pull-secret so that the k8 containers can pull from docker.io

### Re-tag and push
If you need to update the image in docker.io, do the following:
- Modify the latest tag in the tag_push.sh script if needed
- Modify the _DOCKERLOGIN_ and _DOCKERPASS_ template variables with your credentials.
- Run:
```
# ./tag_push.sh
```

### Create the pull-secret
The pull-secret must exist within the cluster in order for the controller to pull the image from docker.io. 
- Modify the credentials in `create_secret.sh` script
- Log into your cluster (e.g. `oc login https://host:6443 -u kubeadmin -p XXXX`)
- Run:
```
# create_secret.sh
```

## Run kompose convert
Now we can run kompose to convert the docker-compose into kubernetes objects 
- While in the root directory where docker-compose.yml exists, run:
```
kompose convert
```
- Create a directory called app, and move the generated yaml files into this directory:
```
# mkdir app
# mv *.yaml app
```
- Modify `appserver-deployment.yaml` AND `dbserver-deployment.yaml` and add the following underneath `image` tag. It should look like this:
```
...
image: jmguru/watcher_appserver:latest
imagePullPolicy: Always
imagePullSecrets:
- name: watcher-pull-secret
...
```

## Apply and create the application in the cluster
Now you're ready to deploy the application. 
- Run:
```
kubectl apply -f app
```
- The service will be created but now you need to externalize the service by exposing it (Openshift only):
```
# oc expose service appserver
```
- Get the route for the exposed service:
```
# oc get routes
```
- Now you can navigate to http://HOST:PORT

  
