using Altius.Api.Application.Catalog;
using Altius.Api.Application.Common;
using Altius.Api.Domain.Catalog;
using Dapper;
using MySqlConnector;

namespace Altius.Api.Infrastructure.Data;

public sealed class MySqlCatalogRepository(MySqlConnectionFactory connectionFactory) : ICatalogRepository
{
    private const string CategorySelect = """
        SELECT category_id AS Id, name AS Name, slug AS Slug, description AS Description,
               sort_order AS SortOrder, is_active AS IsActive
        FROM product_categories
        """;

    private const string ProductSelect = """
         SELECT p.product_id AS Id, p.category_id AS CategoryId, p.sku AS Sku, p.name AS Name,
             p.description AS Description, p.unit AS Unit, p.unit_price AS UnitPrice,
             p.currency AS Currency, (p.is_active AND c.is_active) AS IsActive
         FROM products p
         INNER JOIN product_categories c ON c.category_id = p.category_id
        """;

    public async Task<IReadOnlyList<ProductCategory>> GetCategoriesAsync(CancellationToken cancellationToken)
    {
        await using var connection = connectionFactory.Create();
        var categories = await connection.QueryAsync<ProductCategory>(
            new CommandDefinition(
                $"{CategorySelect} WHERE is_active = TRUE ORDER BY sort_order, name",
                cancellationToken: cancellationToken));
        return categories.AsList();
    }

    public async Task<ProductCategory?> GetCategoryAsync(long categoryId, CancellationToken cancellationToken)
    {
        await using var connection = connectionFactory.Create();
        return await connection.QuerySingleOrDefaultAsync<ProductCategory>(
            new CommandDefinition(
                $"{CategorySelect} WHERE category_id = @CategoryId",
                new { CategoryId = categoryId },
                cancellationToken: cancellationToken));
    }

    public async Task<ProductCategory> CreateCategoryAsync(
        CreateCategoryRequest request,
        CancellationToken cancellationToken)
    {
        await using var connection = connectionFactory.Create();
        try
        {
            await connection.ExecuteAsync(new CommandDefinition(
                """
                INSERT INTO product_categories (name, slug, description, sort_order)
                VALUES (@Name, @Slug, @Description, @SortOrder)
                """,
                request,
                cancellationToken: cancellationToken));
            var categoryId = await connection.ExecuteScalarAsync<long>(
                new CommandDefinition("SELECT LAST_INSERT_ID()", cancellationToken: cancellationToken));
            return (await GetCategoryAsync(categoryId, cancellationToken))!;
        }
        catch (MySqlException exception) when (exception.Number == 1062)
        {
            throw new ConflictException("A category with this slug already exists.");
        }
    }

    public async Task<ProductCategory?> UpdateCategoryAsync(
        long categoryId,
        UpdateCategoryRequest request,
        CancellationToken cancellationToken)
    {
        await using var connection = connectionFactory.Create();
        try
        {
            await connection.ExecuteAsync(new CommandDefinition(
                """
                UPDATE product_categories
                SET name = @Name, slug = @Slug, description = @Description,
                    sort_order = @SortOrder, updated_at = UTC_TIMESTAMP()
                WHERE category_id = @CategoryId
                """,
                new { CategoryId = categoryId, request.Name, request.Slug, request.Description, request.SortOrder },
                cancellationToken: cancellationToken));
            return await GetCategoryAsync(categoryId, cancellationToken);
        }
        catch (MySqlException exception) when (exception.Number == 1062)
        {
            throw new ConflictException("A category with this slug already exists.");
        }
    }

    public async Task<bool> SetCategoryActiveAsync(
        long categoryId,
        bool isActive,
        CancellationToken cancellationToken)
    {
        await using var connection = connectionFactory.Create();
        await connection.ExecuteAsync(new CommandDefinition(
            "UPDATE product_categories SET is_active = @IsActive, updated_at = UTC_TIMESTAMP() WHERE category_id = @CategoryId",
            new { CategoryId = categoryId, IsActive = isActive },
            cancellationToken: cancellationToken));
        return await connection.ExecuteScalarAsync<bool>(new CommandDefinition(
            "SELECT EXISTS(SELECT 1 FROM product_categories WHERE category_id = @CategoryId)",
            new { CategoryId = categoryId },
            cancellationToken: cancellationToken));
    }

