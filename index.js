import express, { response } from 'express';
import os from 'os';
import fetch from 'node-fetch';

import config from './config.js';


const app = express();
const { port, name, services } = config;

app.get("/", (req, res) => {
    res.send(`Hello from ${name} service running on ${os.hostname}`);
});

app.get("/service/:name", async (req, res) => {
    const service = req.params.name;

    try {
        // NOTE: THIS WILL ONLY WORK WITH SERVICE DISCOVERY
        const response = await fetch(`http://${service}/`);
        console.log(service, response);
    }
    catch(ex) {
        console.error(ex);
        res.status(500);
    }
});

app.listen(port);

