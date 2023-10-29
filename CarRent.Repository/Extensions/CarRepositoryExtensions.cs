using CarRent.data.DTO;
using CarRent.data.Models;
using CarRent.Repository.Parameters;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.SqlServer.Query.Internal;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Runtime.ConstrainedExecution;
using System.Text;
using System.Threading.Tasks;

namespace CarRent.Repository.Extensions
{
    public static class CarRepositoryExtensions
    {
        public static IQueryable<Car> Search(this IQueryable<Car> cars, CarParameters param)
        {
            if (param.GearboxTypeId.HasValue)
            {
                cars = cars.Where(x => x.GearBoxTypeId == param.GearboxTypeId);
            }
            if (param.ACTypeId.HasValue)
            {
                cars = cars.Where(x => x.AirConditioningTypeId == param.ACTypeId);
            }
            if (param.EngineTypeId.HasValue)
            {
                cars = cars.Where(x => x.EngineTypeId == param.EngineTypeId);
            }
            if (param.CarTypeId.HasValue)
            {
                cars = cars.Where(x => x.CarTypeId == param.CarTypeId);
            }
            if (param.MakeId.HasValue)
            {
                cars = cars.Where(x => x.CarMakeId == param.MakeId);
            }
            if(param.MinSeatsNum.HasValue)
            {
                cars = cars.Where(x => x.NumberOfSeats >= param.MinSeatsNum);
            }
            return cars;
        }

        public static async Task<PagedList<CarListDtoForClient>> GetPagedListAsync(this IQueryable<Car> cars, CarParameters param)
        {
            cars = cars.Search(param);

            int TotalCount = cars.Count();

            var list = await cars.
                Skip((param.PageNumber -1) * param.PageSize)
                .Take(param.PageSize)
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
            
            PagedList<CarListDtoForClient> pagedList = new (list, TotalCount, param.PageNumber, param.PageSize);

            return pagedList;
        }
    }
}