    public async Task<IReadOnlyList<Product>> GetProductsAsync(
        long? categoryId,
        bool includeInactive,
        CancellationToken cancellationToken)
    {
        await using var connection = connectionFactory.Create();
        var products = await connection.QueryAsync<Product>(
            new CommandDefinition(
                $"""
                {ProductSelect}
                                WHERE (@CategoryId IS NULL OR p.category_id = @CategoryId)
                                    AND (@IncludeInactive = TRUE OR (p.is_active = TRUE AND c.is_active = TRUE))
                                ORDER BY p.name
                """,
                new { CategoryId = categoryId, IncludeInactive = includeInactive },
                cancellationToken: cancellationToken));
        return products.AsList();
    }

    public async Task<Product?> GetProductAsync(long productId, CancellationToken cancellationToken)
    {
        await using var connection = connectionFactory.Create();
        return await connection.QuerySingleOrDefaultAsync<Product>(
            new CommandDefinition(
                $"{ProductSelect} WHERE p.product_id = @ProductId",
                new { ProductId = productId },
                cancellationToken: cancellationToken));
    }

    public async Task<Product> CreateProductAsync(CreateProductRequest request, CancellationToken cancellationToken)
    {
        await using var connection = connectionFactory.Create();
        try
        {
            await connection.ExecuteAsync(new CommandDefinition(
                """
                INSERT INTO products (category_id, sku, name, description, unit, unit_price, currency)
                VALUES (@CategoryId, @Sku, @Name, @Description, @Unit, @UnitPrice, @Currency)
                """,
                request,
                cancellationToken: cancellationToken));
            var productId = await connection.ExecuteScalarAsync<long>(
                new CommandDefinition("SELECT LAST_INSERT_ID()", cancellationToken: cancellationToken));
            return (await GetProductAsync(productId, cancellationToken))!;
        }
        catch (MySqlException exception) when (exception.Number == 1062)
        {
            throw new ConflictException("A product with this SKU already exists.");
        }
    }

    public async Task<Product?> UpdateProductAsync(
        long productId,
        UpdateProductRequest request,
        CancellationToken cancellationToken)
    {
        await using var connection = connectionFactory.Create();
        try
        {
            await connection.ExecuteAsync(
                new CommandDefinition(
                    """
                    UPDATE products
                    SET category_id = @CategoryId, sku = @Sku, name = @Name, description = @Description,
                        unit = @Unit, unit_price = @UnitPrice, currency = @Currency, updated_at = UTC_TIMESTAMP()
                    WHERE product_id = @ProductId
                    """,
                    new
                    {
                        ProductId = productId,
                        request.CategoryId,
                        request.Sku,
                        request.Name,
                        request.Description,
                        request.Unit,
                        request.UnitPrice,
                        request.Currency
                    },
                    cancellationToken: cancellationToken));
            return await GetProductAsync(productId, cancellationToken);
        }
        catch (MySqlException exception) when (exception.Number == 1062)
        {
            throw new ConflictException("A product with this SKU already exists.");
        }
    }

    public async Task<bool> SetProductActiveAsync(
        long productId,
        bool isActive,
        CancellationToken cancellationToken)
    {
        await using var connection = connectionFactory.Create();
        await connection.ExecuteAsync(new CommandDefinition(
            "UPDATE products SET is_active = @IsActive, updated_at = UTC_TIMESTAMP() WHERE product_id = @ProductId",
            new { ProductId = productId, IsActive = isActive },
            cancellationToken: cancellationToken));
        var exists = await connection.ExecuteScalarAsync<bool>(new CommandDefinition(
            "SELECT EXISTS(SELECT 1 FROM products WHERE product_id = @ProductId)",
            new { ProductId = productId },
            cancellationToken: cancellationToken));
        return exists;
    }
}