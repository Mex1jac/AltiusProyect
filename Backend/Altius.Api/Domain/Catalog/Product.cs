namespace Altius.Api.Domain.Catalog;

public sealed record Product(
    long Id,
    long CategoryId,
    string Sku,
    string Name,
    string? Description,
    string Unit,
    decimal UnitPrice,
    string Currency,
    bool IsActive);