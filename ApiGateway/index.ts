import fetch from 'node-fetch';
import { json } from 'stream/consumers';


enum RequestTypeEnum {
    Http = 'http',
    // GRPC = 'gRPC'
}

interface IAPIGatewayRequest {
    module: string,
    endpoint: string,
}

interface IAPIGatewayHttpRequest extends IAPIGatewayRequest {
    // TODO: HTTP method
    // TODO: SSL flag
    body?: object,
    headers?: object,
    isTLSEnabled: boolean,
}

interface IAPIGatewayResponse {
    status: StatusCodeEnum,
    output: string | null,  // JSON String
    error: string | null,
    module: string,
}

enum StatusCodeEnum {
    Success = '200',
    ServerError = '500',
    BadRequest = '400',
    NotFound = '404',
};

class APIGateway {
    private calls: Promise<unknown>[] = [];
    private requestMeta: IAPIGatewayHttpRequest[] = [];

    // Overload signatures
    addCall(request: IAPIGatewayHttpRequest): this;
    addCall(request: IAPIGatewayRequest, type: RequestTypeEnum): this;

    // Implementation signature
    addCall(request: IAPIGatewayRequest, type?: RequestTypeEnum): this {
        if(!type || type === RequestTypeEnum.Http) {
            return this.addHttpCall(request as IAPIGatewayHttpRequest);
        }
        // make GRPC or other protocol calls based on RequestTypeEnum ...
        return this;
    }

    private addHttpCall(request: IAPIGatewayHttpRequest): this {
        // TODO: Guard empty module and endpoint. Return a promise that resolves immediately with error
        const { body, headers, module, endpoint, isTLSEnabled } = request;
        const protocol = isTLSEnabled ? "https" : "http";
        const url = `${protocol}://${module}/${endpoint}`;
       
        const callPromise = new Promise(async (resolve, reject) => {
            try {
                const response = await fetch(url);
                const contentType = response.headers.get('content-type');
                if (contentType && contentType.indexOf("application/json") !== -1) {
                    resolve(await response.json());
                }
                else {
                    resolve(await response.text());
                }
            }
            catch(ex) {
                console.error(ex);
                reject(`${ex.name}: ${ex.message}`);
            }
        })
        this.calls.push(callPromise);
        this.requestMeta.push(request);
        return this;
    }

    async call(): Promise<IAPIGatewayResponse[]> {
        if(!this.calls.length)  return [];
        
        const responseList = await Promise.allSettled(this.calls);

        const finalOutput: IAPIGatewayResponse[] = [];
        for(let i = 0; i < responseList.length; i++) {
            const response = responseList[i];
            const requestMeta = this.requestMeta[i];

            if(response.status === 'fulfilled') {
                finalOutput.push({
                    status: StatusCodeEnum.Success,
                    output: response.value as string,
                    error: null,
                    module: requestMeta.module,
                });
            }
            else {
                finalOutput.push({
                    status: StatusCodeEnum.ServerError,
                    output: null,
                    error: response.reason,
                    module: requestMeta.module,
                })
            }
        }
        return finalOutput;
    }
}


// TODO: REMOVE THESE BEFORE MERGING
// (async () => {
//     const gateway = new APIGateway();

//     // https://www.google.com/robots.txt
//     const req1 = { module: "www.google.com", endpoint: "robots.txt", isTLSEnabled: true };
//     const req2 = { module: "www.google.com", endpoint: "", isTLSEnabled: true };

//     gateway.addCall(req1);
//     gateway.addCall(req2);

//     const [res1, res2] = await gateway.call();

//     console.log(JSON.stringify(res1));
//     console.log(JSON.stringify(res2));


// })();



