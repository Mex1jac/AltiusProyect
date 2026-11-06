namespace Altius.Api.Domain.Quotes;

public static class QuoteStatusTransitions
{
    public static bool CanTransition(QuoteStatus current, QuoteStatus next) =>
        (current, next) switch
        {
            (QuoteStatus.Draft, QuoteStatus.Sent) => true,
            (QuoteStatus.Sent, QuoteStatus.Accepted or QuoteStatus.Rejected or QuoteStatus.Expired or QuoteStatus.Superseded) => true,
            _ => false
        };
}