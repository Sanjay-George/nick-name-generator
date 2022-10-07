export default {
    service: "nick-name-generator",
    port: 3000,
    // LOCAL TESTING
    // services: {
    //     adjective: "127.0.0.1:53100",
    //     color: "127.0.0.1:53102",
    //     animal: "animal-service",
    // },
    // KUBE 
    services: {
        adjective: "adjective-service",
        color: "color-service",
        animal: "animal-service",
        creature: "creature-service",
    }
};