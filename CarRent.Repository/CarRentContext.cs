using CarRent.data.Models;
using CarRent.data.Models.CarRent;
using CarRent.data.Models.CMS;
using CarRent.data.Models.Company;
using CarRent.data.Models.User;
using CarRent.data.Models.Workers;
using CarRent.Repository.Configuration;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CarRent.Repository
{
    public class CarRentContext : IdentityDbContext<User>
    {
        public CarRentContext(DbContextOptions options)
            : base(options)
        {

        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            //modelBuilder.ApplyConfiguration(new RoleConfiguration());

            modelBuilder.Entity<Rental>()
                .HasOne(x => x.InvoiceItem)
                .WithOne(i => i.Rental)
                .HasForeignKey<InvoiceItem>(i => i.RentalId);
            //                .OnDelete(DeleteBehavior.NoAction);

            modelBuilder.Entity<Invoice>()
                .HasMany(e => e.InvoicesItems)
                .WithOne(e => e.Invoice)
                .HasForeignKey(e => e.InvoiceId)
                .HasPrincipalKey(e => e.Id);

        }

        public DbSet<Car> Cars { get; set; }
        public DbSet<CarMake> CarMakes { get; set; }
        public DbSet<CarType> CarsTypes { get; set; }
        public DbSet<EngineType> EngineTypes { get; set; }
        public DbSet<GearboxType> GearboxTypes { get; set; }
        public DbSet<KilometrLimit> KilometrLimits { get; set; }
        public DbSet<AirConditioningType> AirConditions { get; set; }
        public DbSet<CarDrive> CarDrives { get; set; }
        public DbSet<PriceList> PricesList { get; set; }
        public DbSet<PricelistItem> PricelistItems { get; set; }
        public DbSet<PricelistDate> PricelistDates { get; set; }
        public DbSet<CarOpinion> CarOpinions { get; set; }
        public DbSet<CarImages> CarImages { get; set; }

        //CarMaintenance
        public DbSet<CarMaintenance> CarMaintenances { get; set; }
        public DbSet<RecommendedCars> RecommendedCars { get; set; }

        //Rentals
        public DbSet<Rental> Rentals { get; set; }
        public DbSet<UserRental> UserRentals { get; set; }
        public DbSet<RentalStatus> RentalStatuses { get; set; }
        public DbSet<Invoice> Invoices { get; set; }
        public DbSet<InvoiceStatus> InvoicesStatus { get; set; }
        //public DbSet<InvoiceClient> InvoiceClients { get; set; }
        //public DbSet<InvoiceCompanyClient> InvoiceCompanyClients { get; set; }
        //public DbSet<CompanyClientDetails> CompanyClientsDetails { get; set;}
        //public DbSet<ClientDetails> ClientDetails { get; set; }
        public DbSet<InvoiceItem> InvoicesItems { get; set; }
        public DbSet<FirmClient> FirmClients { get; set; }
        public DbSet<IndividualClient> IndividualClients { get; set; }
        public DbSet<UserInvoice> UserInvoices { get; set; }
        public DbSet<DataForRental> DataForRentals { get; set; }

        // Rabat
        public DbSet<Rabat> Rabats { get; set; }
        public DbSet<RabatForUser> RabatForUsers { get; set; }

        // User
        public DbSet<Address> Addresses { get; set; }
        public DbSet<UserAddress> UserAddresses { get; set; }
        public DbSet<Wishlist> Wishlist { get; set; }
        public DbSet<Notification> Notification { get; set; }

        //Sidebar 
        public DbSet<PathItem> PathItems { get; set; }
        public DbSet<UserWorkerPaths> UserWorkerPaths { get; set; }
        public DbSet<WorkerPaths> WorkerPaths { get; set; }

        // CMS 
        public DbSet<HomePage> HomePage { get; set; }
        public DbSet<ContactPage> ContactPage { get; set; }
        public DbSet<Footer> Footer { get; set; }
        public DbSet<FooterLinks> FooterLinks { get; set; }
        public DbSet<FooterLinksPaths> FooterLinksPaths { get; set; }
        public DbSet<AboutCompany> AboutCompany { get; set; }
        public DbSet<ApplicationSettings> ApplicationSettings { get; set; }

        //WorkOrder
        public DbSet<WorkOrder> WorkOrder { get; set; }
        public DbSet<WorkOrderStatus> WorkOrderStatus { get; set; }
        public DbSet<WorkOrderPriority> WorkOrderPriority { get; set; }
        public DbSet<WorkOrderWorker> WorkOrderWorker { get; set; }
       
        public DbSet<NewsletterSubscriber> NewsletterSubscriber { get; set; }
        public DbSet<SendHistory> SendHistory { get; set; }

    }
}
