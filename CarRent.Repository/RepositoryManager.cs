using CarRent.data.Models.CarRent;
using CarRent.data.Models.CMS;
using CarRent.data.Models.Company;
using CarRent.data.Models.User;
using CarRent.data.Models.Workers;
using CarRent.Repository.Interfaces;
using CarRent.Repository.Repositories;
using System;

namespace CarRent.Repository
{
    public class RepositoryManager : IRepositoryManager
    {
        private readonly CarRentContext _context;

        private readonly Lazy<ICarRepository> _carRepository;
        private readonly Lazy<IPriceListRepository> _priceListRepository;
        private readonly Lazy<IGenericRepository<CarMake>> _carMakeRepository;
        private readonly Lazy<IGenericRepository<CarType>> _carTypeRepository;
        private readonly Lazy<IGenericRepository<AirConditioningType>> _airConditioningTypeRepository;
        private readonly Lazy<IGenericRepository<EngineType>> _engineTypeRepository;
        private readonly Lazy<IGenericRepository<CarDrive>> _carDriveRepository;
        private readonly Lazy<IGenericRepository<GearboxType>> _gearboxTypeRepository;
        private readonly Lazy<IGenericRepository<KilometrLimit>> _kilometrLimitRepository;
        private readonly Lazy<IGenericRepository<PricelistItem>> _priceListItemRepository;
        private readonly Lazy<IGenericRepository<PricelistDate>> _pricelistDateRepository;
        private readonly Lazy<IGenericRepository<CarOpinion>> _carOpinionRepository;
        private readonly Lazy<IGenericRepository<CarImages>> _carImagesRepository;

        //CarMaintenances
        private readonly Lazy<IGenericRepository<CarMaintenance>> _carMaintenancesRepository;
        private readonly Lazy<IGenericRepository<RecommendedCars>> _recommendedCarsRepository;
        

        // Rental 
        private readonly Lazy<IRentalRepository> _rentalRepository;
        private readonly Lazy<IGenericRepository<ClientDetails>> _clientDetailsRepository;
        private readonly Lazy<IGenericRepository<Invoice>> _invoiceRepository;
        private readonly Lazy<IGenericRepository<InvoiceItem>> _invoiceItemRepository;
        private readonly Lazy<IGenericRepository<InvoiceClient>> _invoiceClientRepository;
        private readonly Lazy<IGenericRepository<UserRental>> _userRentalRepository;
        private readonly Lazy<IGenericRepository<RentalStatus>> _rentalStatusRepository;
        private readonly Lazy<IGenericRepository<InvoiceStatus>> _invoiceStatusRepository;

        private readonly Lazy<IGenericRepository<UserInvoice>> _userInvoiceRepository;
        private readonly Lazy<IGenericRepository<IndividualClient>> _individualClientRepository;
        private readonly Lazy<IGenericRepository<FirmClient>> _firmClientRepository;
        private readonly Lazy<IGenericRepository<DataForRental>> _dataForRentalRepository;

        //Rabat 
        private readonly Lazy<IGenericRepository<Rabat>> _rabatRepository;
        private readonly Lazy<IGenericRepository<RabatForUser>> _rabatForUserRepository;

        // User address
        private readonly Lazy<IGenericRepository<Address>> _addressRepository;
        private readonly Lazy<IGenericRepository<UserAddress>> _userAddressRepository;
        private readonly Lazy<IGenericRepository<Wishlist>> _wishListRepository;
        private readonly Lazy<IGenericRepository<Notification>> _notificationRepository;

        // Sidebar 
        private readonly Lazy<IGenericRepository<WorkerPaths>> _workerPathRepository;
        private readonly Lazy<IGenericRepository<PathItem>> _pathItemRepository;
        private readonly Lazy<IGenericRepository<UserWorkerPaths>> _userWorkerPathRepository;

        // CMS
        private readonly Lazy<IGenericRepository<HomePage>> _homePageRepository;
        private readonly Lazy<IGenericRepository<ContactPage>> _contactPageRepository;
        private readonly Lazy<IGenericRepository<Footer>> _footerRepository;
        private readonly Lazy<IGenericRepository<FooterLinks>> _footerLinksRepository;
        private readonly Lazy<IGenericRepository<FooterLinksPaths>> _footerLinksPathsRepository;
        private readonly Lazy<IGenericRepository<AboutCompany>> _aboutCompanyRepository;
        private readonly Lazy<IGenericRepository<ApplicationSettings>> _applicationSettingsRepository;

