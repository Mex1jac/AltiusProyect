using Altius.Api.Application.Common;
using Altius.Api.Application.Quotes;
using Altius.Api.Domain.Quotes;
using Dapper;
using MySqlConnector;

namespace Altius.Api.Infrastructure.Data;

public sealed class MySqlQuoteRepository(MySqlConnectionFactory connectionFactory) : IQuoteRepository
{
    public async Task<QuoteView> CreateAsync(QuoteDraft draft, CancellationToken cancellationToken)
    {
        await using var connection = connectionFactory.Create();
        await connection.OpenAsync(cancellationToken);
        await using var transaction = await connection.BeginTransactionAsync(cancellationToken);

        var quoteId = await connection.ExecuteScalarAsync<long>(new CommandDefinition(
            "INSERT INTO quotes (quote_number) VALUES (@Number); SELECT LAST_INSERT_ID();",
            new { draft.Number }, transaction, cancellationToken: cancellationToken));

        await InsertVersionAsync(connection, transaction, quoteId, 1, draft, cancellationToken);
        await transaction.CommitAsync(cancellationToken);
        return (await GetAsync(quoteId, 1, cancellationToken))!;
    }

    public async Task<QuoteView> CreateRevisionAsync(
        long quoteId,
        QuoteDraft draft,
        CancellationToken cancellationToken)
    {
        await using var connection = connectionFactory.Create();
        await connection.OpenAsync(cancellationToken);
        await using var transaction = await connection.BeginTransactionAsync(cancellationToken);

        var latest = await connection.QuerySingleOrDefaultAsync<VersionStatusRow>(new CommandDefinition(
            """
            SELECT version_number AS Version, status AS Status
            FROM quote_versions
            WHERE quote_id = @QuoteId
            ORDER BY version_number DESC
            LIMIT 1 FOR UPDATE
            """,
            new { QuoteId = quoteId }, transaction, cancellationToken: cancellationToken));

        if (latest is null)
        {
            throw new NotFoundException("Quote was not found.");
        }

        if (!string.Equals(latest.Status, "sent", StringComparison.OrdinalIgnoreCase))
        {
            throw new ConflictException("Only a sent quote can be revised.");
        }

        var nextVersion = latest.Version + 1;
        await connection.ExecuteAsync(new CommandDefinition(
            "UPDATE quote_versions SET status = 'superseded' WHERE quote_id = @QuoteId AND version_number = @Version",
            new { QuoteId = quoteId, Version = latest.Version }, transaction, cancellationToken: cancellationToken));
        await InsertHistoryAsync(
            connection,
            transaction,
            quoteId,
            latest.Version,
            "sent",
            "superseded",
            "Replaced by a new quote version.",
            cancellationToken);

        await InsertVersionAsync(connection, transaction, quoteId, nextVersion, draft, cancellationToken);
        await transaction.CommitAsync(cancellationToken);
        return (await GetAsync(quoteId, nextVersion, cancellationToken))!;
    }

    public async Task<QuoteView?> GetAsync(long quoteId, int? version, CancellationToken cancellationToken)
    {
        await using var connection = connectionFactory.Create();
        var header = await connection.QuerySingleOrDefaultAsync<QuoteHeaderRow>(new CommandDefinition(
            """
            SELECT q.quote_id AS Id, q.quote_number AS Number, v.version_number AS Version,
                   v.status AS Status, v.customer_name AS CustomerName, v.customer_email AS CustomerEmail,
                   v.customer_phone AS CustomerPhone, v.customer_address AS CustomerAddress,
                   v.currency AS Currency, v.valid_until AS ValidUntil, v.notes AS Notes,
                   v.subtotal AS Subtotal, v.tax_amount AS TaxAmount, v.total AS Total,
                   v.created_at AS CreatedAt, v.sent_at AS SentAt
            FROM quotes q
            INNER JOIN quote_versions v ON v.quote_id = q.quote_id
            WHERE q.quote_id = @QuoteId AND (@Version IS NULL OR v.version_number = @Version)
            ORDER BY v.version_number DESC
            LIMIT 1
            """,
            new { QuoteId = quoteId, Version = version },
            cancellationToken: cancellationToken));

        if (header is null)
        {
            return null;
        }

        var items = await connection.QueryAsync<QuoteItemView>(new CommandDefinition(
            """
            SELECT product_id AS ProductId, sku AS Sku, product_name AS Name,
                   description AS Description, quantity AS Quantity, unit_price AS UnitPrice,
                   tax_rate AS TaxRate, subtotal AS Subtotal, tax_amount AS TaxAmount, total AS Total
            FROM quote_items
            WHERE quote_id = @QuoteId AND version_number = @Version
            ORDER BY item_id
            """,
            new { QuoteId = quoteId, header.Version },
            cancellationToken: cancellationToken));

        var history = await connection.QueryAsync<QuoteHistoryView>(new CommandDefinition(
            """
            SELECT from_status AS FromStatus, to_status AS ToStatus, created_at AS CreatedAt, note AS Note
            FROM quote_status_history
            WHERE quote_id = @QuoteId AND version_number = @Version
            ORDER BY history_id
            """,
            new { QuoteId = quoteId, header.Version },
            cancellationToken: cancellationToken));

        return new QuoteView(
            header.Id,
            header.Number,
            header.Version,
            Enum.Parse<QuoteStatus>(header.Status, ignoreCase: true),
            header.CustomerName,
            header.CustomerEmail,
            header.CustomerPhone,
            header.CustomerAddress,
            header.Currency,
            header.ValidUntil,
            header.Notes,
            header.Subtotal,
            header.TaxAmount,
            header.Total,
            header.CreatedAt,
            header.SentAt,
            items.AsList(),
            history.AsList());
    }

