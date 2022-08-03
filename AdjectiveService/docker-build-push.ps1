# IMPORTANT: 
#   First cd into the directory containing this file, and then run this. 
#   Else Dockerfile of parent / other directories might get built instead.

$version="0.5.0"

# remove all images with same name
docker rmi $(docker images --format "{{.Repository}}:{{.Tag}}"|findstr "adjective-service")

# create local docker build
docker build -t adjective-service .

# tag for prod 
docker tag adjective-service sanjaygeorge16/adjective-service
docker tag adjective-service sanjaygeorge16/adjective-service:v$version

# push to docker hub
docker push sanjaygeorge16/adjective-service
docker push sanjaygeorge16/adjective-service:v$version