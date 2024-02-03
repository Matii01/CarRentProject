using CarRent.data.DTO;
using CarRent.data.Models;
using CarRent.Repository.Abstract;
using CarRent.Repository.Extensions;
using CarRent.Repository.Interfaces;
using CarRent.Repository.Parameters;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CarRent.Repository.Repositories
{
    public class CarRepository : RepositoryBase<Car>, ICarRepository
    {
        private readonly IPriceListRepository priceList;
        public CarRepository(CarRentContext context, IPriceListRepository priceList) 
            : base(context)
        {
            this.priceList = priceList;
        }

        public async Task<PagedList<CarListDtoForClient>> GetCarsForClientAsync(CarParameters parameters, bool trackChanges)
        {
            var currentData = DateTime.Now;

            var list = context.Cars
             .Where(x => x.IsActive == true)
             .Where(x => x.IsVisible == true)
             .Search(context, parameters)
             .Select(x => new CarListDtoForClient(
                 x.Id,
                 x.Name,
                 x.CarMake.Name,
                 x.CarImage ?? " ",
                 x.EngineType.Name,
                 x.GearBoxType.Name,
                 x.AirConditioningType.Name,
                 x.Acceleration0to100,
                 x.Horsepower
                 ));

            var pagedList = await PagedList<CarListDtoForClient>
                .ToPagedList(list /*newList*/, parameters.PageNumber, parameters.PageSize);

            foreach (var item in pagedList.Items) 
            {
                item.Price = await priceList.GetCarPriceForOneDay(item.Id);
            }

            return pagedList;
        }

        public async Task<PagedList<CarListDto>> GetCarsForWorkerAsync(CarParameters parameters, bool trackChanges)
        {
            var list = context.Cars
                .Where(x => x.IsActive == true)
                .OrderByDescending(x=>x.Id)
                .Search(context, parameters)
                .Select(x => new CarListDto(
                    x.Id,
                    x.Name,
                    x.CarMake.Name,
                    x.EngineType.Name,
                    x.GearBoxType.Name,
                    x.AirConditioningType.Name,
                    0
                    ));

            var pagedList = await PagedList<CarListDto>
                .ToPagedList(list, parameters.PageNumber, parameters.PageSize);

            return pagedList;
        }

        public IQueryable<Car> GetCarsExcept(List<int> excludedIds)
        {
            var carList = context.Cars
                .Where(x => x.IsActive)
                .Where(x => !excludedIds.Contains(x.Id));

            return carList;
        }

        public IQueryable<Car?> GetCarById(int id, bool trackChanges)
        {
            var car = FindByCondition(x => x.Id == id, trackChanges);
            return car;
        }

        public async Task<Car?> GetCarAsync(int id, bool trackChanges)
        {
            var car = await FindByCondition(c => c.Id == id, trackChanges)
                .Include(x => x.CarMake)
                .Include(x => x.CarType)
                .Include(x => x.EngineType)
                .Include(x => x.KilometrLimit)
                .Include(x => x.AirConditioningType)
                .Include(x => x.GearBoxType)
                .Include(x => x.CarDrive)
                .Include(x => x.CarImages)
                .SingleOrDefaultAsync();

            return car;
        }

        public async Task<Car> GetCarForClientAsync(int id)
        {
            var car = await FindByCondition(x => x.Id == id, false)
                .Include(x => x.CarMake)
                .Include(x => x.EngineType)
                .Include(x => x.GearBoxType)
                .Include(x => x.AirConditioningType)
                .Include(x => x.CarImages)
                .Include(x => x.CarsEquipment)
                .SingleOrDefaultAsync();
            
            return car;
        }
    }
}