    public async Task<QuoteView?> TransitionAsync(
        long quoteId,
        int version,
        QuoteStatus nextStatus,
        string? note,
        CancellationToken cancellationToken)
    {
        await using var connection = connectionFactory.Create();
        await connection.OpenAsync(cancellationToken);
        await using var transaction = await connection.BeginTransactionAsync(cancellationToken);

        var current = await connection.QuerySingleOrDefaultAsync<VersionStatusRow>(new CommandDefinition(
            """
            SELECT version_number AS Version, status AS Status
            FROM quote_versions
            WHERE quote_id = @QuoteId AND version_number = @Version
            FOR UPDATE
            """,
            new { QuoteId = quoteId, Version = version }, transaction, cancellationToken: cancellationToken));

        if (current is null)
        {
            return null;
        }

        var currentStatus = Enum.Parse<QuoteStatus>(current.Status, ignoreCase: true);
        if (!QuoteStatusTransitions.CanTransition(currentStatus, nextStatus))
        {
            throw new ConflictException($"A quote cannot transition from {currentStatus} to {nextStatus}.");
        }

        await connection.ExecuteAsync(new CommandDefinition(
            """
            UPDATE quote_versions
            SET status = @Status, sent_at = CASE WHEN @Status = 'sent' THEN UTC_TIMESTAMP() ELSE sent_at END
            WHERE quote_id = @QuoteId AND version_number = @Version
            """,
            new { Status = ToDatabaseStatus(nextStatus), QuoteId = quoteId, Version = version },
            transaction,
            cancellationToken: cancellationToken));
        await InsertHistoryAsync(
            connection,
            transaction,
            quoteId,
            version,
            ToDatabaseStatus(currentStatus),
            ToDatabaseStatus(nextStatus),
            note,
            cancellationToken);
        await transaction.CommitAsync(cancellationToken);

        return await GetAsync(quoteId, version, cancellationToken);
    }

    private static async Task InsertVersionAsync(
        MySqlConnection connection,
        MySqlTransaction transaction,
        long quoteId,
        int version,
        QuoteDraft draft,
        CancellationToken cancellationToken)
    {
        await connection.ExecuteAsync(new CommandDefinition(
            """
            INSERT INTO quote_versions
                (quote_id, version_number, status, customer_name, customer_email, customer_phone,
                 customer_address, currency, valid_until, notes, subtotal, tax_amount, total)
            VALUES
                (@QuoteId, @Version, 'draft', @CustomerName, @CustomerEmail, @CustomerPhone,
                 @CustomerAddress, 'MXN', @ValidUntil, @Notes, @Subtotal, @TaxAmount, @Total)
            """,
            new
            {
                QuoteId = quoteId,
                Version = version,
                draft.CustomerName,
                draft.CustomerEmail,
                draft.CustomerPhone,
                draft.CustomerAddress,
                draft.ValidUntil,
                draft.Notes,
                draft.Totals.Subtotal,
                draft.Totals.TaxAmount,
                draft.Totals.Total
            },
            transaction,
            cancellationToken: cancellationToken));

        foreach (var line in draft.Lines)
        {
            await connection.ExecuteAsync(new CommandDefinition(
                """
                INSERT INTO quote_items
                    (quote_id, version_number, product_id, sku, product_name, description, quantity,
                     unit_price, tax_rate, subtotal, tax_amount, total)
                VALUES
                    (@QuoteId, @Version, @ProductId, @Sku, @Name, @Description, @Quantity,
                     @UnitPrice, @TaxRate, @Subtotal, @TaxAmount, @Total)
                """,
                new
                {
                    QuoteId = quoteId,
                    Version = version,
                    line.ProductId,
                    line.Sku,
                    line.Name,
                    line.Description,
                    line.Quantity,
                    line.UnitPrice,
                    line.TaxRate,
                    line.Subtotal,
                    line.TaxAmount,
                    line.Total
                },
                transaction,
                cancellationToken: cancellationToken));
        }

        await InsertHistoryAsync(connection, transaction, quoteId, version, null, "draft", null, cancellationToken);
    }

    private static Task<int> InsertHistoryAsync(
        MySqlConnection connection,
        MySqlTransaction transaction,
        long quoteId,
        int version,
        string? fromStatus,
        string toStatus,
        string? note,
        CancellationToken cancellationToken) =>
        connection.ExecuteAsync(new CommandDefinition(
            """
            INSERT INTO quote_status_history (quote_id, version_number, from_status, to_status, note)
            VALUES (@QuoteId, @Version, @FromStatus, @ToStatus, @Note)
            """,
            new { QuoteId = quoteId, Version = version, FromStatus = fromStatus, ToStatus = toStatus, Note = note },
            transaction,
            cancellationToken: cancellationToken));

    private static string ToDatabaseStatus(QuoteStatus status) => status.ToString().ToLowerInvariant();

    private sealed class QuoteHeaderRow
    {
        public long Id { get; init; }
        public string Number { get; init; } = string.Empty;
        public int Version { get; init; }
        public string Status { get; init; } = string.Empty;
        public string CustomerName { get; init; } = string.Empty;
        public string? CustomerEmail { get; init; }
        public string? CustomerPhone { get; init; }
        public string? CustomerAddress { get; init; }
        public string Currency { get; init; } = "MXN";
        public DateTime? ValidUntil { get; init; }
        public string? Notes { get; init; }
        public decimal Subtotal { get; init; }
        public decimal TaxAmount { get; init; }
        public decimal Total { get; init; }
        public DateTime CreatedAt { get; init; }
        public DateTime? SentAt { get; init; }
    }

    private sealed class VersionStatusRow
    {
        public int Version { get; init; }
        public string Status { get; init; } = string.Empty;
    }
}