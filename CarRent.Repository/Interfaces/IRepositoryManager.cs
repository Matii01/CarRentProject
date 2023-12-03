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

        // CarMaintenances
        IGenericRepository<CarMaintenance> CarMaintenances {  get; }

        // Rental 
        IRentalRepository Rentals { get; }
        IGenericRepository<ClientDetails> ClientDetails { get; }
        IGenericRepository<Invoice> Invoice { get; }
        IGenericRepository<InvoiceItem> InvoiceItem { get; }
        IGenericRepository<InvoiceClient> InvoiceClient { get; }
        IGenericRepository<UserRental> UserRental { get; }
        IGenericRepository<RentalStatus> RentalStatus {  get; }

        // Rabat 
        IGenericRepository<Rabat> Rabat { get; }
        IGenericRepository<RabatForUser> RabatForUser { get; }

        Task SaveAsync();
    }
}
