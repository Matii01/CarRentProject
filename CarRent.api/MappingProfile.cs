using AutoMapper;
using CarRent.data.DTO;
using CarRent.data.Models;
using CarRent.data.Models.CarRent;
using CarRent.data.Models.CMS;
using CarRent.data.Models.User;
using CarRent.data.Models.Workers;

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


            CreateMap<KilometrLimit, KilometrLimitDto>();

            CreateMap<GearboxType, GearboxTypeDto>();
            CreateMap<GearboxTypeDto, GearboxType>()
                .ForMember(x => x.IsActive, opt => opt.MapFrom(x => true));

            CreateMap<AirConditioningType, AirConditioningTypeDto>();
            CreateMap<AirConditioningTypeDto, AirConditioningType>()
                .ForMember(x => x.IsActive, opt => opt.MapFrom(x => true));


            CreateMap<ClientDetails, ClientDetailsDto>();
            CreateMap<ClientDetailsDto, ClientDetails>()
                .ForMember(x => x.IsActive, opt => opt.MapFrom(x => true));

            CreateMap<CarMaintenance, CarMaintenanceDto>()
                .ForMember(x => x.WorkerId, opt => opt.MapFrom(x => x.UserId));

            CreateMap<CarMaintenanceDto, CarMaintenance>()
                .ForMember(x => x.UserId, opt => opt.MapFrom(x => x.WorkerId))
                .ForMember(x => x.IsActive, opt => opt.MapFrom(x => true));

            CreateMap<RentalStatus, RentalStatusDto>();
            CreateMap<RentalStatusDto, RentalStatus>()
                .ForMember(x => x.IsActive, opt => opt.MapFrom(x => true));

            CreateMap<InvoiceStatus, InvoiceStatusDto>();
            CreateMap<InvoiceStatusDto, InvoiceStatus>()
                .ForMember(x => x.IsActive, opt => opt.MapFrom(x => true));

            CreateMap<Address, AddressDto>();
            CreateMap<AddressDto, Address>()
                .ForMember(x => x.IsActive, opt => opt.MapFrom(x => true));

            CreateMap<UserAddress, UserAddressDto>();
            CreateMap<UserAddressDto, UserAddress>()
                .ForMember(x => x.IsActive, opt => opt.MapFrom(x => true));

            CreateMap<KilometrLimit, KilometrLimitDto>();
            CreateMap<KilometrLimitDto, KilometrLimit>()
                .ForMember(x => x.IsActive, opt => opt.MapFrom(x => true));

            CreateMap<HomePage, HomePageDto>();
            CreateMap<HomePageDto, HomePage>()
                 .ForMember(x => x.IsActive, opt => opt.MapFrom(x => true));

            CreateMap<ContactPage, ContactPageDto>();
            CreateMap<ContactPageDto, ContactPage>()
                 .ForMember(x => x.IsActive, opt => opt.MapFrom(x => true));

            CreateMap<WorkOrderStatus, WorkOrderStatusDto>();
            CreateMap<WorkOrderStatusDto, WorkOrderStatus>()
                 .ForMember(x => x.IsActive, opt => opt.MapFrom(x => true));

            CreateMap<WorkOrderPriority, WorkOrderPriorityDto>();
            CreateMap<WorkOrderPriorityDto, WorkOrderPriority>()
                 .ForMember(x => x.IsActive, opt => opt.MapFrom(x => true));

            /*
                CreateMap<Company, CompanyDto>()
                    .ForMember(c => c.FullAddress,
                        opt => opt.MapFrom(x => string.Join(' ', x.Address, x.Country)));
             */
        }
    }
}
