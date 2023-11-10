using CarRent.data.DTO;
using CarRent.data.Models.CarRent;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CarRent.Service.Interfaces
{
    public interface IPriceListService
    {
        //Task<IEnumerable<PricelistItemDto>> GetPriceList(int Id, bool trackChanges);
        Task<IEnumerable<PriceListDto>> GetPriceListsForCar(int carId, bool trackChanges);
        Task<IEnumerable<PricelistItemDto>> GetPricelistItems(int priceListId);
        Task<IEnumerable<PricelistDateDto>> GetPricelistDate(int priceListId);
        Task<PriceList> CreatePriceListForCarAsync(PriceListDto priceList);
        Task RemovePosition(int itemId);
        Task RemovePriceListDate(int itemId);
        Task<PricelistItem> AddPosition(NewtPricelistItemDto item);
        Task AddCarlistDate(PricelistDateDto dateDto);
        Task<bool> CarPriceListExistForThisDateTime(PricelistDateDto priceListDate);


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
