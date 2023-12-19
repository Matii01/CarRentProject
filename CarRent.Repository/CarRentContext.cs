using CarRent.data.Models;
using CarRent.data.Models.CarRent;
using CarRent.data.Models.User;
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
            modelBuilder.ApplyConfiguration(new RoleConfiguration());

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

        //CarMaintenance
        public DbSet<CarMaintenance> CarMaintenances { get; set; }

        //Rentals
        public DbSet<Rental> Rentals { get; set; }
        public DbSet<UserRental> UserRentals { get; set; }
        public DbSet<RentalStatus> RentalStatuses { get; set; }
        public DbSet<Invoice> Invoices { get; set; }
        //public DbSet<InvoiceClient> InvoiceClients { get; set; }
        //public DbSet<InvoiceCompanyClient> InvoiceCompanyClients { get; set; }
        //public DbSet<CompanyClientDetails> CompanyClientsDetails { get; set;}
        //public DbSet<ClientDetails> ClientDetails { get; set; }
        public DbSet<InvoiceItem> InvoicesItems { get; set; }
        public DbSet<FirmClient> FirmClients { get; set; }
        public DbSet<IndividualClient> IndividualClients { get; set; }
        public DbSet<UserInvoice> UserInvoices { get; set; }

        // Rabat
        public DbSet<Rabat> Rabats { get; set; }
        public DbSet<RabatForUser> RabatForUsers { get; set; }

        // User
        public DbSet<Address> Addresses { get; set; }
        public DbSet<UserAddress> UserAddresses { get; set; }

    }
}
