using CarRent.data.DTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CarRent.Service.Interfaces
{
    public interface ICarEquipmentService
    {
        Task<IEnumerable<CarEquipmentDto>> GetAllAsync();
        Task<IEnumerable<CarEquipmentForCarDto>> GetEquipmentForCarAsync(int carId);
        Task<CarEquipmentDto> GetByIdAsync(int id);
        Task<CarEquipmentDto> CreateAsync(CarEquipmentDto carEquipment);
        Task<CarEquipmentForCarDto> AssignCarEquipmentToCar(CarEquipmentCarDto carEquipment);
        Task RemoveEquipmentFromCar(int id);
        Task UpdateAsync(int id, CarEquipmentDto carEquipment);
        Task DeleteAsync(int id);
    }
}
