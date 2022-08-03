# IMPORTANT: 
#   First cd into the directory containing this file, and then run this. 
#   Else Dockerfile of parent / other directories might get built instead.

$version="0.2.0"

# remove all images with same name
docker rmi $(docker images --format "{{.Repository}}:{{.Tag}}"|findstr "animal-service")

# create local docker build
docker build -t animal-service .

# tag for prod 
docker tag animal-service sanjaygeorge16/animal-service
docker tag animal-service sanjaygeorge16/animal-service:v$version

# push to docker hub
docker push sanjaygeorge16/animal-service
docker push sanjaygeorge16/animal-service:v$version