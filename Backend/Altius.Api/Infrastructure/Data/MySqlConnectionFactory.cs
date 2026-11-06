using MySqlConnector;

namespace Altius.Api.Infrastructure.Data;

public sealed class MySqlConnectionFactory(IConfiguration configuration)
{
    public MySqlConnection Create()
    {
        var connectionString = configuration.GetConnectionString("Altius");
        if (string.IsNullOrWhiteSpace(connectionString))
        {
            throw new InvalidOperationException(
                "Configure the database connection with the ConnectionStrings:Altius setting.");
        }

        return new MySqlConnection(connectionString);
    }
}