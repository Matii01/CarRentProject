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
        Task<CarEquipmentDto> GetByIdAsync(int id);
        Task<CarEquipmentDto> CreateAsync(CarEquipmentDto carEquipment);
        Task UpdateAsync(int id, CarEquipmentDto carEquipment);
        Task DeleteAsync(int id);
    }
}