        // WorkOrder
        private readonly Lazy<IGenericRepository<WorkOrder>> _workOrderRepository;
        private readonly Lazy<IGenericRepository<WorkOrderStatus>> _workOrderStatusRepository;
        private readonly Lazy<IGenericRepository<WorkOrderPriority>> _workOrderPriorityRepository;
        private readonly Lazy<IGenericRepository<WorkOrderWorker>> _workOrderWorkerRepository;

        private readonly Lazy<IGenericRepository<NewsletterSubscriber>> _newsletterSubscriberRepository;
        private readonly Lazy<IGenericRepository<SendHistory>> _sendHistoryRepository;

        public RepositoryManager(CarRentContext context)
        {
            _context = context;

            _carRepository = new Lazy<ICarRepository>(() =>
                new CarRepository(_context, PriceList));
            _priceListRepository = new Lazy<IPriceListRepository>(() =>
                new PriceListRepository(_context));

            _carMakeRepository = new Lazy<IGenericRepository<CarMake>>(() =>
                new GenericRepository<CarMake>(_context));

            _carTypeRepository = new Lazy<IGenericRepository<CarType>>(() =>
                new GenericRepository<CarType>(_context));

            _recommendedCarsRepository = new Lazy<IGenericRepository<RecommendedCars>>(()=> 
                new GenericRepository<RecommendedCars>(_context));

            _airConditioningTypeRepository = new Lazy<IGenericRepository<AirConditioningType>>(() =>
                new GenericRepository<AirConditioningType>(_context));

            _engineTypeRepository = new Lazy<IGenericRepository<EngineType>>(() =>
                new GenericRepository<EngineType>(_context));

            _carDriveRepository = new Lazy<IGenericRepository<CarDrive>>(() =>
                new GenericRepository<CarDrive>(_context));

            _gearboxTypeRepository = new Lazy<IGenericRepository<GearboxType>>(() =>
                new GenericRepository<GearboxType>(_context));

            _kilometrLimitRepository = new Lazy<IGenericRepository<KilometrLimit>>(() =>
                new GenericRepository<KilometrLimit>(_context));

            _priceListItemRepository = new Lazy<IGenericRepository<PricelistItem>>(() =>
                new GenericRepository<PricelistItem>(_context));

            _pricelistDateRepository = new Lazy<IGenericRepository<PricelistDate>>(() =>
                new GenericRepository<PricelistDate>(_context));

            _carOpinionRepository = new Lazy<IGenericRepository<CarOpinion>>(() =>
                new GenericRepository<CarOpinion>(_context));

            _carImagesRepository = new Lazy<IGenericRepository<CarImages>>(() => 
                new GenericRepository<CarImages>(_context));

            _rentalRepository = new Lazy<IRentalRepository>(() =>
                new RentalRepository(_context));

            _clientDetailsRepository = new Lazy<IGenericRepository<ClientDetails>>(() =>
                new GenericRepository<ClientDetails>(_context));

            _invoiceClientRepository = new Lazy<IGenericRepository<InvoiceClient>>(() =>
                new GenericRepository<InvoiceClient>(_context));

            _invoiceItemRepository = new Lazy<IGenericRepository<InvoiceItem>>(() =>
                new GenericRepository<InvoiceItem>(_context));

            _invoiceRepository = new Lazy<IGenericRepository<Invoice>>(() =>
                new GenericRepository<Invoice>(_context));

            _invoiceStatusRepository = new Lazy<IGenericRepository<InvoiceStatus>>(() =>
                new GenericRepository<InvoiceStatus>(_context));

            _userRentalRepository = new Lazy<IGenericRepository<UserRental>>(() =>
               new GenericRepository<UserRental>(_context));

            _rentalStatusRepository = new Lazy<IGenericRepository<RentalStatus>>(() =>
                new GenericRepository<RentalStatus>(_context));

            _rabatRepository = new Lazy<IGenericRepository<Rabat>>(() =>
                new GenericRepository<Rabat>(_context));

            _rabatForUserRepository = new Lazy<IGenericRepository<RabatForUser>>(() =>
                new GenericRepository<RabatForUser>(_context));

            _carMaintenancesRepository = new Lazy<IGenericRepository<CarMaintenance>>(() =>
                new GenericRepository<CarMaintenance>(_context));

            _firmClientRepository = new Lazy<IGenericRepository<FirmClient>>(() =>
                new GenericRepository<FirmClient>(_context));

            _individualClientRepository = new Lazy<IGenericRepository<IndividualClient>>(() =>
                new GenericRepository<IndividualClient>(_context));

            _userInvoiceRepository = new Lazy<IGenericRepository<UserInvoice>>(() =>
                new GenericRepository<UserInvoice>(_context));

            _addressRepository = new Lazy<IGenericRepository<Address>>(() =>
                new GenericRepository<Address>(_context));

            _userAddressRepository = new Lazy<IGenericRepository<UserAddress>>(() =>
                new GenericRepository<UserAddress>(_context));

            _notificationRepository = new Lazy<IGenericRepository<Notification>>(() =>
                new GenericRepository<Notification>(_context));

            _wishListRepository = new Lazy<IGenericRepository<Wishlist>>(() =>
                new GenericRepository<Wishlist>(_context));

            _dataForRentalRepository = new Lazy<IGenericRepository<DataForRental>>(() =>
                new GenericRepository<DataForRental>(_context));

            _workerPathRepository = new Lazy<IGenericRepository<WorkerPaths>>(() =>
                new GenericRepository<WorkerPaths>(_context));

            _pathItemRepository = new Lazy<IGenericRepository<PathItem>>(() =>
                new GenericRepository<PathItem>(_context));

            _userWorkerPathRepository = new Lazy<IGenericRepository<UserWorkerPaths>>(() =>
                new GenericRepository<UserWorkerPaths>(_context));
            
            _homePageRepository = new Lazy<IGenericRepository<HomePage>>(() =>
                new GenericRepository<HomePage>(_context));

            _contactPageRepository = new Lazy<IGenericRepository<ContactPage>>(() =>
                new GenericRepository<ContactPage>(_context));

            _footerRepository = new Lazy<IGenericRepository<Footer>>(() =>
                new GenericRepository<Footer>(_context));

            _footerLinksRepository = new Lazy<IGenericRepository<FooterLinks>>(() =>
                new GenericRepository<FooterLinks>(_context));

            _footerLinksPathsRepository = new Lazy<IGenericRepository<FooterLinksPaths>>(() =>
                new GenericRepository<FooterLinksPaths>(_context));

            _workOrderRepository = new Lazy<IGenericRepository<WorkOrder>>(() =>
                new GenericRepository<WorkOrder>(_context)); ;

            _workOrderStatusRepository = new Lazy<IGenericRepository<WorkOrderStatus>>(() =>
                new GenericRepository<WorkOrderStatus>(_context));

            _workOrderPriorityRepository = new Lazy<IGenericRepository<WorkOrderPriority>>(() =>
                new GenericRepository<WorkOrderPriority>(_context));

            _workOrderWorkerRepository = new Lazy<IGenericRepository<WorkOrderWorker>>(() =>
                new GenericRepository<WorkOrderWorker>(_context));

            _applicationSettingsRepository = new Lazy<IGenericRepository<ApplicationSettings>>(() => 
                new GenericRepository<ApplicationSettings>(_context));

            _aboutCompanyRepository = new Lazy<IGenericRepository<AboutCompany>>(() =>
                new GenericRepository<AboutCompany>(_context));

            _newsletterSubscriberRepository = new Lazy<IGenericRepository<NewsletterSubscriber>>(()=>
                new GenericRepository<NewsletterSubscriber>(_context));

            _sendHistoryRepository = new Lazy<IGenericRepository<SendHistory>>(() =>
                new GenericRepository<SendHistory>(_context));
        }


