namespace CreatureService.Entities;

public class APIGatewayResponse<T> {
    public StatusCodes Status { get; set; }
    public T Output { get; set; }
    public string? Error { get; set; }
    public string? Module { get; set; }
}


public enum StatusCodes {
    Success = 200,
    ServerError = 500,
    BadRequest = 400,
    NotFound = 404,    
}