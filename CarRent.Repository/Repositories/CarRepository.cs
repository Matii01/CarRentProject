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
            var list = await FindByCondition(x => x.IsActive == true, trackChanges)              
                .Include(x => x.GearBoxType)
                .Include(x => x.AirConditioningType)
                
                .Skip((parameters.PageNumber -1) * parameters.PageSize)
                .Take(parameters.PageSize)
                .ToListAsync();

            return list;
        }

        public async Task<IEnumerable<Car>> GetAllCarAsync(CarParameters parameters, bool trackChanges)
        {
            var list = await GetAllCarAsync(parameters, trackChanges);
            return list;
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

            return car;
        }

        public async Task<Car> GetCarForClientAsync(int id)
        {
            var car = await FindByCondition(x => x.Id == id, false)
                .SingleOrDefaultAsync();
            
            return car;
        }
    }
}
