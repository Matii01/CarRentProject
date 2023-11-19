using AutoMapper;
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
            var carDrives = await _repository.CarDrive.GetAllActiveAsync(trackChanges);

            var carDrivesDto = carDrives.Select(_mapper.Map<CarDriveDto>).ToList();   
            return carDrivesDto;
        }

        public async Task<IEnumerable<CarDriveDto>> GetAllAsync(bool trackChanges)
        {
            var carDrives = await _repository.CarDrive.GetAllAsync(trackChanges, "Name");

            var carDrivesDto = carDrives.Select(_mapper.Map<CarDriveDto>).ToList();
            return carDrivesDto;
        }

        public async Task<CarDriveDto> GetAsync(int id, bool trackChanges)
        {
            var carDrive = await _repository.CarDrive.GetAsync(id, trackChanges);
            return _mapper.Map<CarDriveDto>(carDrive);
        }

        public async Task UpdateAsync(int id, CarDriveDto newCarDrive, bool trackChanges)
        {
            var carDrive = await _repository.CarDrive.GetAsync(id, trackChanges) ?? throw new ArgumentException("CarDrive not found");
            carDrive.Name = newCarDrive.Name;
            carDrive.Description = newCarDrive.Description;

            await _repository.SaveAsync();
        }

        public async Task DeleteAsync(int id)
        {
            var engineType = await _repository.CarDrive.GetAsync(id, true) ?? throw new ArgumentException("not found");
            engineType.IsActive = false;

            await _repository.SaveAsync();
        }
    }
}