        public CarRentContext Context { get => _context; }
        public ICarRepository Car => _carRepository.Value;
        public IPriceListRepository PriceList => _priceListRepository.Value;
        public IGenericRepository<CarMake> CarMake => _carMakeRepository.Value;
        public IGenericRepository<CarType> CarType => _carTypeRepository.Value;
        public IGenericRepository<AirConditioningType> AirConditioningType => _airConditioningTypeRepository.Value;
        public IGenericRepository<EngineType> EngineType => _engineTypeRepository.Value;
        public IGenericRepository<CarDrive> CarDrive => _carDriveRepository.Value;
        public IGenericRepository<GearboxType> GearboxType => _gearboxTypeRepository.Value;
        public IGenericRepository<KilometrLimit> KilometrLimit => _kilometrLimitRepository.Value;
        public IGenericRepository<PricelistItem> PricelistItem => _priceListItemRepository.Value;
        public IGenericRepository<PricelistDate> PricelistDate => _pricelistDateRepository.Value;
        public IGenericRepository<CarOpinion> CarOpinion => _carOpinionRepository.Value;
        public IGenericRepository<RecommendedCars> RecommendedCars  => _recommendedCarsRepository.Value;
        public IGenericRepository<CarImages> CarImages => _carImagesRepository.Value;

