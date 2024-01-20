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
        Task<RabatValueDto> GetRabatForCar(int carId);
        Task AddRabatForUser(NewRabatForUser newRabat);
    }
}
