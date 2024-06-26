﻿using CarRent.data.Configurations;
using CarRent.data.Models.Auth;
using CarRent.data.Models.User;
using CarRent.Repository;
using CarRent.Repository.Interfaces;
using CarRent.SendingEmail;
using CarRent.Service;
using CarRent.Service.Interfaces;
using CarRent.Service.Service;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Stripe;
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

        public static void ConfigureServices(this IServiceCollection services, IConfiguration configuration)
        {
            services.AddScoped<IServiceManager, ServiceManager>();
            services.AddScoped<IAuthenticationService, AuthenticationService>();

            services.AddSingleton(GetEmailConfiguration(configuration));
            services.AddSingleton(GetWhConfiguration(configuration));

            services.AddScoped<IEmailSender, EmailSender>();
        }

        public static void ConfigureJwtSettings(this IServiceCollection services, IConfiguration configuration)
        {
            // Bind the JwtSettings section and add it do DI
            services.Configure<JwtSettings>(configuration.GetSection("JwtSettings"));
        }

        public static void ConfigureAuthentication(this IServiceCollection services)
        {
            services.AddAuthentication(CookieAuthenticationDefaults.AuthenticationScheme)
                .AddCookie(options =>
                {
                    options.Cookie.HttpOnly = true;
                });
            services.AddIdentity<User, IdentityRole>(o =>
            {

            }).AddEntityFrameworkStores<CarRentContext>()
              .AddDefaultTokenProviders();
        }

        public static void ConfigureJWT(this IServiceCollection services, IConfiguration configuration)
        {
            var jwtSettings = configuration.GetSection("JwtSettings");
            var secretKey = Environment.GetEnvironmentVariable("SECRET") ?? throw new InvalidOperationException("Enviroment Variable not found"); ;

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

        public static void ConfigureStripe(this IServiceCollection services, IConfiguration configuration)
        {
            var config = configuration.GetSection("SecretKey");
            StripeConfiguration.ApiKey = config["SecretKey"];
            Console.WriteLine("Configure api key");
            Console.WriteLine(StripeConfiguration.ApiKey);
        }

        private static WhSecretConfiguration GetWhConfiguration(IConfiguration configuration)
        {
            return configuration.GetSection("Secret").Get<WhSecretConfiguration>()
                ?? throw new InvalidOperationException("WhConfiguration not found.");
        }

        private static EmailConfiguration GetEmailConfiguration(IConfiguration configuration)
        {
            return configuration
                .GetSection("EmailConfiguration")
                .Get<EmailConfiguration>()
                ?? throw new InvalidOperationException("Email configuration not found.");
        }
    }
}
