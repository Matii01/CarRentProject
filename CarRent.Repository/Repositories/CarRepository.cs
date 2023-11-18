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
        public CarRepository(CarRentContext context) 
            : base(context)
        {

        }

        public async Task<PagedList<CarListDtoForClient>> GetAllActiveCarAsync(CarParameters parameters, bool trackChanges)
        {
            //TODO można lepiej 

            //PagedList<CarListDtoForClient> pagedList = null;

            //var pagedList = await context.Cars
            //    .GetPagedListAsync(parameters);

            //var newList = context.Cars.Search(parameters).Select(x => new CarListDtoForClient(
            //     x.Id,
            //     x.Name,
            //     x.CarMake.Name,
            //     x.CarImage ?? " ",
            //     x.EngineType.Name,
            //     x.GearBoxType.Name,
            //     x.AirConditioningType.Name,
            //     0
            //     ));
            

            var list = await context.Cars
             .Search(parameters)
             .Select(x => new CarListDtoForClient(
                 x.Id,
                 x.Name,
                 x.CarMake.Name,
                 x.CarImage ?? " ",
                 x.EngineType.Name,
                 x.GearBoxType.Name,
                 x.AirConditioningType.Name,
                 0
                 ))
             .ToListAsync();

            var pagedList = PagedList<CarListDtoForClient>
                .ToPagedList(list /*newList*/, parameters.PageNumber, parameters.PageSize);

            return pagedList;
        }

        public async Task<IEnumerable<Car>> GetAllCarAsync(CarParameters parameters, bool trackChanges)
        {
            //var list = await GetAllCarAsync(parameters, trackChanges);
            var list = All(trackChanges)
                .Include(x => x.CarMake)
                .Include(x => x.GearBoxType)
                .Include(x => x.EngineType)
                .Include(x => x.AirConditioningType)

                .Skip((parameters.PageNumber - 1) * parameters.PageSize)
                .Take(parameters.PageSize);

            return list;
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
                .SingleOrDefaultAsync();
            
            return car;
        }
    }
}
