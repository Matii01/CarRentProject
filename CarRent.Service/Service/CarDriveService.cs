﻿using AutoMapper;
using CarRent.data.DTO;
using CarRent.data.Exceptions;
using CarRent.data.Models.CarRent;
using CarRent.Repository.Interfaces;
using CarRent.Service.Interfaces;
using Microsoft.EntityFrameworkCore;
 

namespace CarRent.Service.Service
{
    public class CarDriveService : IGenericService<CarDriveDto>
    {
        private readonly IMapper _mapper;
        private readonly IRepositoryManager _repository;

        public CarDriveService(IRepositoryManager manager, IMapper mapper)
        {
            _repository = manager;
            _mapper = mapper;
        }

        public async Task<CarDriveDto> CreateAsync(CarDriveDto carMake)
        {
            var carDriveEntity = _mapper.Map<CarDrive>(carMake);

            _repository.CarDrive.Create(carDriveEntity);
            await _repository.SaveAsync();
            
            return _mapper.Map<CarDriveDto>(carDriveEntity);
        }

        public async Task<IEnumerable<CarDriveDto>> GetAllActiveAsync(bool trackChanges)
        {
            var carDrives = await _repository.CarDrive
                .GetAllAsync(trackChanges, "Name")
                .Where(x => x.IsActive == true)
                .Select(x => _mapper.Map<CarDriveDto>(x))
                .ToListAsync();

            return carDrives;
        }

        public async Task<IEnumerable<CarDriveDto>> GetAllAsync(bool trackChanges)
        {
            var carDrives = await _repository.CarDrive
                .GetAllAsync(trackChanges, "Name")
                .Select(x => _mapper.Map<CarDriveDto>(x))
                .ToListAsync();

            var carDrivesDto = carDrives.Select(_mapper.Map<CarDriveDto>).ToList();
            return carDrivesDto;
        }

        public async Task<CarDriveDto> GetAsync(int id, bool trackChanges)
        {
            var carDrive = await _repository.CarDrive
                .GetAsync(id, trackChanges)
                .Select(x => _mapper.Map<CarDriveDto>(x))
                .SingleOrDefaultAsync() ?? throw new DataNotFoundException("CarDrive not found");  

            return carDrive;
        }

        public async Task UpdateAsync(int id, CarDriveDto newCarDrive, bool trackChanges)
        {
            var carDrive = await _repository.CarDrive
                .GetAsync(id, trackChanges)
                .SingleOrDefaultAsync() ?? throw new DataNotFoundException("CarDrive not found");
            carDrive.Name = newCarDrive.Name;
            carDrive.Description = newCarDrive.Description;

            await _repository.SaveAsync();
        }

        public async Task DeleteAsync(int id)
        {
            var engineType = await _repository.CarDrive
                .GetAsync(id, true)
                .SingleOrDefaultAsync() ?? throw new DataNotFoundException("CarDrive not found");
            engineType.IsActive = false;

            await _repository.SaveAsync();
        }
    }
}
