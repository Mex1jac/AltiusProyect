using Altius.Api.Domain.Quotes;

namespace Altius.Api.Application.Quotes;

public sealed record QuoteCustomerRequest(
    string Name,
    string? Email,
    string? Phone,
    string? Address);

public sealed record QuoteLineRequest(
    long? ProductId,
    string? Name,
    string? Sku,
    string? Description,
    decimal Quantity,
    decimal? UnitPrice,
    decimal TaxRate = 16);

public sealed record CreateQuoteRequest(
    QuoteCustomerRequest Customer,
    DateTime? ValidUntil,
    string? Notes,
    IReadOnlyList<QuoteLineRequest> Lines);

public sealed record QuoteItemView(
    long? ProductId,
    string? Sku,
    string Name,
    string? Description,
    decimal Quantity,
    decimal UnitPrice,
    decimal TaxRate,
    decimal Subtotal,
    decimal TaxAmount,
    decimal Total);

public sealed record QuoteHistoryView(
    string? FromStatus,
    string ToStatus,
    DateTime CreatedAt,
    string? Note);

public sealed record QuoteView(
    long Id,
    string Number,
    int Version,
    QuoteStatus Status,
    string CustomerName,
    string? CustomerEmail,
    string? CustomerPhone,
    string? CustomerAddress,
    string Currency,
    DateTime? ValidUntil,
    string? Notes,
    decimal Subtotal,
    decimal TaxAmount,
    decimal Total,
    DateTime CreatedAt,
    DateTime? SentAt,
    IReadOnlyList<QuoteItemView> Items,
    IReadOnlyList<QuoteHistoryView> History);

public sealed record QuoteDraft(
    string Number,
    string CustomerName,
    string? CustomerEmail,
    string? CustomerPhone,
    string? CustomerAddress,
    DateTime? ValidUntil,
    string? Notes,
    IReadOnlyList<QuoteLineSnapshot> Lines,
    QuoteTotals Totals);