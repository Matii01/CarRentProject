﻿using CarRent.data.Models;
using CarRent.data.Models.CarRent;
using CarRent.data.Models.CMS;
using CarRent.data.Models.Company;
using CarRent.data.Models.User;
using CarRent.data.Models.Workers;

namespace CarRent.Repository.Interfaces
{
    public interface IRepositoryManager
    {
        CarRentContext Context {  get; }

        IGenericRepository<Car> NewCar {  get; }
        IGenericRepository<PriceList> NewPriceList { get; }

        IGenericRepository<AirConditioningType> AirConditioningType { get; }
        IGenericRepository<CarDrive> CarDrive { get; }
        IGenericRepository<CarMake> CarMake { get; }
        IGenericRepository<CarType> CarType { get; }
        IGenericRepository<EngineType> EngineType { get; }
        IGenericRepository<GearboxType> GearboxType { get; }
        IGenericRepository<KilometrLimit> KilometrLimit { get; }
        IGenericRepository<PricelistItem> PricelistItem { get; }
        IGenericRepository<PricelistDate> PricelistDate { get; }
        IGenericRepository<CarOpinion> CarOpinion { get; }
        IGenericRepository<RecommendedCars> RecommendedCars { get; }
        IGenericRepository<CarImages> CarImages { get; }
        IGenericRepository<CarEquipment> CarEquipment { get; }
        IGenericRepository<CarEquipmentCar> CarEquipmentCar { get; }
        
        // CarMaintenances
        IGenericRepository<CarMaintenance> CarMaintenances { get; }

        // Rental 
        IRentalRepository Rentals { get; }
        IGenericRepository<ClientDetails> ClientDetails { get; }
        IGenericRepository<Invoice> Invoice { get; }
        IGenericRepository<InvoiceItem> InvoiceItem { get; }
        IGenericRepository<InvoiceClient> InvoiceClient { get; }
        IGenericRepository<UserRental> UserRental { get; }
        IGenericRepository<RentalStatus> RentalStatus { get; }
        IGenericRepository<UserInvoice> UserInvoice { get; }
        IGenericRepository<DataForRental> DataForRental { get; }
        IGenericRepository<InvoiceStatus> InvoiceStatus {get;}

        // Rabat 
        IGenericRepository<Rabat> Rabat { get; }
        IGenericRepository<RabatForUser> RabatForUser { get; }

        // UserAddress
        IGenericRepository<Address> Address { get; }
        IGenericRepository<UserAddress> UserAddress { get; }
        IGenericRepository<Wishlist> Wishlist { get; }
        IGenericRepository<Notification> Notification { get; }

        // Sidebar 
        IGenericRepository<UserWorkerPaths> UserWorkerPaths { get; }
        IGenericRepository<WorkerPaths> WorkerPaths { get; }
        IGenericRepository<PathItem> PathItem { get; }

        // CMS 
        IGenericRepository<HomePage> HomePage {get; }
        IGenericRepository<ContactPage> ContactPage {get; }
        IGenericRepository<Footer> Footer { get; }
        IGenericRepository<FooterLinks> FooterLinks { get; }
        IGenericRepository<FooterLinksPaths> FooterLinksPaths { get; }

        //WorkOrder 
        IGenericRepository<WorkOrder> WorkOrder { get; }
        IGenericRepository<WorkOrderStatus> WorkOrderStatus { get; }
        IGenericRepository<WorkOrderPriority> WorkOrderPriority { get; }
        IGenericRepository<WorkOrderWorker> WorkOrderWorker { get; }
        IGenericRepository<AboutCompany> AboutCompany { get; }
        IGenericRepository<ApplicationSettings> ApplicationSettings { get; }

        // newsletter
        IGenericRepository<NewsletterSubscriber> NewsletterSubscriber { get; }
        IGenericRepository<SendHistory> SendHistory { get; }

        IGenericRepository<Message> Message { get; }


        Task SaveAsync();
    }
}
