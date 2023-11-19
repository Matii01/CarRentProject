using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using CarRent.data.Models.CarRent;

namespace CarRent.Repository.Interfaces
{
    public interface IRepositoryManager
    {
        ICarRepository Car { get; }
        IPriceListRepository PriceList { get; }
        IGenericRepository<AirConditioningType> AirConditioningType { get; }
        IGenericRepository<CarDrive> CarDrive { get; }
        IGenericRepository<CarMake> CarMake { get; }
        IGenericRepository<CarType> CarType { get; }
        IGenericRepository<EngineType> EngineType { get; }
        IGenericRepository<GearboxType> GearboxType { get; }
        IGenericRepository<KilometrLimit> KilometrLimit { get; }
        IGenericRepository<PricelistItem> PricelistItem {  get; }
        IGenericRepository<PricelistDate> PricelistDate { get; }

        // Rental 
        IGenericRepository<Rental> Rental { get; }

        Task SaveAsync();
    }
}
