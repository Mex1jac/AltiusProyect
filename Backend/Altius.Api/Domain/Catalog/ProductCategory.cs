namespace Altius.Api.Domain.Catalog;

public sealed record ProductCategory(
    long Id,
    string Name,
    string Slug,
    string? Description,
    int SortOrder,
    bool IsActive);