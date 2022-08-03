import express from 'express';
import os from 'os';
import { ApiGatewayResponse } from '@sanjay-george/nng-common/apigatewayResponse.js';
import { statusCodes  } from '@sanjay-george/nng-common/statusCodes.js';

import config from './config.js';
import adjectives from './data.js';

const app = express();
const { port, service } = config;


app.get("/", (req, res) => {
    const output = {
        term: adjectives[Math.floor(Math.random() * adjectives.length)].toLowerCase(),
        hostname: os.hostname(),
    };

    const response = new ApiGatewayResponse()
            .setStatus(statusCodes.Success)
            .setOutput(output)
            .setModule(service)
            .setError("");

    res.send(response);
});

app.listen(port);

