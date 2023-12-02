using CarRent.data.Models.CarRent;
using CarRent.Repository.Interfaces;
using CarRent.Repository.Repositories;

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

        //CarMaintenances
        private readonly Lazy<IGenericRepository<CarMaintenance>> _carMaintenancesRepository;

        // Rental 
        private readonly Lazy<IGenericRepository<Rental>> _rentalRepository;
        private readonly Lazy<IGenericRepository<ClientDetails>> _clientDetailsRepository;
        private readonly Lazy<IGenericRepository<Invoice>> _invoiceRepository;
        private readonly Lazy<IGenericRepository<InvoiceItem>> _invoiceItemRepository;
        private readonly Lazy<IGenericRepository<InvoiceClient>> _invoiceClientRepository;
        private readonly Lazy<IGenericRepository<UserRental>> _userRentalRepository;
        private readonly Lazy<IGenericRepository<RentalStatus>> _rentalStatusRepository;

        //Rabat 
        private readonly Lazy<IGenericRepository<Rabat>> _rabatRepository;
        private readonly Lazy<IGenericRepository<RabatForUser>> _rabatForUserRepository;

        public RepositoryManager(CarRentContext context)
        {
            _context = context;

            _carRepository = new Lazy<ICarRepository>(() =>
                new CarRepository(_context));
            _priceListRepository = new Lazy<IPriceListRepository>(() =>
                new PriceListRepository(_context));

            _carMakeRepository = new Lazy<IGenericRepository<CarMake>>(() =>
                new GenericRepository<CarMake>(_context));

            _carTypeRepository = new Lazy<IGenericRepository<CarType>>(() =>
                new GenericRepository<CarType>(_context));

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

            _rentalRepository = new Lazy<IGenericRepository<Rental>>(() =>
                new GenericRepository<Rental>(_context));

            _clientDetailsRepository = new Lazy<IGenericRepository<ClientDetails>>(() =>
                new GenericRepository<ClientDetails>(_context));

            _invoiceClientRepository = new Lazy<IGenericRepository<InvoiceClient>>(() =>
                new GenericRepository<InvoiceClient>(_context));

            _invoiceItemRepository = new Lazy<IGenericRepository<InvoiceItem>>(() =>
                new GenericRepository<InvoiceItem>(_context));

            _invoiceRepository = new Lazy<IGenericRepository<Invoice>>(() =>
                new GenericRepository<Invoice>(_context));

            _userRentalRepository = new Lazy<IGenericRepository<UserRental>>(() =>
               new GenericRepository<UserRental>(_context));

            _rentalStatusRepository = new Lazy<IGenericRepository<RentalStatus>>(() =>
                new GenericRepository<RentalStatus>(_context));

            _rabatRepository = new Lazy<IGenericRepository<Rabat>>(() =>
                new  GenericRepository<Rabat>(_context));

            _rabatForUserRepository = new Lazy<IGenericRepository<RabatForUser>>(() =>
                new GenericRepository<RabatForUser>(_context));

            _carMaintenancesRepository = new Lazy<IGenericRepository<CarMaintenance>>(() =>
                new GenericRepository<CarMaintenance>(_context));
        }

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
        public IGenericRepository<Rental> Rentals => _rentalRepository.Value;
        public IGenericRepository<RentalStatus> RentalStatus => _rentalStatusRepository.Value;
        public IGenericRepository<ClientDetails> ClientDetails => _clientDetailsRepository.Value;
        public IGenericRepository<Invoice> Invoice => _invoiceRepository.Value;
        public IGenericRepository<InvoiceItem> InvoiceItem => _invoiceItemRepository.Value;
        public IGenericRepository<InvoiceClient> InvoiceClient => _invoiceClientRepository.Value;
        public IGenericRepository<UserRental> UserRental => _userRentalRepository.Value;
        public IGenericRepository<Rabat> Rabat => _rabatRepository.Value;
        public IGenericRepository<RabatForUser> RabatForUser => _rabatForUserRepository.Value;
        public IGenericRepository<CarMaintenance> CarMaintenances => _carMaintenancesRepository.Value;
        
        public async Task SaveAsync()
        {
            await _context.SaveChangesAsync();
        }
    }
}
