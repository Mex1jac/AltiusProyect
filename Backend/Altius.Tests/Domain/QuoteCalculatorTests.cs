using Altius.Api.Domain.Quotes;

namespace Altius.Tests.Domain;

public sealed class QuoteCalculatorTests
{
    [Fact]
    public void CalculateLine_SnapshotsTaxAndRoundedTotals()
    {
        var draft = new QuoteLineDraft(12, "EL-001", "Elevator", "Passenger elevator", 2, 1000.25m, 16);

        var result = QuoteCalculator.CalculateLine(draft);

        Assert.Equal(2000.50m, result.Subtotal);
        Assert.Equal(320.08m, result.TaxAmount);
        Assert.Equal(2320.58m, result.Total);
        Assert.Equal("Elevator", result.Name);
    }

    [Theory]
    [InlineData(0, 100, 16)]
    [InlineData(1, -0.01, 16)]
    [InlineData(1, 100, -1)]
    [InlineData(1, 100, 100.01)]
    public void CalculateLine_RejectsInvalidAmounts(decimal quantity, decimal unitPrice, decimal taxRate)
    {
        var draft = new QuoteLineDraft(null, null, "Installation", null, quantity, unitPrice, taxRate);

        Assert.Throws<ArgumentOutOfRangeException>(() => QuoteCalculator.CalculateLine(draft));
    }

    [Fact]
    public void CalculateTotals_RejectsEmptyLines()
    {
        Assert.Throws<ArgumentException>(() => QuoteCalculator.CalculateTotals([]));
    }

    [Fact]
    public void CalculateTotals_SumsRoundedLineAmounts()
    {
        QuoteLineDraft[] lines =
        [
            new(null, null, "Equipment", null, 1, 100, 16),
            new(null, null, "Installation", null, 1, 50, 0)
        ];

        var totals = QuoteCalculator.CalculateTotals(lines);

        Assert.Equal(150m, totals.Subtotal);
        Assert.Equal(16m, totals.TaxAmount);
        Assert.Equal(166m, totals.Total);
    }
}