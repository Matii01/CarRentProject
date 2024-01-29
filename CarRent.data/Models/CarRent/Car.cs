using CarRent.data.Models.CarRent;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CarRent.data.Models
{
    public class Car : BaseModel
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public string Name { get; set; } = null!;
        public int CarMakeId { get; set; }
        public CarMake CarMake { get; set; } = null!;
        public string CarModel { get; set; } = null!;
        public string? Description {  get; set; }

        public string? CarImage { get; set; }

        [Precision(18, 2)]
        [Range(0, int.MaxValue)]
        public double CarMileage { get; set; }  // przebieg samochodu 
        public double Horsepower { get; set; } // moc 
        public double Acceleration0to100 {  get; set; } // 0 - 100 

        [Required]
        [Range(0, int.MaxValue)]
        public int NumberOfSeats { get; set; }

        [Range(0, int.MaxValue)]
        public int NumberOfDoors { get; set; }

        [Range(0, int.MaxValue)]
        public int YearOfProduction { get; set; }

        [Precision(18, 2)]
        public decimal OverlimitFee {  get; set; }

        [Precision(18, 2)]
        [Range(0, double.MaxValue)]
        public double AverageCombustion { get; set; }  // średnie spalanie 

        [Precision(18, 2)]
        [Range(0, double.MaxValue)]
        public double TrunkCapacity {  get; set; } // Pojemność bagażnika 

        public int CarTypeId { get; set; }
        public CarType CarType { get; set; } = null!;
        
        public int EngineTypeId { get; set; } 
        public EngineType EngineType {  get; set; } = null!;

        public int KilometrLimitId { get; set; }
        public KilometrLimit KilometrLimit { get; set; } = null!;

        public int AirConditioningTypeId {  get; set; }
        public AirConditioningType AirConditioningType { get; set; } = null!;

        public int GearBoxTypeId {  get; set; }
        public GearboxType GearBoxType { get; set; } = null!;

        public int CarDriveId { get; set; }
        public CarDrive CarDrive { get; set; } = null!;
        public IEnumerable<CarImages>? CarImages { get; set; }

        public bool? IsVisible { get; set; }

    }
}
