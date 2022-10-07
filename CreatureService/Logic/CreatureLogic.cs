using System.Text.RegularExpressions;

namespace CreatureService.Logic;
    
class CreatureLogic {

    private Random random; 
    public CreatureLogic() => random = new Random();

    static IList<string> Creatures = new List<string> {
            "Cyclops",
            "Ogre",
            "Leprechauns",
            "Gnomes",
            "Goblins",
            "Faeries",
            "Gorgon",
            "Mermaid",
            "Aqrabuamelu",
            "Minotaur",
            "Centaurs",
            "Fauns",
            "Werewolf",
            "Loch Ness Monster",
            "Griffin",
            "Phoenix",
            "Basilisk",
            "Unicorn",
            "Dragon",
            "Bigfoot",
            "Hydra",
            "Pontianak",
            "Banshee",
            "Dybbuk",
            "Vampire"
        };

    public string Get() {
        string creature = Creatures[random.Next(Creatures.Count)];
        return new Regex(@"\s+").Replace(creature, "-").ToLower();
    }
}