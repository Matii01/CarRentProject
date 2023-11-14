﻿using AutoMapper;
using CarRent.data.DTO;
using CarRent.data.Models;
using CarRent.data.Models.CarRent;

namespace CarRent.api
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<Car, NewCarDto>();
            CreateMap<NewCarDto, Car>()
                .ForMember(x => x.IsActive, opt => opt.MapFrom(x => true));

            CreateMap<Car,CarDto>()
                .ForMember(x => x.CarMake, opt => opt.MapFrom(c => c.CarMake.Name))
                .ForMember(x => x.CarType, opt => opt.MapFrom(c => c.CarType.Name))
                .ForMember(x => x.EngineType, opt => opt.MapFrom(c => c.EngineType.Name))
                .ForMember(x => x.KilometrLimit, opt => opt.MapFrom(c => c.KilometrLimit.LimitValue))
                .ForMember(x => x.AirConditioningType, opt => opt.MapFrom(c => c.AirConditioningType.Name))
                .ForMember(x => x.GearBoxType, opt => opt.MapFrom(c => c.GearBoxType.Name))
                .ForMember(x => x.CarDrive, opt => opt.MapFrom(c => c.CarDrive.Name));


            CreateMap<CarMake, CarMakeDto>();
            CreateMap<CarType, CarTypeDto>();
            
            CreateMap<EngineType, EngineTypeDto>();
            CreateMap<EngineTypeDto, EngineType>().
                ForMember(x => x.IsActive, opt => opt.MapFrom(x => true));

            CreateMap<CarDrive,  CarDriveDto>();
            CreateMap<CarDriveDto, CarDrive>()
                .ForMember(x => x.IsActive, opt => opt.MapFrom(x => true));


            CreateMap<GearboxType, GearboxTypeDto>();
            CreateMap<KilometrLimit, KilometrLimitDto>();
            CreateMap<AirConditioningType, AirConditioningTypeDto>();
            /*
                CreateMap<Company, CompanyDto>()
                    .ForMember(c => c.FullAddress,
                        opt => opt.MapFrom(x => string.Join(' ', x.Address, x.Country)));
             */
        }
    }
}
