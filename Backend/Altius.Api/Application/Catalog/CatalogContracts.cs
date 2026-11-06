namespace Altius.Api.Application.Catalog;

public sealed record CreateCategoryRequest(
    string Name,
    string Slug,
    string? Description,
    int SortOrder = 0);

public sealed record UpdateCategoryRequest(
    string Name,
    string Slug,
    string? Description,
    int SortOrder);

public sealed record CreateProductRequest(
    long CategoryId,
    string Sku,
    string Name,
    string? Description,
    string Unit,
    decimal UnitPrice,
    string Currency = "MXN");

public sealed record UpdateProductRequest(
    long CategoryId,
    string Sku,
    string Name,
    string? Description,
    string Unit,
    decimal UnitPrice,
    string Currency = "MXN");