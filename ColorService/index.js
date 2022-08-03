import express from 'express';
import os from 'os'
import config from './config.js';
import colors from './data.js';

import { ApiGatewayResponse } from '@sanjay-george/nng-common/apigatewayResponse.js';
import { statusCodes  } from '@sanjay-george/nng-common/statusCodes.js';


const app = express();
const { port, service } = config;

app.get("/", (req, res) => {
    const output = {
        term: colors[Math.floor(Math.random() * colors.length)].replace(/\s/g, '-').toLowerCase(),
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

