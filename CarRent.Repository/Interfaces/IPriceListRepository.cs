using CarRent.data.Models.CarRent;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CarRent.Repository.Interfaces
{
    public interface IPriceListRepository
    {
        Task<IEnumerable<PricelistItem>> GetPricelistItems(int id, bool trackChanges);
        Task RemovePriceListPosition(int itemId);
        void AddPriceListPosition(PricelistItem item);
        void Create(PriceList priceList);
        void Delete(PriceList priceList);
        /*
        Task<IEnumerable<Car>> GetAllCarAsync(CarParameters parameters, bool trackChanges);
        Task<PagedList<CarListDtoForClient>> GetAllActiveCarAsync(CarParameters parameters, bool trackChanges);
        Task<Car?> GetCarAsync(int id, bool trackChanges);
        Task<Car> GetCarForClientAsync(int id);
        void Create(Car car);
        void Delete(Car car);*/
    }
}
