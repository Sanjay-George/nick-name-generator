import express from 'express';
import os from 'os'
import config from './config.js';

const app = express();
const { port, name } = config;

app.get("/", (req, res) => {
    res.send(`Hello from ${name} service running on ${os.hostname}`);
});

app.listen(port);

