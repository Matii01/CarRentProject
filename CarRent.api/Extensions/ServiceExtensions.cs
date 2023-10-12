using CarRent.Repository;
using CarRent.Repository.Interfaces;
using CarRent.Service;
using CarRent.Service.Interfaces;
using CarRent.Service.Service;
using Microsoft.EntityFrameworkCore;

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
        }
    }
}
