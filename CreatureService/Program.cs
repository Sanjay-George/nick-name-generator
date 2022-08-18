using System;
using System.Text.RegularExpressions;
using CreatureService.Logic;
using System.Text.Json.Serialization;
using System.Net;

var builder = WebApplication.CreateBuilder(args);
var app = builder.Build();


app.MapGet("/", () => {
    var creatureLogic = new CreatureLogic();
    string creature = creatureLogic.Get();

    var output = new Creature() {
            Term = creature,
            // HostName = "test"
        };

    var response = new APIGatewayResponse{
        Status = StatusCodes.Success,
        Output = output,
        Error = "",
        Module = builder.Configuration["ModuleName"]
    };

    return response;
});

app.Run();  

class APIGatewayOutput {
    public string HostName { get; }
    public APIGatewayOutput () => HostName = Dns.GetHostName();
}

// TODO: FIX PROBLEM WITH  `Term`. Coming in output variable, but not getting sent through API 
//      Could be some issue with serialization.    
class Creature : APIGatewayOutput {
    public string? Term { get; set; }
    public Creature() : base() { } 
}


class APIGatewayResponse {
    public StatusCodes Status { get; set; }
    [JsonInclude]
    public APIGatewayOutput? Output { get; set; }
    public string? Error { get; set; }
    public string? Module { get; set; }
}

enum StatusCodes {
    Success = 200,
    ServerError = 500,
    BadRequest = 400,
    NotFound = 404,    
}

