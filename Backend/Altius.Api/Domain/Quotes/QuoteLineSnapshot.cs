namespace Altius.Api.Domain.Quotes;

public sealed record QuoteLineSnapshot(
    long? ProductId,
    string? Sku,
    string Name,
    string? Description,
    decimal Quantity,
    decimal UnitPrice,
    decimal TaxRate,
    decimal Subtotal,
    decimal TaxAmount,
    decimal Total);