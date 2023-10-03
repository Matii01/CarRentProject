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
        public readonly Lazy<ICarMakeService> _carMakeService;
        public readonly Lazy<IGenericService<CarTypeDto>> _carTypeService;

        public ServiceManager(IRepositoryManager repositoryManager)
        {
            _carMakeService = new Lazy<ICarMakeService>(() 
                => new CarMakeService(repositoryManager));

            _carTypeService = new Lazy<IGenericService<CarTypeDto>>(()
                => new CarTypeService(repositoryManager));
        }

        public ICarMakeService CarMakeService => _carMakeService.Value;
        public IGenericService<CarTypeDto> CarTypeService => _carTypeService.Value;
    }
}
