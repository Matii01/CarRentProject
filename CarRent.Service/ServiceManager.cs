using AutoMapper;
using CarRent.data.DTO;
using CarRent.data.Models.User;
using CarRent.Repository.Interfaces;
using CarRent.SendingEmail;
using CarRent.Service.Interfaces;
using CarRent.Service.Service;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Configuration;

namespace CarRent.Service
{
    public class ServiceManager : IServiceManager
    {
        public readonly Lazy<IGenerateDocumentService> _generateDocumentService;
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
        public readonly Lazy<ICarOpinionService> _carOpinionService;
        public readonly Lazy<IWorkOrderService> _workOrderService;
        public readonly Lazy<INotificationService> _notificationService;
        public readonly Lazy<IAboutCompanyService> _aboutCompanyService;
        public readonly Lazy<IApplicationSettingsService> _applicationSettingsService;
        public readonly Lazy<IUsersService> _usersService;
        public readonly Lazy<INewsletterService> _newsletterService;
        public readonly Lazy<ICarEquipmentService> _carEquipmentService;
        public readonly Lazy<IReportService> _reportService;
        public readonly Lazy<IMessagesService> _messagesService;

        public readonly Lazy<IGenericService<CarTypeDto>> _carTypeService;
        public readonly Lazy<IGenericService<CarDriveDto>> _carDriveService;
        public readonly Lazy<IGenericService<EngineTypeDto>> _engineTypeService;
        public readonly Lazy<IGenericService<AirConditioningTypeDto>> _airConditioningService;
        public readonly Lazy<IGenericService<KilometrLimitDto>> _kilometrLimitService;
        public readonly Lazy<IGenericService<GearboxTypeDto>> _gearboxTypeService;
        public readonly Lazy<IGenericService<RentalStatusDto>> _rentalStatusService;
        public readonly Lazy<IGenericService<InvoiceStatusDto>> _invoiceStatusService;
        public readonly Lazy<IGenericService<WorkOrderPriorityDto>> _workOrderPriorityService;
        public readonly Lazy<IGenericService<WorkOrderStatusDto>> _workOrderStatusService;
        


        public ServiceManager(UserManager<User> userManager, RoleManager<IdentityRole> roleManager, IRepositoryManager repositoryManager, IMapper mapper, IConfiguration configuration, IEmailSender emailSender)
        {
            _generateDocumentService = new Lazy<IGenerateDocumentService>(() =>
                new GenerateDocumentService());

            _carService = new Lazy<ICarService>(() =>
                new NewCarService(repositoryManager, mapper, RentalService, CarMaintenanceService, PriceListService));    

            _carMakeService = new Lazy<ICarMakeService>(() 
                => new CarMakeService(repositoryManager));
            
            _priceListService = new Lazy<IPriceListService>(() 
                => new NewPriceListService(repositoryManager, RabatService, mapper));

            _rabatService =new Lazy<IRabatService>(() =>
               new RabatService(repositoryManager, NotificationService, mapper));

            _rentalService = new Lazy<IRentalService>(()
                => new RentalService(repositoryManager, PriceListService,  mapper, NotificationService));

            _paymentService = new Lazy<IPaymentService>(() =>
                new PaymentService(repositoryManager, mapper, configuration, PriceListService, RentalService, emailSender, NotificationService));

            _workerSidebarService = new Lazy<IWorkerSidebarService>(() =>
                new WorkerSidebarService(repositoryManager, mapper));

            _carEquipmentService = new Lazy<ICarEquipmentService>(() =>
                new CarEquipmentService(repositoryManager, mapper));

            _carMaintenanceService = new Lazy<ICarMaintenanceService>(() =>
                new CarMaintenanceService(repositoryManager, RentalService, mapper));

            _userAddressService = new Lazy<IUserAddressService> (() =>
                new UserAddressService(repositoryManager, mapper));

            _contentManagementService = new Lazy<IContentManagementService>(
               () => new ContentManagementService(repositoryManager, mapper));

            _wishListService = new Lazy<IWishlistService>(
                () => new WishlistService(repositoryManager, mapper));

            _carOpinionService = new Lazy<ICarOpinionService>(() =>
                 new CarOpinionService(repositoryManager, mapper));

            _workOrderService = new Lazy<IWorkOrderService>(() =>
                 new WorkOrderService(userManager, repositoryManager, mapper));

            _notificationService = new Lazy<INotificationService>(() =>
                new NotificationService(repositoryManager, mapper, ApplicationSettingsService));

            _aboutCompanyService = new Lazy<IAboutCompanyService>(() =>
                new AboutCompanyService(repositoryManager, mapper));

            _reportService = new Lazy<IReportService>(() =>
                new ReportService(repositoryManager, mapper));

            _applicationSettingsService = new Lazy<IApplicationSettingsService>(() =>
               new ApplicationSettingsService(repositoryManager, mapper));
           
            _usersService = new Lazy<IUsersService>(() =>
                new UsersService(userManager, roleManager));

            _newsletterService = new Lazy<INewsletterService>(() =>
                new NewsletterService(repositoryManager, mapper, emailSender));

            _messagesService = new Lazy<IMessagesService>(() =>
                new MessagesService(repositoryManager, mapper, emailSender));

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

            _workOrderPriorityService = new Lazy<IGenericService<WorkOrderPriorityDto>>(()
                => new WorkOrderPriorityService(repositoryManager, mapper));

            _workOrderStatusService = new Lazy<IGenericService<WorkOrderStatusDto>>(()
                => new WorkOrderStatusService(repositoryManager, mapper));
        }
        public IGenerateDocumentService GenerateDocumentService => _generateDocumentService.Value;
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
        public ICarOpinionService CarOpinionService => _carOpinionService.Value;
        public IWorkOrderService WorkOrderService => _workOrderService.Value;
        public INotificationService NotificationService => _notificationService.Value;
        public IAboutCompanyService AboutCompanyService => _aboutCompanyService.Value;
        public IApplicationSettingsService ApplicationSettingsService => _applicationSettingsService.Value;
        public IUsersService UsersService  => _usersService.Value;
        public INewsletterService NewsletterService => _newsletterService.Value;
        public ICarEquipmentService CarEquipmentService => _carEquipmentService.Value;
        public IReportService ReportService => _reportService.Value;
        public IMessagesService MessagesService => _messagesService.Value;
        public IGenericService<CarTypeDto> CarTypeService => _carTypeService.Value;
        public IGenericService<CarDriveDto> CarDriveService => _carDriveService.Value;
        public IGenericService<EngineTypeDto> EngineTypeService => _engineTypeService.Value;
        public IGenericService<AirConditioningTypeDto> AirConditioningTypeService => _airConditioningService.Value;
        public IGenericService<KilometrLimitDto> KilometrLimitService => _kilometrLimitService.Value;
        public IGenericService<GearboxTypeDto> GearboxTypeService => _gearboxTypeService.Value;
        public IGenericService<RentalStatusDto> RentalStatusService => _rentalStatusService.Value;
        public IGenericService<InvoiceStatusDto> InvoiceStatusService => _invoiceStatusService.Value;
        public IGenericService<WorkOrderPriorityDto> WorkOrderPriorityService => _workOrderPriorityService.Value;
        public IGenericService<WorkOrderStatusDto> WorkOrderStatusService => _workOrderStatusService.Value;
    }
}
