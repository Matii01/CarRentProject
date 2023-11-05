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

        public async Task SaveAsync()
        {
            await _context.SaveChangesAsync();
        }
    }
}
