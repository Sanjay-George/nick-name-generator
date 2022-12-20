using CreatureService.Logic;
using Xunit;

namespace CreatureService.Tests;

public class CreatureLogicTests
{
    [Fact]
    public void Get_EmptyInput_ReturnsString()
    {
        var logic = new CreatureLogic();

        var result = logic.Get();

        Assert.IsType<string>(result);
    }

    [Fact]
    public void Get_EmptyInput_ReturnsNotEmptyString()
    {
        var logic = new CreatureLogic();

        var result = logic.Get();

        Assert.NotEmpty(result);
    }
}