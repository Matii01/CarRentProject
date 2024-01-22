using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CarRent.data.DTO
{
    public record CarListDtoForClient(int Id, string Name, string Make, string PictureUrl, string Engine, string Gearbox, string Ac, double Acceleration, double Horsepower)
    {
        public decimal Price { get; set; }
    }

    public record CarListForRecommended(int CarId, string Name,  string PictureUrl)
    {
        public decimal Price { get; set; }
    }

    public record CarDetailsDtoForClient(int Id, string Name, string Description, string Make, string PictureUrl, string Engine, string Gearbox, string Ac, decimal Price);

    public record CarListDto(int Id, string Name, string Make,string Engine, string Gearbox, string Ac, decimal Price);

    public record NewCarDto(
        string Name,
        int CarMakeId,
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
        int CarTypeId,
        int EngineTypeId,
        int KilometrLimitId,
        int AirConditioningTypeId,
        int GearBoxTypeId,
        int CarDriveId,
        bool? IsVisible
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

    public record CarDetailsPage(
        int Id, string Name, string Description, string Make, string PictureUrl, string Engine, string Gearbox, string Ac, decimal Price)
    {
        public IEnumerable<RentalDatesDto> ExcludedDates { get; set; }
    }

    public record CarForWishlistDto(
        int Id,
        string Name,
        string PictureUrl
    );

}
