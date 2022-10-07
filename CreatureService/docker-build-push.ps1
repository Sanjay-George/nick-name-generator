# IMPORTANT: 
#   First cd into the directory containing this file, and then run this. 
#   Else Dockerfile of parent / other directories might get built instead.

$version="0.1.0"

# remove all images with same name
docker rmi $(docker images --format "{{.Repository}}:{{.Tag}}"|findstr "creature-service")

# create local docker build
docker build -t creature-service .

# tag for prod 
docker tag creature-service sanjaygeorge16/creature-service
docker tag creature-service sanjaygeorge16/creature-service:v$version

# push to docker hub
docker push sanjaygeorge16/creature-service
docker push sanjaygeorge16/creature-service:v$version