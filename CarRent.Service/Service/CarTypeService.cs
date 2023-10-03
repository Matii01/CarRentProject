using CarRent.data.DTO;
using CarRent.data.Models.CarRent;
using CarRent.Repository.Interfaces;
using CarRent.Service.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CarRent.Service.Service
{
    public class CarTypeService : IGenericService<CarTypeDto>
    {
        private readonly IRepositoryManager _repository;

        public CarTypeService(IRepositoryManager repository)
        {
            _repository = repository;
        }

        public async Task<CarTypeDto> CreateAsync(CarTypeDto carMake)
        {
            var carTypeEntity = new CarType()
            {
                Name = carMake.Name,
                IsActive = true,
            };

            _repository.CarType.CreateCarType(carTypeEntity);
            await _repository.SaveAsync();

            return new(carTypeEntity.Id, carTypeEntity.Name);
        }

        public async Task<IEnumerable<CarTypeDto>> GetAllActiveAsync(bool trackChanges)
        {
            var carTypes = await _repository.CarType.GetAllActiveCarTypeAsync(trackChanges);
            
            var carTypesDto = carTypes
                .Select(x => new CarTypeDto(x.Id, x.Name))
                .ToList();
            return carTypesDto;
        }

        public async Task<IEnumerable<CarTypeDto>> GetAllAsync(bool trackChanges)
        {
            var carTypes = await _repository.CarType.GetAllCarTypeAsync(trackChanges);

            var carTypesDto = carTypes
                .Select(x => new CarTypeDto(x.Id, x.Name))
                .ToList();
            return carTypesDto;
        }

        public async Task<CarTypeDto> GetAsync(int id, bool trackChanges)
        {
            var carType = await _repository.CarType.GetCarTypeAsync(id, trackChanges);
            var catTypeDto = new CarTypeDto(carType.Id, carType.Name);

            return catTypeDto;
        }

        public Task UpdateAsync(int id, CarTypeDto carMake, bool trackChanges)
        {
            throw new NotImplementedException();
        }
    }
}
