namespace Altius.Api.Domain.Quotes;

public sealed record QuoteLineDraft(
    long? ProductId,
    string? Sku,
    string Name,
    string? Description,
    decimal Quantity,
    decimal UnitPrice,
    decimal TaxRate);