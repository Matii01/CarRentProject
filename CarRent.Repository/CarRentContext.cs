using CarRent.data.Models;
using CarRent.data.Models.CarRent;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CarRent.Repository
{
    public class CarRentContext : DbContext
    {
        public CarRentContext(DbContextOptions options)
            : base(options)
        {

        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
        }

        public DbSet<Car> Cars { get; set; }
        public DbSet<CarMake> CarMakes { get; set; }
        public DbSet<CarType> CarsTypes { get; set; }
        public DbSet<EngineType> EngineTypes { get; set; }
        public DbSet<GearboxType> GearboxTypes { get; set; }
        public DbSet<KilometrLimit> KilometrLimits { get; set; }
        public DbSet<AirConditioningType> AirConditions { get; set; }
        public DbSet<CarDrive> CarDrives { get; set; }
    }
}
