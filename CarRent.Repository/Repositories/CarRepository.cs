using CarRent.data.DTO;
using CarRent.data.Models;
using CarRent.Repository.Abstract;
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

        public async Task<IEnumerable<Car>> GetAllActiveCarAsync(CarParameters parameters, bool trackChanges)
        {
            var list = await context.Cars
                .Include(x => x.GearBoxType)
                .Include(x => x.AirConditioningType)
                .Skip(parameters.PageNumber)
                .Take(parameters.PageSize)
                .ToListAsync();

            return list;
        }

        public Task<IEnumerable<Car>> GetAllCarAsync(CarParameters parameters, bool trackChanges)
        {
            throw new NotImplementedException();
        }

        public async Task<Car> GetCarAsync(int id, bool trackChanges)
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

            //var car = await context.Cars
            //    .Include(x => x.CarMake)
            //    .Include(x => x.CarType)
            //    .Include(x => x.EngineType)
            //    .Include(x => x.KilometrLimit)
            //    .Include(x => x.AirConditioningType)
            //    .Include(x => x.GearBoxType)
            //    .Include(x => x.CarDrive)
            //    .Where(x => x.Id == id)
            //    .SingleOrDefaultAsync();

            return car;
        }

        public Task<Car> GetCarForClientAsync(int id)
        {
            throw new NotImplementedException();
        }
    }
}
