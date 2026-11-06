using Altius.Api.Application.Catalog;
using Altius.Api.Application.Common;
using Altius.Api.Domain.Quotes;

namespace Altius.Api.Application.Quotes;

public sealed class QuoteService(IQuoteRepository quoteRepository, ICatalogRepository catalogRepository)
{
    public Task<QuoteView?> GetAsync(long quoteId, int? version, CancellationToken cancellationToken) =>
        quoteRepository.GetAsync(quoteId, version, cancellationToken);

    public async Task<QuoteView> CreateAsync(CreateQuoteRequest request, CancellationToken cancellationToken)
    {
        var draft = await CreateDraftAsync(request, cancellationToken);
        return await quoteRepository.CreateAsync(draft, cancellationToken);
    }

    public async Task<QuoteView> CreateRevisionAsync(
        long quoteId,
        CreateQuoteRequest request,
        CancellationToken cancellationToken)
    {
        var draft = await CreateDraftAsync(request, cancellationToken);
        return await quoteRepository.CreateRevisionAsync(quoteId, draft, cancellationToken);
    }

    public Task<QuoteView?> TransitionAsync(
        long quoteId,
        int version,
        QuoteStatus nextStatus,
        string? note,
        CancellationToken cancellationToken) =>
        quoteRepository.TransitionAsync(quoteId, version, nextStatus, note, cancellationToken);

    private async Task<QuoteDraft> CreateDraftAsync(CreateQuoteRequest request, CancellationToken cancellationToken)
    {
        if (request.Customer is null || string.IsNullOrWhiteSpace(request.Customer.Name))
        {
            throw new ArgumentException("Customer name is required.");
        }

        if (request.Lines is null || request.Lines.Count == 0)
        {
            throw new ArgumentException("At least one quote line is required.");
        }

        if (request.Lines.Count > 100)
        {
            throw new ArgumentException("A quote cannot contain more than 100 lines.");
        }

        var lines = new List<QuoteLineDraft>(request.Lines.Count);
        foreach (var requestedLine in request.Lines)
        {
            if (requestedLine.ProductId is long productId)
            {
                var product = await catalogRepository.GetProductAsync(productId, cancellationToken);
                if (product is not { IsActive: true })
                {
                    throw new NotFoundException($"Active product {productId} was not found.");
                }

                lines.Add(new QuoteLineDraft(
                    product.Id,
                    product.Sku,
                    product.Name,
                    product.Description,
                    requestedLine.Quantity,
                    product.UnitPrice,
                    requestedLine.TaxRate));
            }
            else
            {
                if (requestedLine.UnitPrice is null)
                {
                    throw new ArgumentException("Manual quote lines require a unit price.");
                }

                lines.Add(new QuoteLineDraft(
                    null,
                    requestedLine.Sku,
                    requestedLine.Name ?? string.Empty,
                    requestedLine.Description,
                    requestedLine.Quantity,
                    requestedLine.UnitPrice.Value,
                    requestedLine.TaxRate));
            }
        }

        var snapshots = lines.Select(QuoteCalculator.CalculateLine).ToArray();
        var totals = new QuoteTotals(
            snapshots.Sum(line => line.Subtotal),
            snapshots.Sum(line => line.TaxAmount),
            snapshots.Sum(line => line.Total));
        var customer = request.Customer;

        return new QuoteDraft(
            $"COT-{DateTime.UtcNow:yyyy}-{Guid.NewGuid():N}"[..25].ToUpperInvariant(),
            customer.Name.Trim(),
            Normalize(customer.Email),
            Normalize(customer.Phone),
            Normalize(customer.Address),
            request.ValidUntil?.Date,
            Normalize(request.Notes),
            snapshots,
            totals);
    }

    private static string? Normalize(string? value) =>
        string.IsNullOrWhiteSpace(value) ? null : value.Trim();
}