import fetch from 'node-fetch';

import { ApiGatewayResponse } from '@sanjay-george/nng-common/apigatewayResponse.js';
import { statusCodes  } from '@sanjay-george/nng-common/statusCodes.js';


export default class ApiGateway {
    constructor() {
        this.calls = [];
    }

    addCall(module, route = "") {
        const url = `http://${module}/${route}`;
        this.calls.push({ module, url });
        return this;
    }

    async call() {
        const { calls } = this;
        if(!calls.length)  return [];

        for(let i = 0; i < calls.length; i++) {
            const call = calls[i];
            try {
                const response = await fetch(call.url);
                const jsonResponse = await response.json();
                call.response = jsonResponse;
            }
            catch(ex) {
                call.response = new ApiGatewayResponse()
                            .setStatus(statusCodes.ServerError)
                            .setOutput({})
                            .setError(ex)
                            .setModule(call.module);
            }
        }
        return calls.map(item => item.response.output);
    }
}