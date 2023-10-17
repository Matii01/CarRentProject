using CarRent.data.DTO;
using CarRent.data.Models;
using CarRent.Service.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.ConstrainedExecution;
using System.Text;
using System.Threading.Tasks;

namespace CarRent.Service.Helper
{
    public class MapHelper
    {
        public static CarDto MapCarToCarDto(Car car)
        {
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
                car.NumberOfDoors,
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

        public static NewCarDto MapCarToNewCarDto(Car car)
        {
            return new NewCarDto(
                car.Name,
                car.CarMake.Id,
                car.CarModel,
                car.Description,
                car.CarImage,
                car.CarMileage,
                car.Horsepower,
                car.Acceleration0to100,
                car.NumberOfSeats,
                car.NumberOfDoors,
                car.YearOfProduction,
                car.OverlimitFee,
                car.AverageCombustion,
                car.TrunkCapacity,
                car.CarType.Id,
                car.EngineType.Id,    
                car.KilometrLimit.Id,
                car.AirConditioningType.Id,
                car.GearBoxType.Id,
                car.CarDrive.Id
                );
        }

        public static void UpdateCar(ref Car toUpdate, NewCarDto carDto)
        {
            toUpdate.Name = carDto.Name;
            toUpdate.CarMakeId = carDto.CarMakeId;
            toUpdate.CarModel = carDto.CarModel;
            toUpdate.Description = carDto.Description;
            toUpdate.CarImage = carDto.CarImage;
            toUpdate.CarMileage = carDto.CarMileage;
            toUpdate.Horsepower = carDto.Horsepower;
            toUpdate.Acceleration0to100 = carDto.Acceleration0to100;
            toUpdate.NumberOfSeats = carDto.NumberOfSeats;
            toUpdate.NumberOfDoors = carDto.NumberOfDoors;
            toUpdate.YearOfProduction = carDto.YearOfProduction;
            toUpdate.OverlimitFee = carDto.OverlimitFee;
            toUpdate.AverageCombustion = carDto.AverageCombustion; 
            toUpdate.TrunkCapacity = carDto.TrunkCapacity;
            toUpdate.CarTypeId = carDto.CarTypeId;  
            toUpdate.EngineTypeId = carDto.EngineTypeId;
            toUpdate.KilometrLimitId = carDto.KilometrLimitId;
            toUpdate.AirConditioningTypeId = carDto.AirConditioningTypeId;
            toUpdate.GearBoxTypeId = carDto.GearBoxTypeId;
            toUpdate.CarDriveId = carDto.CarDriveId;
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
                x.Id,
                x.Name,
                x.CarMake.Name,
                x.EngineType.Name,
                x.GearBoxType.Name,
                x.AirConditioningType.Name,
                0)).ToList();
        }

        public static CarDetailsDtoForClient MapCarToCarDetailsDtoForClient(Car car)
        {
            return new CarDetailsDtoForClient(car.Name);
        }
    }
}
