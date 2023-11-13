using CarRent.data.DTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CarRent.Service.Interfaces
{
    public interface ICarMakeService
    {
        Task<IEnumerable<CarMakeDto>> GetAllCarMakesAsync(bool trackChanges);
        Task<IEnumerable<CarMakeDto>> GetAllActiveCarMakesAsync(bool trackChanges);
        Task<CarMakeDto> GetCarMakeAsync(int id, bool trackChanges);
        Task<CarMakeDto> CreateCarMakeAsync(CarMakeDto carMake);
        Task DeleteAsync(int id);
        Task UpdateCarMakeAsync(int id, CarMakeDto carMake, bool trackChanges);
    }
}
