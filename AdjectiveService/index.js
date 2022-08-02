import express from 'express';
import os from 'os'
import config from './config.js';
import adjectives from './data.js';

const app = express();
const { port, service } = config;


app.get("/", (req, res) => {
    const response = {
        response: adjectives[Math.floor(Math.random() * adjectives.length)].toLowerCase(),
        service: service,
        hostname: os.hostname(),
    };
    res.send(response);
});

app.listen(port);

