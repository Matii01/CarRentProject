using AutoMapper;
using CarRent.data.DTO;
using CarRent.data.Models.CarRent;
using CarRent.Repository.Interfaces;
using CarRent.Service.Interfaces;
using CarRent.Service.Service;
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

        public readonly Lazy<IGenericService<CarTypeDto>> _carTypeService;
        public readonly Lazy<IGenericService<CarDriveDto>> _carDriveService;
        public readonly Lazy<IGenericService<EngineTypeDto>> _engineTypeService;
        public readonly Lazy<IGenericService<AirConditioningTypeDto>> _airConditioningService;
        public readonly Lazy<IGenericService<KilometrLimitDto>> _kilometrLimitService;
        public readonly Lazy<IGenericService<GearboxTypeDto>> _gearboxTypeService;



        public ServiceManager(IRepositoryManager repositoryManager, IMapper mapper)
        {
            _carService = new Lazy<ICarService>(() =>
                new CarService(repositoryManager, mapper));    

            _carMakeService = new Lazy<ICarMakeService>(() 
                => new CarMakeService(repositoryManager));
            
            _priceListService = new Lazy<IPriceListService>(() 
                => new PriceListService(repositoryManager, RabatService, mapper));

            _rentalService = new Lazy<IRentalService>(() 
                => new RentalService(repositoryManager, mapper));

            _rabatService =new Lazy<IRabatService>(() =>
               new RabatService(repositoryManager, mapper));

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
        }

        public ICarService CarService => _carService.Value;
        public ICarMakeService CarMakeService => _carMakeService.Value;
        public IPriceListService PriceListService => _priceListService.Value;
        public IRentalService RentalService => _rentalService.Value;    
        public IRabatService RabatService => _rabatService.Value;

        public IGenericService<CarTypeDto> CarTypeService => _carTypeService.Value;
        public IGenericService<CarDriveDto> CarDriveService => _carDriveService.Value;
        public IGenericService<EngineTypeDto> EngineTypeService => _engineTypeService.Value;
        public IGenericService<AirConditioningTypeDto> AirConditioningTypeService => _airConditioningService.Value;
        public IGenericService<KilometrLimitDto> KilometrLimitService => _kilometrLimitService.Value;
        public IGenericService<GearboxTypeDto> GearboxTypeService => _gearboxTypeService.Value;
    }
}
