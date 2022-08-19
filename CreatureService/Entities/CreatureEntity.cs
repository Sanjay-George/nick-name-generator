using System.Net;

namespace CreatureService.Entities;

public class CommonOutput
{    
    public string HostName { get => Dns.GetHostName(); }
}
   
public class Creature : CommonOutput {
    public string Term { get; set; }
}



