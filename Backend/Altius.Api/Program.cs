using Altius.Api.Application.Catalog;
using Altius.Api.Application.Quotes;
using Altius.Api.Controllers;
using Altius.Api.Infrastructure.Data;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();
builder.Services.AddScoped<MySqlConnectionFactory>();
builder.Services.AddScoped<ICatalogRepository, MySqlCatalogRepository>();
builder.Services.AddScoped<IQuoteRepository, MySqlQuoteRepository>();
builder.Services.AddScoped<CatalogService>();
builder.Services.AddScoped<QuoteService>();
builder.Services.AddScoped<AdminApiKeyFilter>();

var allowedOrigins = builder.Configuration.GetSection("Cors:AllowedOrigins").Get<string[]>() ?? [];
builder.Services.AddCors(options => options.AddPolicy("Frontend", policy =>
	policy.WithOrigins(allowedOrigins).AllowAnyHeader().AllowAnyMethod()));

var app = builder.Build();

app.UseHttpsRedirection();
app.UseCors("Frontend");
app.MapControllers();

app.Run();

public partial class Program;
