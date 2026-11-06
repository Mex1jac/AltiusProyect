namespace Altius.Api.Application.Common;

public sealed class NotFoundException(string message) : Exception(message);