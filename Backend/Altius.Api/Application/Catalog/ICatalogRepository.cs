using Altius.Api.Domain.Catalog;

namespace Altius.Api.Application.Catalog;

public interface ICatalogRepository
{
    Task<IReadOnlyList<ProductCategory>> GetCategoriesAsync(CancellationToken cancellationToken);
    Task<ProductCategory?> GetCategoryAsync(long categoryId, CancellationToken cancellationToken);
    Task<ProductCategory> CreateCategoryAsync(CreateCategoryRequest request, CancellationToken cancellationToken);
    Task<ProductCategory?> UpdateCategoryAsync(long categoryId, UpdateCategoryRequest request, CancellationToken cancellationToken);
    Task<bool> SetCategoryActiveAsync(long categoryId, bool isActive, CancellationToken cancellationToken);
    Task<IReadOnlyList<Product>> GetProductsAsync(long? categoryId, bool includeInactive, CancellationToken cancellationToken);
    Task<Product?> GetProductAsync(long productId, CancellationToken cancellationToken);
    Task<Product> CreateProductAsync(CreateProductRequest request, CancellationToken cancellationToken);
    Task<Product?> UpdateProductAsync(long productId, UpdateProductRequest request, CancellationToken cancellationToken);
    Task<bool> SetProductActiveAsync(long productId, bool isActive, CancellationToken cancellationToken);
}