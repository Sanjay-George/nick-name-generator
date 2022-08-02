$version="0.2.0"

# remove all images with same name
docker rmi $(docker images --format "{{.Repository}}:{{.Tag}}"|findstr "adjective-service")

# create local docker build
docker build -t adjective-service .

# tag for prod 
docker tag nick-name-generator sanjaygeorge16/adjective-service
docker tag adjective-service sanjaygeorge16/adjective-service:v$version

# push to docker hub
docker push sanjaygeorge16/adjective-service
docker push sanjaygeorge16/adjective-service:v$version