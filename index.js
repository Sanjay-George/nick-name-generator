import express, { response } from 'express';
import os from 'os';
import fetch from 'node-fetch';

import config from './config.js';


const app = express();
const { port, name, services } = config;

app.get("/", (req, res) => {
    res.send(`Hello from ${name} running on ${os.hostname}`);
});

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

