using CarRent.api;
using CarRent.api.Extensions;
using CarRent.Service.Interfaces;
using CarRent.Service.Service;

var builder = WebApplication.CreateBuilder(args);

builder.Services.ConfigureCors();

// Add services to the container.

builder.Services.ConfigureAuthentication();
builder.Services.ConfigureJWT(builder.Configuration);
builder.Services.AddControllers();
builder.Services.ConfigureRepositoryManager();
builder.Services.ConfigureJwtSettings(builder.Configuration);
builder.Services.ConfigureServices(builder.Configuration);
builder.Services.AddAutoMapper(typeof(Program));
// Add db connection
builder.Services.ConfigureDbContext(builder.Configuration);

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.ConfigureExceptionHandler();
// Configure the HTTP request pipeline.

app.UseHttpsRedirection();

app.UseCors("CorsPolicy");

app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

app.Run();
