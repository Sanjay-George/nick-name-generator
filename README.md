# nick-name-generator - A Cloud-Native App 🌦️
The app creates a "cool" nickname of the form `<adjective>-<color>-<animal>`. 

Examples:
```
nice-denim-dybbuk
stupendous-hot-pink-gnomes
affectionate-garnet-goblins
technological-blush-cyclops
```

### Key 🔑 features of this app:
* Microservice architecture
* Simple API Gateway with partial fault tolerance 
* Containerized using docker
* K8s deployment with HPA
* *Grafana and Prometheus (TBD, might be in a separate repo with IaC for deploying on AWS / Openstack)*


### How to run 🏃‍♀️ it?
1. Clone it.
2. `kubectl apply -f .\AdjectiveService\adjective-service.yaml -f .\ColorService\color-service.yaml -f .\AnimalService\animal-service.yaml  -f .\WebService\nick-name-generator.yaml`

### Architecture Diagram 
![image](https://user-images.githubusercontent.com/10389062/182759961-f6903bd1-2caa-4074-a4a8-d57518264eef.png)

### Why use this app? 
Absolutely no reason! 🤷‍♂️

**Although, I appreciate suggestions to improve the architecture or code. Please create an issue or a PR for the same**

### Next steps 🪜
1. Create a simple front end 
2. Deploy on public cloud.
