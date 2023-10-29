using CarRent.data.Models.Auth;
using CarRent.data.Models.User;
using CarRent.Repository;
using CarRent.Repository.Interfaces;
using CarRent.Service;
using CarRent.Service.Interfaces;
using CarRent.Service.Service;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.Text;

namespace CarRent.api.Extensions
{
    public static class ServiceExtensions
    {
        public static void ConfigureCors(this IServiceCollection services)
        {
            services.AddCors(opt =>
            {
                opt.AddPolicy("CorsPolicy", builder =>
                {
                    builder.AllowAnyOrigin()
                    .AllowAnyMethod()
                    .AllowAnyHeader();
                });
            });
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="service"></param>
        /// <param name="configuration"></param>
        /// <exception cref="InvalidOperationException"></exception>
        public static void ConfigureDbContext(this IServiceCollection service, IConfiguration configuration)
        {
            service.AddDbContext<CarRentContext>(options =>
                options.UseSqlServer(configuration.GetConnectionString("CarRentContext") ?? throw new InvalidOperationException("Connection string 'CarRentContext' not found.")));
        }

        public static void ConfigureRepositoryManager(this IServiceCollection service) =>
            service.AddScoped<IRepositoryManager, RepositoryManager>();

        public static void ConfigureServices(this IServiceCollection services)
        {
            //services.AddScoped<ICarService, CarService>();
            //services.AddScoped<ICarMakeService, CarMakeService>();
            services.AddScoped<IServiceManager, ServiceManager>();
            services.AddScoped<IAuthenticationService, AuthenticationService>();

            // Bind the JwtSettings section and add it do DI
            //services.Configure<JwtSettings>(configuration.GetSection("JwtSettings"));
        }
        public static void ConfigureJwtSettings(this IServiceCollection services, IConfiguration configuration)
        {
            // Bind the JwtSettings section and add it do DI
            services.Configure<JwtSettings>(configuration.GetSection("JwtSettings"));
        }



        public static void ConfigureAuthentication(this IServiceCollection services)
        {
            services.AddAuthentication();
            services.AddIdentity<User, IdentityRole>(o =>
            {

            }).AddEntityFrameworkStores<CarRentContext>()
              .AddDefaultTokenProviders();
        }

        public static void ConfigureJWT(this IServiceCollection services, IConfiguration configuration)
        {
            var jwtSettings = configuration.GetSection("JwtSettings");
            var secretKey = Environment.GetEnvironmentVariable("SECRET");

            services.AddAuthentication(opt =>
            {
                opt.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                opt.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
            })
                .AddJwtBearer(opt =>
            {
                opt.TokenValidationParameters = new Microsoft.IdentityModel.Tokens.TokenValidationParameters
                {
                    ValidateIssuer = true,
                    ValidateAudience = true,
                    ValidateLifetime = true,
                    ValidateIssuerSigningKey = true,
                    ValidIssuer = jwtSettings["validIssuer"],
                    ValidAudience = jwtSettings["validAudience"],
                    IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(secretKey))
                };
            });
        }
    }
}
