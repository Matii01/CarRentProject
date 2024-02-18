using CarRent.data.DTO;
using CarRent.data.Models.CarRent;
using CarRent.Repository.Interfaces;
using CarRent.Service.Interfaces;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CarRent.Service.Service
{
    public class CarMakeService : ICarMakeService
    {
        private readonly IRepositoryManager _repository;

        public CarMakeService(IRepositoryManager repository)
        {
            _repository = repository;
        }

        public async Task<IEnumerable<CarMakeDto>> GetAllCarMakesAsync(bool trackChanges)
        {
            var carMakes = await _repository.CarMake.GetAllAsync(trackChanges, "Id").ToListAsync();

            var carMakesDto = carMakes
                .Select(x => new CarMakeDto(x.Id, x.Name, x.Description))
                .ToList();
            return carMakesDto;
        }

        public async Task<IEnumerable<CarMakeDto>> GetAllActiveCarMakesAsync(bool trackChanges)
        {
            var carMakes = await _repository.CarMake.GetAllAsync(trackChanges, "Id", false).ToListAsync();

            var carMakesDto = carMakes
                .Where(x => x.IsActive == true)
                .Select(x => new CarMakeDto(x.Id, x.Name, x.Description))
                .ToList();
            return carMakesDto;
        }
        public async Task<CarMakeDto> GetCarMakeAsync(int id, bool trackChanges)
        {
            var carMake = await _repository.CarMake
                .GetAsync(id, trackChanges)
                .SingleOrDefaultAsync() ?? throw new Exception("CarMake not found");
            var carMakeDto = new CarMakeDto(carMake.Id, carMake.Name, carMake.Description);

            return carMakeDto;
        }

        public async Task<CarMakeDto> CreateCarMakeAsync(CarMakeDto carMake)
        {
            var carMakeEntity = new CarMake()
            {
                Name = carMake.Name,
                Description = carMake.Description,
                IsActive = true
            };
            _repository.CarMake.Create(carMakeEntity);
            await _repository.SaveAsync();

            return new (carMakeEntity.Id, carMakeEntity.Name, carMakeEntity.Description);
        }

        public async Task UpdateCarMakeAsync(int id, CarMakeDto carMake, bool trackChanges)
        {
            var carMakeEntity = await _repository.CarMake
                .GetAsync(id, trackChanges)
                .SingleOrDefaultAsync() ?? throw new Exception("CarMake not found");

            carMakeEntity.Name = carMake.Name;
            carMakeEntity.Description = carMake.Description;

            await _repository.SaveAsync();
        }

        public async Task DeleteAsync(int id)
        {
            var engineType = await _repository.CarMake
                .GetAsync(id, true)
                .SingleOrDefaultAsync() ?? throw new ArgumentException("not found");
            engineType.IsActive = false;

            await _repository.SaveAsync();
        }
    }
}
