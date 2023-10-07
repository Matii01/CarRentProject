using AutoMapper;
using CarRent.data.DTO;
using CarRent.data.Models.CarRent;

namespace CarRent.api
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<CarMake, CarMakeDto>();
            CreateMap<CarType, CarTypeDto>();
            CreateMap<EngineType, EngineTypeDto>();
            CreateMap<GearboxType, GearboxTypeDto>();
            CreateMap<KilometrLimit, KilometrLimitDto>();
            CreateMap<CarDrive,  CarDriveDto>();
            CreateMap<AirConditioningType, AirConditioningTypeDto>();
            /*
                CreateMap<Company, CompanyDto>()
                    .ForMember(c => c.FullAddress,
                        opt => opt.MapFrom(x => string.Join(' ', x.Address, x.Country)));
             */
        }
    }
}
