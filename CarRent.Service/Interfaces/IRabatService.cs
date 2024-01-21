using CarRent.data.DTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CarRent.Service.Interfaces
{
    public interface IRabatService
    {
        Task<IEnumerable<RabatDto>> GetCurrentRabat();
        Task<RabatValueDto> CalculateRabat(int carId, string? userId);
        Task<RabatValueDto> GetUserRabat(string userId);
        Task<IEnumerable<RabatForUserDto>> GetUserRabats(string userId);
        Task<IEnumerable<CarRabatDto>> GetCarRabats(int carId);
        Task<RabatValueDto> GetRabatForCar(int carId);
        Task AddRabatForUser(NewRabatForUserDto newRabat);
        Task AddCarRabat(int carId, CarRabatDto newRabat);
        Task DeleteUserRabat(int rabatId);
        Task DeleteCarRabat(int rabatId);
    }
}
