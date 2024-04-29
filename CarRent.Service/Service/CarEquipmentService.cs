using AutoMapper;
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
    public class CarEquipmentService : ServiceBase, ICarEquipmentService
    {
        public CarEquipmentService(IRepositoryManager repository, IMapper mapper)
            : base(repository, mapper)
        {
        }

        public async Task<IEnumerable<CarEquipmentDto>> GetAllAsync()
        {
            var items = await _repository.CarEquipment
                .GetAllAsync(false, "Id", false)
                .Where(x => x.IsActive == true)
                .Select(x=> _mapper.Map<CarEquipmentDto>(x))
                .ToListAsync();

            return items;
        }

        public async Task<IEnumerable<CarEquipmentForFiltersDto>> GetForFiltersAsync()
        {
            var items = await _repository.CarEquipment
                .GetAllAsync(false, "Id", false)
                .Where(x => x.IsActive == true)
                .Select(x => new CarEquipmentForFiltersDto(x.Id, x.Name))
                .ToListAsync();

            return items;
        }

        public async Task<IEnumerable<CarEquipmentForCarDto>> GetEquipmentForCarAsync(int carId)
        {
            var items = await _repository.CarEquipmentCar
                .FindByCondition(x => x.IsActive == true && 
                    x.CarId == carId, 
                    false)
                .Select(x => new CarEquipmentForCarDto(
                    x.Id, 
                    x.CarId, 
                    x.CarEquipmentId, 
                    x.CarEquipment.Name, 
                    x.CarEquipment.Description))
                .ToListAsync();

            return items;
        }

        public async Task<CarEquipmentDto> GetByIdAsync(int id)
        {
            var item = await _repository.CarEquipment
                .GetAsync(id, false)
                .Select(x => _mapper.Map<CarEquipmentDto>(x))
                .SingleOrDefaultAsync() ?? throw new Exception("Not found");

            return item;
        }

        public async Task<CarEquipmentDto> CreateAsync(CarEquipmentDto carEquipment)
        {
            var newItem = _mapper.Map<CarEquipment>(carEquipment);

            _repository.CarEquipment.Create(newItem);
            await _repository.SaveAsync();

            return _mapper.Map<CarEquipmentDto>(newItem);
        }

        public async Task<CarEquipmentForCarDto> AssignCarEquipmentToCar(CarEquipmentCarDto carEquipment)
        {
            var equipment = await GetByIdAsync(carEquipment.EquipmentId);

            var item = await _repository.CarEquipmentCar.FindByCondition(
                    x => x.CarEquipmentId == carEquipment.EquipmentId 
                    && x.CarId == carEquipment.CarId, true)
                .SingleOrDefaultAsync();

            if (item != null)
            {
                item.IsActive = true;
                await _repository.SaveAsync();
                return new CarEquipmentForCarDto(item.Id, item.CarId, item.CarEquipmentId, equipment.Name, equipment.Description);
            }

            CarEquipmentCar newItem = new()
            {
                CarId = carEquipment.CarId,
                CarEquipmentId = carEquipment.EquipmentId,
                IsActive = true
            };

            _repository.CarEquipmentCar.Create(newItem);
            await _repository.SaveAsync();
         
            return new CarEquipmentForCarDto(newItem.Id, newItem.CarId, newItem.CarEquipmentId, equipment.Name, equipment.Description);
        }
       
        public async Task RemoveEquipmentFromCar(int id)
        {
            var item = await _repository.CarEquipmentCar
                .GetAsync(id, true)
                .SingleOrDefaultAsync() ?? throw new Exception("Not found");

            item.IsActive = false;
            await _repository.SaveAsync();
        }

        public async Task UpdateAsync(int id, CarEquipmentDto carEquipment)
        {
            var item = await _repository.CarEquipment
                 .GetAsync(id, true)
                 .SingleOrDefaultAsync() ?? throw new Exception("Not found");

            item.Description = carEquipment.Description;
            item.Name = carEquipment.Name;
            
            await _repository.SaveAsync();
        }

        public async Task DeleteAsync(int id)
        {
            var item = await _repository.CarEquipment
                .GetAsync(id, true)
                .SingleOrDefaultAsync() ?? throw new Exception("Not found");
            
            item.IsActive = false;
            await _repository.SaveAsync();
            await DeleteEquipmentFromCar(id);
        }

        private async Task DeleteEquipmentFromCar(int id)
        {
            var list = await _repository.CarEquipmentCar
                .FindByCondition(x => x.CarEquipmentId == id, true)
                .ToListAsync();

            foreach (var item in list)
            {
                item.IsActive = false;
            }
            await _repository.SaveAsync();
        }
    }
}
