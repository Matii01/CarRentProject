using CarRent.data.DTO;
using CarRent.data.Models;
using CarRent.Repository.Parameters;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CarRent.Service.Interfaces
{
    public interface ICarService
    {
        Task<List<CarListDtoForClient>> GetCarListForClientAsync(CarParameters carParameters, bool trackChanges);
        Task<List<CarListDto>> GetCarsAsync(CarParameters carParameters, bool trackChanges);
        Task<CarDetailsDtoForClient> GetCarDetailsForClientAsync(int id);
        Task<CarDto> GetCarById(int id, bool trackChanges);

        Task<Car> CreateCarAsync(NewCarDto car);
        Task UpdateCarAsync(int id, NewCarDto newCar, bool trackChanges);
        Task DeleteCar(int id);
    }
}