        public IRentalRepository Rentals => _rentalRepository.Value;
        public IGenericRepository<RentalStatus> RentalStatus => _rentalStatusRepository.Value;
        public IGenericRepository<ClientDetails> ClientDetails => _clientDetailsRepository.Value;
        public IGenericRepository<Invoice> Invoice => _invoiceRepository.Value;
        public IGenericRepository<InvoiceItem> InvoiceItem => _invoiceItemRepository.Value;
        public IGenericRepository<InvoiceStatus> InvoiceStatus => _invoiceStatusRepository.Value;
        public IGenericRepository<InvoiceClient> InvoiceClient => _invoiceClientRepository.Value;
        public IGenericRepository<UserRental> UserRental => _userRentalRepository.Value;
        public IGenericRepository<UserInvoice> UserInvoice => _userInvoiceRepository.Value;
        public IGenericRepository<Rabat> Rabat => _rabatRepository.Value;
        public IGenericRepository<RabatForUser> RabatForUser => _rabatForUserRepository.Value;
        public IGenericRepository<CarMaintenance> CarMaintenances => _carMaintenancesRepository.Value;
        public IGenericRepository<Address> Address => _addressRepository.Value;
        public IGenericRepository<UserAddress> UserAddress => _userAddressRepository.Value;
        public IGenericRepository<DataForRental> DataForRental => _dataForRentalRepository.Value;
        public IGenericRepository<UserWorkerPaths> UserWorkerPaths => _userWorkerPathRepository.Value;
        public IGenericRepository<Wishlist> Wishlist => _wishListRepository.Value;
        public IGenericRepository<WorkerPaths> WorkerPaths => _workerPathRepository.Value;
        public IGenericRepository<PathItem> PathItem => _pathItemRepository.Value;
        public IGenericRepository<HomePage> HomePage => _homePageRepository.Value;
        public IGenericRepository<ContactPage> ContactPage => _contactPageRepository.Value;
        public IGenericRepository<Footer> Footer => _footerRepository.Value;
        public IGenericRepository<FooterLinks> FooterLinks => _footerLinksRepository.Value;
        public IGenericRepository<FooterLinksPaths> FooterLinksPaths => _footerLinksPathsRepository.Value;
        public IGenericRepository<WorkOrder> WorkOrder => _workOrderRepository.Value;
        public IGenericRepository<WorkOrderStatus> WorkOrderStatus => _workOrderStatusRepository.Value;
        public IGenericRepository<WorkOrderPriority> WorkOrderPriority => _workOrderPriorityRepository.Value;
        public IGenericRepository<WorkOrderWorker> WorkOrderWorker => _workOrderWorkerRepository.Value;
        public IGenericRepository<Notification> Notification => _notificationRepository.Value;
        public IGenericRepository<AboutCompany> AboutCompany => _aboutCompanyRepository.Value;
        public IGenericRepository<ApplicationSettings> ApplicationSettings => _applicationSettingsRepository.Value;
        public IGenericRepository<NewsletterSubscriber> NewsletterSubscriber => _newsletterSubscriberRepository.Value;
        public IGenericRepository<SendHistory> SendHistory => _sendHistoryRepository.Value;

        public async Task SaveAsync()
        {
            await _context.SaveChangesAsync();
        }
    }
}
