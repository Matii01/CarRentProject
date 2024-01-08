using AutoMapper;
using CarRent.data.DTO;
using CarRent.data.Models.CarRent;
using CarRent.Repository.Interfaces;
using CarRent.SendingEmail;
using CarRent.Service.Interfaces;
using CarRent.Service.Service;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CarRent.Service
{
    public class ServiceManager : IServiceManager
    {
        public readonly Lazy<ICarService> _carService;
        public readonly Lazy<ICarMakeService> _carMakeService;
        public readonly Lazy<IPriceListService> _priceListService;
        public readonly Lazy<IRentalService> _rentalService;
        public readonly Lazy<IRabatService> _rabatService;
        public readonly Lazy<ICarMaintenanceService> _carMaintenanceService;
        public readonly Lazy<IUserAddressService> _userAddressService;
        public readonly Lazy<IPaymentService> _paymentService;
        public readonly Lazy<IWorkerSidebarService> _workerSidebarService;
        public readonly Lazy<IContentManagementService> _contentManagementService;
        public readonly Lazy<IWishlistService> _wishListService;

        public readonly Lazy<IGenericService<CarTypeDto>> _carTypeService;
        public readonly Lazy<IGenericService<CarDriveDto>> _carDriveService;
        public readonly Lazy<IGenericService<EngineTypeDto>> _engineTypeService;
        public readonly Lazy<IGenericService<AirConditioningTypeDto>> _airConditioningService;
        public readonly Lazy<IGenericService<KilometrLimitDto>> _kilometrLimitService;
        public readonly Lazy<IGenericService<GearboxTypeDto>> _gearboxTypeService;
        public readonly Lazy<IGenericService<RentalStatusDto>> _rentalStatusService;
        public readonly Lazy<IGenericService<InvoiceStatusDto>> _invoiceStatusService;
        


        public ServiceManager(IRepositoryManager repositoryManager, IMapper mapper, IConfiguration configuration, IEmailSender emailSender)
        {
            _carService = new Lazy<ICarService>(() =>
                new CarService(repositoryManager, mapper));    

            _carMakeService = new Lazy<ICarMakeService>(() 
                => new CarMakeService(repositoryManager));
            
            _priceListService = new Lazy<IPriceListService>(() 
                => new PriceListService(repositoryManager, RabatService, mapper));

            _rabatService =new Lazy<IRabatService>(() =>
               new RabatService(repositoryManager, mapper));

            _rentalService = new Lazy<IRentalService>(()
                => new RentalService(repositoryManager, PriceListService,  mapper));

            _paymentService = new Lazy<IPaymentService>(() =>
                new PaymentService(repositoryManager, mapper, configuration, PriceListService, RentalService, emailSender));

            _workerSidebarService = new Lazy<IWorkerSidebarService>(() =>
                new WorkerSidebarService(repositoryManager, mapper));

            _carMaintenanceService = new Lazy<ICarMaintenanceService>(() =>
                new CarMaintenanceService(repositoryManager, RentalService, mapper));

            _userAddressService = new Lazy<IUserAddressService> (() =>
                new UserAddressService(repositoryManager, mapper));

            _contentManagementService = new Lazy<IContentManagementService>(
               () => new ContentManagementService(repositoryManager, mapper));

            _wishListService = new Lazy<IWishlistService>(
                () => new WishlistService(repositoryManager, mapper));

            _carTypeService = new Lazy<IGenericService<CarTypeDto>>(()
                => new CarTypeService(repositoryManager));

            _carDriveService = new Lazy<IGenericService<CarDriveDto>>(()
               => new CarDriveService(repositoryManager, mapper));

            _engineTypeService = new Lazy<IGenericService<EngineTypeDto>>(() 
                => new EngineTypeService(repositoryManager, mapper));

            _airConditioningService = new Lazy<IGenericService<AirConditioningTypeDto>>(()
                => new AirConditioningTypeService(repositoryManager, mapper));

            _kilometrLimitService = new Lazy<IGenericService<KilometrLimitDto>>(()
                => new KilometrLimitService(repositoryManager, mapper));

            _gearboxTypeService = new Lazy<IGenericService<GearboxTypeDto>>(()
                => new GearboxTypeService(repositoryManager, mapper));

            _rentalStatusService = new Lazy<IGenericService<RentalStatusDto>>(()
                => new RentalStatusService(repositoryManager, mapper));
            
            _invoiceStatusService = new Lazy<IGenericService<InvoiceStatusDto>>(()
                => new InvoiceStatusService(repositoryManager, mapper));
        }

        public ICarService CarService => _carService.Value;
        public ICarMakeService CarMakeService => _carMakeService.Value;
        public IPriceListService PriceListService => _priceListService.Value;
        public IRentalService RentalService => _rentalService.Value;    
        public IRabatService RabatService => _rabatService.Value;
        public ICarMaintenanceService CarMaintenanceService => _carMaintenanceService.Value;
        public IUserAddressService UserAddressService => _userAddressService.Value;
        public IPaymentService PaymentService => _paymentService.Value;
        public IWorkerSidebarService WorkerSidebar => _workerSidebarService.Value;
        public IContentManagementService ContentManagementService => _contentManagementService.Value;
        public IWishlistService WishlistService => _wishListService.Value;
        public IGenericService<CarTypeDto> CarTypeService => _carTypeService.Value;
        public IGenericService<CarDriveDto> CarDriveService => _carDriveService.Value;
        public IGenericService<EngineTypeDto> EngineTypeService => _engineTypeService.Value;
        public IGenericService<AirConditioningTypeDto> AirConditioningTypeService => _airConditioningService.Value;
        public IGenericService<KilometrLimitDto> KilometrLimitService => _kilometrLimitService.Value;
        public IGenericService<GearboxTypeDto> GearboxTypeService => _gearboxTypeService.Value;
        public IGenericService<RentalStatusDto> RentalStatusService => _rentalStatusService.Value;
        public IGenericService<InvoiceStatusDto> InvoiceStatusService => _invoiceStatusService.Value;
    }
}
