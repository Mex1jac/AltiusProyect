using Altius.Api.Application.Common;
using Altius.Api.Application.Quotes;
using Altius.Api.Domain.Quotes;
using Microsoft.AspNetCore.Mvc;

namespace Altius.Api.Controllers;

[ApiController]
[Route("api/quotes")]
public sealed class QuotesController(QuoteService service) : ControllerBase
{
    [HttpPost]
    [ServiceFilter(typeof(AdminApiKeyFilter))]
    public async Task<IActionResult> Create(CreateQuoteRequest request, CancellationToken cancellationToken)
    {
        try
        {
            return StatusCode(StatusCodes.Status201Created,
                await service.CreateAsync(request, cancellationToken));
        }
        catch (ArgumentException exception)
        {
            return BadRequest(new ProblemDetails { Status = 400, Title = exception.Message });
        }
        catch (NotFoundException exception)
        {
            return NotFound(new ProblemDetails { Status = 404, Title = exception.Message });
        }
    }

    [HttpGet("{quoteId:long}")]
    [ServiceFilter(typeof(AdminApiKeyFilter))]
    public async Task<IActionResult> Get(
        long quoteId,
        [FromQuery] int? version,
        CancellationToken cancellationToken)
    {
        var quote = await service.GetAsync(quoteId, version, cancellationToken);
        return quote is null ? NotFound() : Ok(quote);
    }

    [HttpPost("{quoteId:long}/versions")]
    [ServiceFilter(typeof(AdminApiKeyFilter))]
    public async Task<IActionResult> CreateRevision(
        long quoteId,
        CreateQuoteRequest request,
        CancellationToken cancellationToken)
    {
        try
        {
            return StatusCode(StatusCodes.Status201Created,
                await service.CreateRevisionAsync(quoteId, request, cancellationToken));
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

    [HttpPatch("{quoteId:long}/versions/{version:int}/status")]
    [ServiceFilter(typeof(AdminApiKeyFilter))]
    public async Task<IActionResult> Transition(
        long quoteId,
        int version,
        ChangeQuoteStatusRequest request,
        CancellationToken cancellationToken)
    {
        if (!Enum.IsDefined(request.Status) || request.Status == QuoteStatus.Superseded)
        {
            return BadRequest(new ProblemDetails { Status = 400, Title = "The requested quote status is invalid." });
        }

        try
        {
            var quote = await service.TransitionAsync(quoteId, version, request.Status, request.Note, cancellationToken);
            return quote is null ? NotFound() : Ok(quote);
        }
        catch (ConflictException exception)
        {
            return Conflict(new ProblemDetails { Status = 409, Title = exception.Message });
        }
    }

    public sealed record ChangeQuoteStatusRequest(QuoteStatus Status, string? Note);
}