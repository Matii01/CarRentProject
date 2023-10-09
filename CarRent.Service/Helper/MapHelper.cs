using CarRent.data.DTO;
using CarRent.data.Models;
using CarRent.Service.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CarRent.Service.Helper
{
    public class MapHelper
    {
        public static CarDto MapCarToCarDto(Car car)
        {
            //throw new NotImplementedException();

            return new CarDto(
                car.Name,
                car.CarMake.Name,
                car.CarModel,
                car.Description,
                car.CarImage,
                car.CarMileage,
                car.Horsepower,
                car.Acceleration0to100,
                car.NumberOfSeats,
                car.NumberOfSeats,
                car.YearOfProduction,
                car.OverlimitFee,
                car.AverageCombustion,
                car.TrunkCapacity,
                car.CarType.Name,
                car.EngineType.Name,
                car.KilometrLimit.LimitValue,
                car.AirConditioningType.Name,
                car.GearBoxType.Name,
                car.CarDrive.Name,
                car.IsActive
                );
        }

        public static List<CarListDtoForClient> MapCarToCarListDtoForClient(IEnumerable<Car> list)
        {
            return list.Select(x => new CarListDtoForClient(
                x.Name,
                x.GearBoxType.Name,
                x.AirConditioningType.Name,
                x.AverageCombustion.ToString(),
                0)).ToList();
        }

        public static List<CarListDto> MapCarToCarListDto(IEnumerable<Car> list)
        {
            return list.Select(x => new CarListDto(
                x.Name,
                x.GearBoxType.Name,
                x.AirConditioningType.Name,
                x.AverageCombustion.ToString(),
                0)).ToList();
        }

        public static CarDetailsDtoForClient MapCarToCarDetailsDtoForClient(Car car)
        {
            return new CarDetailsDtoForClient(car.Name);
        }
    }
}
