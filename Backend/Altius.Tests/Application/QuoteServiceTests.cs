using Altius.Api.Application.Catalog;
using Altius.Api.Application.Quotes;
using Altius.Api.Domain.Catalog;
using Altius.Api.Domain.Quotes;

namespace Altius.Tests.Application;

public sealed class QuoteServiceTests
{
    [Fact]
    public async Task CreateAsync_UsesCurrentCatalogSnapshotForProductLines()
    {
        var quotes = new CapturingQuoteRepository();
        var catalog = new FakeCatalogRepository(new Product(7, 2, "EL-007", "Passenger elevator", null, "unit", 250m, "MXN", true));
        var service = new QuoteService(quotes, catalog);
        var request = new CreateQuoteRequest(
            new QuoteCustomerRequest("Customer", null, null, null),
            null,
            null,
            [new QuoteLineRequest(7, "Client name", null, null, 2, 1m)]);

        await service.CreateAsync(request, CancellationToken.None);

        var line = Assert.Single(quotes.Draft!.Lines);
        Assert.Equal(7, line.ProductId);
        Assert.Equal("EL-007", line.Sku);
        Assert.Equal("Passenger elevator", line.Name);
        Assert.Equal(250m, line.UnitPrice);
        Assert.Equal(500m, line.Subtotal);
        Assert.Equal(80m, line.TaxAmount);
    }

    [Fact]
    public async Task CreateAsync_AcceptsPricedManualLines()
    {
        var quotes = new CapturingQuoteRepository();
        var service = new QuoteService(quotes, new FakeCatalogRepository(null));
        var request = new CreateQuoteRequest(
            new QuoteCustomerRequest("Customer", null, null, "Metepec"),
            null,
            null,
            [new QuoteLineRequest(null, "Installation", null, "On-site work", 1, 1500m, 0)]);

        await service.CreateAsync(request, CancellationToken.None);

        var line = Assert.Single(quotes.Draft!.Lines);
        Assert.Null(line.ProductId);
        Assert.Equal("Installation", line.Name);
        Assert.Equal(1500m, line.UnitPrice);
        Assert.Equal(0m, line.TaxAmount);
    }

    [Fact]
    public async Task CreateAsync_RejectsManualLinesWithoutPrice()
    {
        var service = new QuoteService(new CapturingQuoteRepository(), new FakeCatalogRepository(null));
        var request = new CreateQuoteRequest(
            new QuoteCustomerRequest("Customer", null, null, null),
            null,
            null,
            [new QuoteLineRequest(null, "Installation", null, null, 1, null)]);

        await Assert.ThrowsAsync<ArgumentException>(() => service.CreateAsync(request, CancellationToken.None));
    }

    private sealed class CapturingQuoteRepository : IQuoteRepository
    {
        public QuoteDraft? Draft { get; private set; }

        public Task<QuoteView> CreateAsync(QuoteDraft draft, CancellationToken cancellationToken)
        {
            Draft = draft;
            return Task.FromResult(new QuoteView(
                1,
                draft.Number,
                1,
                QuoteStatus.Draft,
                draft.CustomerName,
                draft.CustomerEmail,
                draft.CustomerPhone,
                draft.CustomerAddress,
                "MXN",
                draft.ValidUntil,
                draft.Notes,
                draft.Totals.Subtotal,
                draft.Totals.TaxAmount,
                draft.Totals.Total,
                DateTime.UtcNow,
                null,
                draft.Lines.Select(line => new QuoteItemView(
                    line.ProductId,
                    line.Sku,
                    line.Name,
                    line.Description,
                    line.Quantity,
                    line.UnitPrice,
                    line.TaxRate,
                    line.Subtotal,
                    line.TaxAmount,
                    line.Total)).ToArray(),
                []));
        }

        public Task<QuoteView> CreateRevisionAsync(long quoteId, QuoteDraft draft, CancellationToken cancellationToken) =>
            throw new NotImplementedException();

        public Task<QuoteView?> GetAsync(long quoteId, int? version, CancellationToken cancellationToken) =>
            throw new NotImplementedException();

        public Task<QuoteView?> TransitionAsync(
            long quoteId,
            int version,
            QuoteStatus nextStatus,
            string? note,
            CancellationToken cancellationToken) =>
            throw new NotImplementedException();
    }

    private sealed class FakeCatalogRepository(Product? product) : ICatalogRepository
    {
        public Task<Product?> GetProductAsync(long productId, CancellationToken cancellationToken) =>
            Task.FromResult(product?.Id == productId ? product : null);

        public Task<IReadOnlyList<ProductCategory>> GetCategoriesAsync(CancellationToken cancellationToken) =>
            throw new NotImplementedException();

        public Task<ProductCategory?> GetCategoryAsync(long categoryId, CancellationToken cancellationToken) =>
            throw new NotImplementedException();

        public Task<ProductCategory> CreateCategoryAsync(CreateCategoryRequest request, CancellationToken cancellationToken) =>
            throw new NotImplementedException();

        public Task<ProductCategory?> UpdateCategoryAsync(long categoryId, UpdateCategoryRequest request, CancellationToken cancellationToken) =>
            throw new NotImplementedException();

        public Task<bool> SetCategoryActiveAsync(long categoryId, bool isActive, CancellationToken cancellationToken) =>
            throw new NotImplementedException();

        public Task<IReadOnlyList<Product>> GetProductsAsync(long? categoryId, bool includeInactive, CancellationToken cancellationToken) =>
            throw new NotImplementedException();

        public Task<Product> CreateProductAsync(CreateProductRequest request, CancellationToken cancellationToken) =>
            throw new NotImplementedException();

        public Task<Product?> UpdateProductAsync(long productId, UpdateProductRequest request, CancellationToken cancellationToken) =>
            throw new NotImplementedException();

        public Task<bool> SetProductActiveAsync(long productId, bool isActive, CancellationToken cancellationToken) =>
            throw new NotImplementedException();
    }
}