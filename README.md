# nick-name-generator - A Cloud-Native App 🌦️
The app creates a "cool" nickname of the form `<adjective>-<color>-<creature>`. 

Examples:
```
nice-denim-dybbuk
stupendous-hot-pink-gnomes
affectionate-garnet-goblins
technological-blush-cyclops
```

### Key 🔑 features of this app:
* Microservice architecture
* Simple [API Gateway](WebService/apigateway.js) with partial fault tolerance 
* Containerized using docker
* K8s deployment with HPA
* *Grafana and Prometheus (TBD, might be in a separate repo with IaC for deploying on AWS / Openstack)*


### How to run 🏃‍♀️ it?
1. Clone it.
2. `kubectl apply -f AdjectiveService/adjective-service.yaml -f ColorService/color-service.yaml -f CreatureService/creature-service.yaml -f WebService/nick-name-generator.yaml`

### Architecture Diagram 
![image](https://user-images.githubusercontent.com/10389062/194753979-7ede38d9-2fae-4124-afad-b76f492e4b8d.png)

### Why use this app? 
Absolutely no reason! 🤷‍♂️

**Although, I appreciate suggestions to improve the architecture or code. Please create an issue or a PR for the same**

### Next steps 🪜
1. Ingress
2. Volumes and state persistence

[Project Dashboard](https://github.com/users/Sanjay-George/projects/2/views/4?sortedBy%5Bdirection%5D=desc&sortedBy%5BcolumnId%5D=Status)
