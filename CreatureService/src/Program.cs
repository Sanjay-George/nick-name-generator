using CreatureService.Logic;
using CreatureService.Entities;

var builder = WebApplication.CreateBuilder(args);
var app = builder.Build();


app.MapGet("/", () => {
    var creatureLogic = new CreatureLogic();
    string creature = creatureLogic.Get();
        
    return new APIGatewayResponse<Creature>{
        Status = CreatureService.Entities.StatusCodes.Success,
        Output = new Creature {
            Term = creature
        },
        Error = "",
        Module = builder.Configuration["ModuleName"]
    };
});

app.Run();  


