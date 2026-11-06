using Altius.Api.Domain.Quotes;

namespace Altius.Api.Application.Quotes;

public interface IQuoteRepository
{
    Task<QuoteView> CreateAsync(QuoteDraft draft, CancellationToken cancellationToken);
    Task<QuoteView> CreateRevisionAsync(long quoteId, QuoteDraft draft, CancellationToken cancellationToken);
    Task<QuoteView?> GetAsync(long quoteId, int? version, CancellationToken cancellationToken);
    Task<QuoteView?> TransitionAsync(
        long quoteId,
        int version,
        QuoteStatus nextStatus,
        string? note,
        CancellationToken cancellationToken);
}