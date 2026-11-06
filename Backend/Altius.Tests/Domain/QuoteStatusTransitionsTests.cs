using Altius.Api.Domain.Quotes;

namespace Altius.Tests.Domain;

public sealed class QuoteStatusTransitionsTests
{
    [Theory]
    [InlineData(QuoteStatus.Draft, QuoteStatus.Sent)]
    [InlineData(QuoteStatus.Sent, QuoteStatus.Accepted)]
    [InlineData(QuoteStatus.Sent, QuoteStatus.Rejected)]
    [InlineData(QuoteStatus.Sent, QuoteStatus.Expired)]
    [InlineData(QuoteStatus.Sent, QuoteStatus.Superseded)]
    public void CanTransition_AllowsValidTransitions(QuoteStatus current, QuoteStatus next)
    {
        Assert.True(QuoteStatusTransitions.CanTransition(current, next));
    }

    [Theory]
    [InlineData(QuoteStatus.Draft, QuoteStatus.Accepted)]
    [InlineData(QuoteStatus.Accepted, QuoteStatus.Superseded)]
    [InlineData(QuoteStatus.Rejected, QuoteStatus.Sent)]
    public void CanTransition_RejectsInvalidTransitions(QuoteStatus current, QuoteStatus next)
    {
        Assert.False(QuoteStatusTransitions.CanTransition(current, next));
    }
}