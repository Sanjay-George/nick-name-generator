$version="0.6.0"

# remove all images with same name
docker rmi $(docker images --format "{{.Repository}}:{{.Tag}}"|findstr "nick-name-generator")

# create local docker build
docker build -t nick-name-generator .

# tag for prod 
docker tag nick-name-generator sanjaygeorge16/nick-name-generator
docker tag nick-name-generator sanjaygeorge16/nick-name-generator:v$version

# push to docker hub
docker push sanjaygeorge16/nick-name-generator
docker push sanjaygeorge16/nick-name-generator:v$version