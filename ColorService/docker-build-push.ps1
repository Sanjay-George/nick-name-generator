# IMPORTANT: 
#   First cd into the directory containing this file, and then run this. 
#   Else Dockerfile of parent / other directories might get built instead.

$version="0.3.1"

# remove all images with same name
docker rmi $(docker images --format "{{.Repository}}:{{.Tag}}"|findstr "color-service")

# create local docker build
docker build -t color-service .

# tag for prod 
docker tag color-service sanjaygeorge16/color-service
docker tag color-service sanjaygeorge16/color-service:v$version

# push to docker hub
docker push sanjaygeorge16/color-service
docker push sanjaygeorge16/color-service:v$version