using CarRent.data.DTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CarRent.Service.Interfaces
{
    public interface IPriceListService
    {
        Task<IEnumerable<PricelistItemDto>> GetPriceList(int Id, bool trackChanges);
        Task<IEnumerable<PricelistItemDto>?> GetPriceListForCar(int carId, bool trackChanges);
        Task RemovePosition(int itemId);
        Task AddPosition(NewtPricelistItemDto item);
        Task<bool> CarPriceListExist(int carId);

        /*
        Task<PagedList<CarListDtoForClient>> GetCarListForClientAsync(CarParameters carParameters, bool trackChanges);
        Task<List<CarListDto>> GetCarsAsync(CarParameters carParameters, bool trackChanges);
        Task<CarDetailsDtoForClient> GetCarDetailsForClientAsync(int id);
        Task<NewCarDto?> GetCarById(int id, bool trackChanges);

        Task<Car> CreateCarAsync(NewCarDto car);
        Task UpdateCarAsync(int id, NewCarDto newCar, bool trackChanges);
        Task DeleteCar(int id);
         */
    }
}
