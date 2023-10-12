using CarRent.api.Extensions;
using CarRent.Service.Interfaces;
using CarRent.Service.Service;

var builder = WebApplication.CreateBuilder(args);

builder.Services.ConfigureCors();

// Add services to the container.

builder.Services.AddControllers();
builder.Services.ConfigureRepositoryManager();
builder.Services.ConfigureServices();
builder.Services.AddAutoMapper(typeof(Program));


// Add db connection
builder.Services.ConfigureDbContext(builder.Configuration);

var app = builder.Build();

// Configure the HTTP request pipeline.

app.UseHttpsRedirection();

app.UseCors("CorsPolicy");

app.UseAuthorization();

app.MapControllers();

app.Run();
