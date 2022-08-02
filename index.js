import express, { response } from 'express';
import os from 'os';
import fetch from 'node-fetch';

import config from './config.js';


const app = express();
const { port, name, services } = config;

app.get("/", (req, res) => {
    res.send(`Hello from ${name} running on ${os.hostname}`);
});

app.get("/service", async (req, res) => {
    const service = req.params.name;
    console.log(service);
    try {
        // NOTE: THIS WILL ONLY WORK WITH SERVICE DISCOVERY
        const response = await fetch(`http://adjective-service`);
        const body = await response.text();
        res.status(200).send(body);
    }
    catch(ex) {
        console.error(ex);
        res.status(500).send('Interal server error');
    }
});

app.listen(port);

