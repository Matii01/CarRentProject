﻿// <auto-generated />
using CarRent.data.Repository;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

#nullable disable

namespace CarRent.data.Migrations
{
    [DbContext(typeof(CarRentContext))]
    [Migration("20231001102913_Add-CarDrive")]
    partial class AddCarDrive
    {
        /// <inheritdoc />
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "7.0.11")
                .HasAnnotation("Relational:MaxIdentifierLength", 128);

            SqlServerModelBuilderExtensions.UseIdentityColumns(modelBuilder);

            modelBuilder.Entity("CarRent.data.Models.Car", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<double>("Acceleration0to100")
                        .HasColumnType("float");

                    b.Property<int>("AirConditioningTypeId")
                        .HasColumnType("int");

                    b.Property<double>("AverageCombustion")
                        .HasPrecision(18, 2)
                        .HasColumnType("float(18)");

                    b.Property<int>("CarDriveId")
                        .HasColumnType("int");

                    b.Property<string>("CarMake")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<double>("CarMileage")
                        .HasPrecision(18, 2)
                        .HasColumnType("float(18)");

                    b.Property<string>("CarModel")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("CarTypeId")
                        .HasColumnType("int");

                    b.Property<string>("Description")
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("EngineTypeId")
                        .HasColumnType("int");

                    b.Property<int>("GearBoxTypeId")
                        .HasColumnType("int");

                    b.Property<double>("Horsepower")
                        .HasColumnType("float");

                    b.Property<bool>("IsActive")
                        .HasColumnType("bit");

                    b.Property<int>("KilometrLimitId")
                        .HasColumnType("int");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("NumberOfDoors")
                        .HasColumnType("int");

                    b.Property<int>("NumberOfSeats")
                        .HasColumnType("int");

                    b.Property<decimal>("OverlimitFee")
                        .HasPrecision(18, 2)
                        .HasColumnType("decimal(18,2)");

                    b.Property<double>("TrunkCapacity")
                        .HasPrecision(18, 2)
                        .HasColumnType("float(18)");

                    b.Property<int>("YearOfProduction")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("AirConditioningTypeId");

                    b.HasIndex("CarDriveId");

                    b.HasIndex("CarTypeId");

                    b.HasIndex("EngineTypeId");

                    b.HasIndex("GearBoxTypeId");

                    b.HasIndex("KilometrLimitId");

                    b.ToTable("Cars");
                });

            modelBuilder.Entity("CarRent.data.Models.CarRent.AirConditioningType", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<bool>("IsActive")
                        .HasColumnType("bit");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasMaxLength(64)
                        .HasColumnType("nvarchar(64)");

                    b.HasKey("Id");

                    b.ToTable("AirConditions");
                });

            modelBuilder.Entity("CarRent.data.Models.CarRent.CarDrive", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<bool>("IsActive")
                        .HasColumnType("bit");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.ToTable("CarDrives");
                });

            modelBuilder.Entity("CarRent.data.Models.CarRent.CarType", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<bool>("IsActive")
                        .HasColumnType("bit");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasMaxLength(32)
                        .HasColumnType("nvarchar(32)");

                    b.HasKey("Id");

                    b.ToTable("CarsTypes");
                });

            modelBuilder.Entity("CarRent.data.Models.CarRent.EngineType", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<bool>("IsActive")
                        .HasColumnType("bit");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasMaxLength(32)
                        .HasColumnType("nvarchar(32)");

                    b.HasKey("Id");

                    b.ToTable("EngineTypes");
                });

            modelBuilder.Entity("CarRent.data.Models.CarRent.GearboxType", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<bool>("IsActive")
                        .HasColumnType("bit");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasMaxLength(64)
                        .HasColumnType("nvarchar(64)");

                    b.HasKey("Id");

                    b.ToTable("GearboxTypes");
                });

            modelBuilder.Entity("CarRent.data.Models.CarRent.KilometrLimit", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<decimal>("LimitValue")
                        .HasMaxLength(64)
                        .HasPrecision(18, 2)
                        .HasColumnType("decimal(18,2)");

                    b.HasKey("Id");

                    b.ToTable("KilometrLimits");
                });

            modelBuilder.Entity("CarRent.data.Models.Car", b =>
                {
                    b.HasOne("CarRent.data.Models.CarRent.AirConditioningType", "AirConditioningType")
                        .WithMany()
                        .HasForeignKey("AirConditioningTypeId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("CarRent.data.Models.CarRent.CarDrive", "CarDrive")
                        .WithMany()
                        .HasForeignKey("CarDriveId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("CarRent.data.Models.CarRent.CarType", "CarType")
                        .WithMany()
                        .HasForeignKey("CarTypeId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("CarRent.data.Models.CarRent.EngineType", "EngineType")
                        .WithMany()
                        .HasForeignKey("EngineTypeId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("CarRent.data.Models.CarRent.GearboxType", "GearBoxType")
                        .WithMany()
                        .HasForeignKey("GearBoxTypeId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("CarRent.data.Models.CarRent.KilometrLimit", "KilometrLimit")
                        .WithMany()
                        .HasForeignKey("KilometrLimitId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("AirConditioningType");

                    b.Navigation("CarDrive");

                    b.Navigation("CarType");

                    b.Navigation("EngineType");

                    b.Navigation("GearBoxType");

                    b.Navigation("KilometrLimit");
                });
#pragma warning restore 612, 618
        }
    }
}
