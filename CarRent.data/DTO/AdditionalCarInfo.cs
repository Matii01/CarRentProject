using CarRent.data.Models.CarRent;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CarRent.data.DTO
{
    public record CarMakeDto(int Id , string Name, string? Description);
    public record CarTypeDto(int Id, string Name);
    public record EngineTypeDto(int Id, string Name);
    public record GearboxTypeDto(int Id, string Name);
    public record KilometrLimitDto(int Id, decimal LimitValue);
    public record CarDriveDto(int Id, string Name, string? Description);
    public record AirConditioningTypeDto(int Id, string Name);
    public record AllInfoForNewCar
    (
        IEnumerable<CarMakeDto> CarMakes,
        IEnumerable<CarTypeDto> CarType,
        IEnumerable<EngineTypeDto> EngineType,
        IEnumerable<GearboxTypeDto> GearboxType,
        IEnumerable<KilometrLimitDto> KilometrLimit,
        IEnumerable<CarDriveDto> CarDrive,
        IEnumerable<AirConditioningTypeDto> AirConditioningType
    );

    public record InfoForSortingCar
    (
        IEnumerable<GearboxTypeDto> GearboxType,
        IEnumerable<EngineTypeDto> EngineType,
        IEnumerable<CarMakeDto> CarMakes,
        IEnumerable<CarTypeDto> CarType
    );
}
