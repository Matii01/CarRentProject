using CarRent.data.DTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CarRent.Service.Interfaces
{
    public interface ICarTypeService
    {
        Task<IEnumerable<CarMakeDto>> GetAllCarTypeAsync(bool trackChanges);
        Task<IEnumerable<CarMakeDto>> GetAllActiveCarTypeAsync(bool trackChanges);
        Task<CarMakeDto> GetCarTypeAsync(int id, bool trackChanges);
        Task<CarMakeDto> CreateCarTypeAsync(CarMakeDto carMake);
        Task UpdateCarTypeAsync(int id, CarMakeDto carMake, bool trackChanges);
    }
}
