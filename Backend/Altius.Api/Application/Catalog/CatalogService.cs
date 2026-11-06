using Altius.Api.Application.Common;
using Altius.Api.Domain.Catalog;

namespace Altius.Api.Application.Catalog;

public sealed class CatalogService(ICatalogRepository repository)
{
    public Task<IReadOnlyList<ProductCategory>> GetCategoriesAsync(CancellationToken cancellationToken) =>
        repository.GetCategoriesAsync(cancellationToken);

    public Task<ProductCategory?> GetCategoryAsync(long categoryId, CancellationToken cancellationToken) =>
        repository.GetCategoryAsync(categoryId, cancellationToken);

    public Task<IReadOnlyList<Product>> GetProductsAsync(
        long? categoryId,
        bool includeInactive,
        CancellationToken cancellationToken) =>
        repository.GetProductsAsync(categoryId, includeInactive, cancellationToken);

    public Task<Product?> GetProductAsync(long productId, CancellationToken cancellationToken) =>
        repository.GetProductAsync(productId, cancellationToken);

    public async Task<ProductCategory> CreateCategoryAsync(
        CreateCategoryRequest request,
        CancellationToken cancellationToken)
    {
        if (string.IsNullOrWhiteSpace(request.Name) || string.IsNullOrWhiteSpace(request.Slug))
        {
            throw new ArgumentException("Category name and slug are required.");
        }

        if (request.SortOrder < 0)
        {
            throw new ArgumentOutOfRangeException(nameof(request), "Sort order cannot be negative.");
        }

        return await repository.CreateCategoryAsync(
            request with { Name = request.Name.Trim(), Slug = request.Slug.Trim().ToLowerInvariant() },
            cancellationToken);
    }

    public async Task<ProductCategory?> UpdateCategoryAsync(
        long categoryId,
        UpdateCategoryRequest request,
        CancellationToken cancellationToken)
    {
        ValidateCategory(request.Name, request.Slug, request.SortOrder);
        return await repository.UpdateCategoryAsync(categoryId, request with
        {
            Name = request.Name.Trim(),
            Slug = request.Slug.Trim().ToLowerInvariant(),
            Description = string.IsNullOrWhiteSpace(request.Description) ? null : request.Description.Trim()
        }, cancellationToken);
    }

    public Task<bool> SetCategoryActiveAsync(long categoryId, bool isActive, CancellationToken cancellationToken) =>
        repository.SetCategoryActiveAsync(categoryId, isActive, cancellationToken);

    public async Task<Product> CreateProductAsync(
        CreateProductRequest request,
        CancellationToken cancellationToken)
    {
        ValidateProduct(request.CategoryId, request.Sku, request.Name, request.Unit, request.UnitPrice, request.Currency);
        if (await repository.GetCategoryAsync(request.CategoryId, cancellationToken) is not { IsActive: true })
        {
            throw new NotFoundException("Active product category was not found.");
        }

        return await repository.CreateProductAsync(Normalize(request), cancellationToken);
    }

    public async Task<Product?> UpdateProductAsync(
        long productId,
        UpdateProductRequest request,
        CancellationToken cancellationToken)
    {
        ValidateProduct(request.CategoryId, request.Sku, request.Name, request.Unit, request.UnitPrice, request.Currency);
        if (await repository.GetCategoryAsync(request.CategoryId, cancellationToken) is not { IsActive: true })
        {
            throw new NotFoundException("Active product category was not found.");
        }

        return await repository.UpdateProductAsync(productId, Normalize(request), cancellationToken);
    }

    public Task<bool> SetProductActiveAsync(long productId, bool isActive, CancellationToken cancellationToken) =>
        repository.SetProductActiveAsync(productId, isActive, cancellationToken);

    private static void ValidateProduct(
        long categoryId,
        string sku,
        string name,
        string unit,
        decimal unitPrice,
        string currency)
    {
        if (categoryId <= 0 || string.IsNullOrWhiteSpace(sku) || string.IsNullOrWhiteSpace(name) || string.IsNullOrWhiteSpace(unit))
        {
            throw new ArgumentException("Category, SKU, name, and unit are required.");
        }

        if (unitPrice < 0)
        {
            throw new ArgumentOutOfRangeException(nameof(unitPrice), "Unit price cannot be negative.");
        }

        if (!string.Equals(currency, "MXN", StringComparison.OrdinalIgnoreCase))
        {
            throw new ArgumentException("Only MXN is supported.", nameof(currency));
        }
    }

    private static void ValidateCategory(string name, string slug, int sortOrder)
    {
        if (string.IsNullOrWhiteSpace(name) || string.IsNullOrWhiteSpace(slug))
        {
            throw new ArgumentException("Category name and slug are required.");
        }

        if (sortOrder < 0)
        {
            throw new ArgumentOutOfRangeException(nameof(sortOrder), "Sort order cannot be negative.");
        }
    }

    private static CreateProductRequest Normalize(CreateProductRequest request) => request with
    {
        Sku = request.Sku.Trim().ToUpperInvariant(),
        Name = request.Name.Trim(),
        Description = string.IsNullOrWhiteSpace(request.Description) ? null : request.Description.Trim(),
        Unit = request.Unit.Trim(),
        Currency = "MXN"
    };

    private static UpdateProductRequest Normalize(UpdateProductRequest request) => request with
    {
        Sku = request.Sku.Trim().ToUpperInvariant(),
        Name = request.Name.Trim(),
        Description = string.IsNullOrWhiteSpace(request.Description) ? null : request.Description.Trim(),
        Unit = request.Unit.Trim(),
        Currency = "MXN"
    };
}