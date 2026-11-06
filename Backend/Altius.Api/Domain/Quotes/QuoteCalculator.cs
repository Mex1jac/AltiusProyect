namespace Altius.Api.Domain.Quotes;

public static class QuoteCalculator
{
    public static QuoteLineSnapshot CalculateLine(QuoteLineDraft line)
    {
        ArgumentNullException.ThrowIfNull(line);

        if (string.IsNullOrWhiteSpace(line.Name))
        {
            throw new ArgumentException("A quote line name is required.", nameof(line));
        }

        if (line.Quantity <= 0)
        {
            throw new ArgumentOutOfRangeException(nameof(line), "Quantity must be greater than zero.");
        }

        if (line.UnitPrice < 0)
        {
            throw new ArgumentOutOfRangeException(nameof(line), "Unit price cannot be negative.");
        }

        if (line.TaxRate is < 0 or > 100)
        {
            throw new ArgumentOutOfRangeException(nameof(line), "Tax rate must be between 0 and 100.");
        }

        var subtotal = decimal.Round(line.Quantity * line.UnitPrice, 2, MidpointRounding.AwayFromZero);
        var taxAmount = decimal.Round(subtotal * line.TaxRate / 100, 2, MidpointRounding.AwayFromZero);

        return new QuoteLineSnapshot(
            line.ProductId,
            line.Sku,
            line.Name.Trim(),
            string.IsNullOrWhiteSpace(line.Description) ? null : line.Description.Trim(),
            line.Quantity,
            line.UnitPrice,
            line.TaxRate,
            subtotal,
            taxAmount,
            subtotal + taxAmount);
    }

    public static QuoteTotals CalculateTotals(IEnumerable<QuoteLineDraft> lines)
    {
        ArgumentNullException.ThrowIfNull(lines);

        var snapshots = lines.Select(CalculateLine).ToArray();
        if (snapshots.Length == 0)
        {
            throw new ArgumentException("At least one quote line is required.", nameof(lines));
        }

        var subtotal = snapshots.Sum(line => line.Subtotal);
        var taxAmount = snapshots.Sum(line => line.TaxAmount);
        return new QuoteTotals(subtotal, taxAmount, subtotal + taxAmount);
    }
}