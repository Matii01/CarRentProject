using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CarRent.data.DTO
{
    public record CarListDtoForClient(string name, string gearbox, string ac, string averageCombustion, decimal price);
    public record CarDetailsDtoForClient(string name);

    public record AddNewCar(
        string Name,
        int CarMakeId,
        string CarModel,
        string? Description,
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

    //public record UpdateCar(int id);
}
