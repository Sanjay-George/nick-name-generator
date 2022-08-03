import express, { response } from 'express';
import os from 'os';
import fetch from 'node-fetch';

// TODO: read config based on environment variable - isDevEnv
import config from './config.js';


const app = express();
const { port, name, services } = config;

app.get("/", (req, res) => {
    res.send(`Hello from ${name} running on ${os.hostname}`);
});

app.get("/nick-name/", async (req, res) => {
    const adjectiveService = services.adjective;
    const colorService = services.color;
    const animalService = services.animal;

    try{
        const [adjRes, colorRes, animalRes] = await Promise.all([
            fetch(`http://${adjectiveService}`),
            fetch(`http://${colorService}`),
            fetch(`http://${animalService}`),
        ]);
        const [adjective, color, animal] = await Promise.all([
            adjRes.json(), 
            colorRes.json(), 
            animalRes.json()
        ]);
        res.status(200).send({
            adjective,
            color,
            animal
        });
    }
    catch(ex) {
        console.error(ex);
        res.status(500).send({
            error: "Internal server error",
            ex: ex,
        });
    }
});

// TODO: REMOVE THIS 
app.get("/service/:name", async (req, res) => {
    const service = req.params.name;
    // NOTE: THIS URL WILL ONLY WORK WITH SERVICE DISCOVERY
    const url = `http://${service}`;
    try {
        const response = await fetch(url);
        const body = await response.json();
        res.status(200).send(body);
    }
    catch(ex) {
        console.error(ex);
        res.status(500).send({
            error: "Internal server error",
            url: url, 
            ex: ex,
        });
    }
});

app.listen(port);

