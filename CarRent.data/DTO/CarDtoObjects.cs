using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CarRent.data.DTO
{
    public record CarListDtoForClient(string name, string gearbox, string ac, string averageCombustion, decimal price);
    public record CarDetailsDtoForClient(string name);

    public record NewCarDto(
        string Name,
        int CarMakeId,
        string CarModel,
        string? Description,
        string? CarImage,
        decimal CarMileage,
        double Horsepower,
        double Acceleration0to100,
        int NumberOfSeats,
        int NumberOfDoors,
        int YearOfProduction,
        decimal OverlimitFee,
        double AverageCombustion,
        double TrunkCapacity,
        int CarTypeId,
        int EngineTypeId,
        int KilometrLimitId,
        int AirConditioningTypeId,
        int GearBoxTypeId,
        int CarDriveId
        );

    public record CarDto(
        string Name,
        string CarMake,
        string CarModel,
        string? Description,
        string? CarImage,
        double CarMileage,
        double Horsepower,
        double Acceleration0to100,
        int NumberOfSeats,
        int NumberOfDoors,
        int YearOfProduction,
        decimal OverlimitFee,
        double AverageCombustion,
        double TrunkCapacity,
        string CarType,
        string EngineType,
        decimal KilometrLimit,
        string AirConditioningType,
        string GearBoxType,
        string CarDrive,
        bool IsActive
        );

    //public record UpdateCar(int id);
}
