using Altius.Api.Application.Catalog;
using Altius.Api.Application.Common;
using Microsoft.AspNetCore.Mvc;

namespace Altius.Api.Controllers;

[ApiController]
[Route("api/catalog")]
public sealed class CatalogController(CatalogService service) : ControllerBase
{
    [HttpGet("categories")]
    public async Task<IActionResult> GetCategories(CancellationToken cancellationToken) =>
        Ok(await service.GetCategoriesAsync(cancellationToken));

    [HttpGet("categories/{categoryId:long}")]
    public async Task<IActionResult> GetCategory(long categoryId, CancellationToken cancellationToken)
    {
        var category = await service.GetCategoryAsync(categoryId, cancellationToken);
        return category is null || !category.IsActive ? NotFound() : Ok(category);
    }

    [HttpPost("categories")]
    [ServiceFilter(typeof(AdminApiKeyFilter))]
    public async Task<IActionResult> CreateCategory(
        CreateCategoryRequest request,
        CancellationToken cancellationToken)
    {
        try
        {
            var category = await service.CreateCategoryAsync(request, cancellationToken);
            return CreatedAtAction(nameof(GetCategory), new { categoryId = category.Id }, category);
        }
        catch (ArgumentException exception)
        {
            return BadRequest(new ProblemDetails { Status = 400, Title = exception.Message });
        }
        catch (ConflictException exception)
        {
            return Conflict(new ProblemDetails { Status = 409, Title = exception.Message });
        }
    }

    [HttpPut("categories/{categoryId:long}")]
    [ServiceFilter(typeof(AdminApiKeyFilter))]
    public async Task<IActionResult> UpdateCategory(
        long categoryId,
        UpdateCategoryRequest request,
        CancellationToken cancellationToken)
    {
        try
        {
            var category = await service.UpdateCategoryAsync(categoryId, request, cancellationToken);
            return category is null ? NotFound() : Ok(category);
        }
        catch (ArgumentException exception)
        {
            return BadRequest(new ProblemDetails { Status = 400, Title = exception.Message });
        }
        catch (ConflictException exception)
        {
            return Conflict(new ProblemDetails { Status = 409, Title = exception.Message });
        }
    }

    [HttpPatch("categories/{categoryId:long}/active")]
    [ServiceFilter(typeof(AdminApiKeyFilter))]
    public async Task<IActionResult> SetCategoryActive(
        long categoryId,
        [FromBody] SetProductActiveRequest request,
        CancellationToken cancellationToken) =>
        await service.SetCategoryActiveAsync(categoryId, request.IsActive, cancellationToken)
            ? NoContent()
            : NotFound();

    [HttpGet("products")]
    public async Task<IActionResult> GetProducts(
        [FromQuery] long? categoryId,
        CancellationToken cancellationToken) =>
        Ok(await service.GetProductsAsync(categoryId, includeInactive: false, cancellationToken));

    [HttpGet("products/{productId:long}")]
    public async Task<IActionResult> GetProduct(long productId, CancellationToken cancellationToken)
    {
        var product = await service.GetProductAsync(productId, cancellationToken);
        return product is null || !product.IsActive ? NotFound() : Ok(product);
    }

    [HttpPost("products")]
    [ServiceFilter(typeof(AdminApiKeyFilter))]
    public async Task<IActionResult> CreateProduct(
        CreateProductRequest request,
        CancellationToken cancellationToken)
    {
        try
        {
            var product = await service.CreateProductAsync(request, cancellationToken);
            return CreatedAtAction(nameof(GetProduct), new { productId = product.Id }, product);
        }
        catch (ArgumentException exception)
        {
            return BadRequest(new ProblemDetails { Status = 400, Title = exception.Message });
        }
        catch (NotFoundException exception)
        {
            return NotFound(new ProblemDetails { Status = 404, Title = exception.Message });
        }
        catch (ConflictException exception)
        {
            return Conflict(new ProblemDetails { Status = 409, Title = exception.Message });
        }
    }

    [HttpPut("products/{productId:long}")]
    [ServiceFilter(typeof(AdminApiKeyFilter))]
    public async Task<IActionResult> UpdateProduct(
        long productId,
        UpdateProductRequest request,
        CancellationToken cancellationToken)
    {
        try
        {
            var product = await service.UpdateProductAsync(productId, request, cancellationToken);
            return product is null ? NotFound() : Ok(product);
        }
        catch (ArgumentException exception)
        {
            return BadRequest(new ProblemDetails { Status = 400, Title = exception.Message });
        }
        catch (NotFoundException exception)
        {
            return NotFound(new ProblemDetails { Status = 404, Title = exception.Message });
        }
        catch (ConflictException exception)
        {
            return Conflict(new ProblemDetails { Status = 409, Title = exception.Message });
        }
    }

    [HttpPatch("products/{productId:long}/active")]
    [ServiceFilter(typeof(AdminApiKeyFilter))]
    public async Task<IActionResult> SetProductActive(
        long productId,
        [FromBody] SetProductActiveRequest request,
        CancellationToken cancellationToken) =>
        await service.SetProductActiveAsync(productId, request.IsActive, cancellationToken)
            ? NoContent()
            : NotFound();

    public sealed record SetProductActiveRequest(bool IsActive);
}