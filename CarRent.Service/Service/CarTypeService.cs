﻿using CarRent.data.DTO;
using CarRent.data.Exceptions;
using CarRent.data.Models.CarRent;
using CarRent.Repository.Interfaces;
using CarRent.Service.Interfaces;
using Microsoft.EntityFrameworkCore;

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

            _repository.CarType.Create(carTypeEntity);
            await _repository.SaveAsync();

            return new(carTypeEntity.Id, carTypeEntity.Name);
        }

        public async Task<IEnumerable<CarTypeDto>> GetAllActiveAsync(bool trackChanges)
        {
            var carTypes = await _repository.CarType
                .GetAllAsync(trackChanges, "Name", true)
                .Where(x=>x.IsActive == true)
                .Select(x => new CarTypeDto(x.Id, x.Name))
                .ToListAsync();
            
            return carTypes;
        }

        public async Task<IEnumerable<CarTypeDto>> GetAllAsync(bool trackChanges)
        {
            var carTypes = await _repository.CarType
                .GetAllAsync(trackChanges, "Name")
                .Select(x => new CarTypeDto(x.Id, x.Name))
                .ToListAsync();
            
            return carTypes;
        }

        public async Task<CarTypeDto> GetAsync(int id, bool trackChanges)
        {
            var carType = await _repository.CarType
                .GetAsync(id, trackChanges)
                .Select(x => new CarTypeDto(x.Id, x.Name))
                .SingleOrDefaultAsync() ?? throw new DataNotFoundException("CarType not found"); 

            return carType;
        }

        public async Task UpdateAsync(int id, CarTypeDto carMake, bool trackChanges)
        {
            var carDrive = await _repository.CarType
                .GetAsync(id, trackChanges)
                .SingleOrDefaultAsync() ?? throw new DataNotFoundException("CarType not found");
            carDrive.Name = carMake.Name;

            await _repository.SaveAsync();
        }

        public async Task DeleteAsync(int id)
        {
            var engineType = await _repository.CarType
                .GetAsync(id, true)
                .SingleOrDefaultAsync() ?? throw new DataNotFoundException("CarType not found");
            engineType.IsActive = false;

            await _repository.SaveAsync();
        }
    }
}
