import express from 'express';
import os from 'os'
import config from './config.js';
import colors from './data.js';

const app = express();
const { port, service } = config;


app.get("/", (req, res) => {
    const response = {
        response: colors[Math.floor(Math.random() * colors.length)].replace(/\s/g, '-').toLowerCase(),
        service: service,
        hostname: os.hostname(),
    };
    res.send(response);
});

app.listen(port);

