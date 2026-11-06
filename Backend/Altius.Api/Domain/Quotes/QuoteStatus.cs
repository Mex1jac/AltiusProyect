using System.Text.Json.Serialization;

namespace Altius.Api.Domain.Quotes;

[JsonConverter(typeof(JsonStringEnumConverter))]
public enum QuoteStatus
{
    Draft,
    Sent,
    Accepted,
    Rejected,
    Expired,
    Superseded
}