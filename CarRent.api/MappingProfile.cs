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
                .ForMember(x => x.CarImages, opt => opt.Ignore())
                .ForMember(x => x.IsVisible, opt => opt.MapFrom(x => false))
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

            CreateMap<CarEquipment, CarEquipmentDto>();
            CreateMap<CarEquipmentDto, CarEquipment>()
                .ForMember(x => x.IsActive, opt => opt.MapFrom(x => true));

            CreateMap<NewOpinionDto, CarOpinion>()
                .ForMember(x => x.AddedDate, opt => opt.MapFrom(x => DateTime.Now))
                .ForMember(x => x.IsAccepted, opt => opt.MapFrom(x => true))
                .ForMember(x => x.IsActive, opt => opt.MapFrom(x => true))
                .AfterMap((src, dest, context) => dest.UserId = context.Items["UserId"] as string ?? throw new Exception("UserId is required"));


            CreateMap<CarOpinion, OpinionForAdminViewDto>();

            CreateMap<Rental, UserRentalDetailDto>()
                .ForMember(x => x.Name, opt => opt.MapFrom(x => ""))
                .ForMember(x => x.CarName, opt => opt.MapFrom(x => x.Car.Name))
                .ForMember(x => x.CarImg, opt => opt.MapFrom(x => x.Car.CarImage))
                .ForMember(x => x.Vat, opt => opt.MapFrom(x => x.InvoiceItem.VAT))
                .ForMember(x => x.TotalPrice, opt => opt.MapFrom(x => x.InvoiceItem.Gross - x.InvoiceItem.Rabat))
                .ForMember(x => x.Status, opt => opt.MapFrom(x => x.RentalStatus == null ? "" : x.RentalStatus.Status));


            CreateMap<InvoiceWithClient, InvoiceWithIndividualClient>()
                .ConstructUsing(src => new InvoiceWithIndividualClient(
                    src.Id,
                    src.InvoiceStatusId,
                    src.Number,
                    src.Comment,
                    true,
                    src.TotalToPay,
                    src.TotalPay,
                    src.IsEditable,
                    src.CreatedDate,
                    src.PaymentDate,
                    src.Client as IndividualClient,
                    src.InvoiceItems
                ));


            CreateMap<FirmClient, FirmClientDto>();

            CreateMap<InvoiceWithClient, InvoiceWithFirmClient>()
               .ConstructUsing(src => new InvoiceWithFirmClient(
                   src.Id,
                   src.InvoiceStatusId,
                   src.Number,
                   src.Comment,
                   true,
                   src.TotalToPay,
                   src.TotalPay,
                   src.IsEditable,
                   src.InvoiceItems
               ));
        }
    }
}
