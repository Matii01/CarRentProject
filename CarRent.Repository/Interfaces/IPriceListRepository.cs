using CarRent.data.Models.CarRent;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace CarRent.Repository.Interfaces
{
    public interface IPriceListRepository
    {
        IQueryable<PriceList> GetCarPriceListForClient(int carId);
        IQueryable<PriceList> GetCarPriceListForClient(int carId, DateTime currentData);
        IQueryable<PriceList> GetPriceListsForCar(int carId, bool trackChanges);
        IQueryable<PriceList> GetPriceListsById(int pricelistId, bool trackChanges);
        IQueryable<PriceList> GetCurrentPriceList(int carId, bool trackChanges);
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
