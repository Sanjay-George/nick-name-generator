export const ApiGatewayResponse  = class {
    setStatus (status) {
        this.status = status; 
        return this;
    }
    setOutput (output) {
        this.output = output;
        return this;
    }
    setError (error) {
        this.error = error;
        return this;
    }
    setModule(module) {
        this.module = module;
        return this;
    }
};