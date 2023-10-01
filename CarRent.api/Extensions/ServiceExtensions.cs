using CarRent.data.Repository;
using Microsoft.EntityFrameworkCore;

namespace CarRent.api.Extensions
{
    public static class ServiceExtensions
    {

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
    }
}
