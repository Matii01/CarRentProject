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
        public static IQueryable<Car> Search(this IQueryable<Car> cars, CarRentContext context, CarParameters param)
        {
            if (param.GearboxTypeId?.Length > 0)
            {
                cars = cars.Where(x => param.GearboxTypeId.Contains(x.GearBoxTypeId));
            }
            if (param.ACTypeId.HasValue)
            {
                cars = cars.Where(x => x.AirConditioningTypeId == param.ACTypeId);
            }
            if (param.EngineTypeId?.Length > 0)
            {
                cars = cars.Where(x => param.EngineTypeId.Contains(x.EngineTypeId));
            }
            if (param.CarTypeId?.Length > 0)
            {
                cars = cars.Where(x => param.CarTypeId.Contains(x.CarTypeId));
            }
            if (param.MakeId?.Length > 0)
            {
                cars = cars.Where(x => param.MakeId.Contains(x.CarMakeId));
            }
            if (param.MinSeatsNum.HasValue)
            {
                cars = cars.Where(x => x.NumberOfSeats >= param.MinSeatsNum);
            }
            if (param.CarEquipmentId?.Length > 0)
            {

                var carlist = context.Cars
                    .Include(x => x.CarEquipmentCars);


                List<int> query = new List<int>();
                foreach(var car in carlist)
                {
                    bool add = true;
                    foreach(var t in param.CarEquipmentId)
                    {
                        if (!car.CarEquipmentCars.Select(x=>x.CarEquipmentId).Contains(t))
                        {
                            add = false;
                        }
                    }
                    if (add)
                    {
                        query.Add(car.Id);
                    }
                    add = true;
                }

                cars = cars.Where(x => query.Contains(x.Id));

            }
            if (param.PriceMin.HasValue)
            {

            }
            if (param.PriceMax.HasValue)
            {

            }

            return cars;
        }

        public static async Task<PagedList<CarListDtoForClient>> GetPagedListAsync(this IQueryable<Car> cars, CarRentContext context, CarParameters param)
        {
            cars = cars.Search(context, param);

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
                    x.Acceleration0to100,
                    x.Horsepower
                    ))
                .ToListAsync();
            
            PagedList<CarListDtoForClient> pagedList = new (list, TotalCount, param.PageNumber, param.PageSize);

            return pagedList;
        }
    }
}
