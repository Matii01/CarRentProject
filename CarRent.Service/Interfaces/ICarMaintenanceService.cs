using CarRent.data.DTO;
using CarRent.data.Models.CarRent;
using CarRent.Repository.Parameters;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CarRent.Service.Interfaces
{
    public interface ICarMaintenanceService
    {
        Task<IEnumerable<CarMaintenanceListDto>> GetCarMaintenanceListAsync(MaintenanceParameters param);
        Task<CarMaintenanceDto> GetCarMaintenanceByIdAsync(int id, bool trackChanges);
        Task<CarMaintenanceDto> CreateCarMaintenance(CarMaintenanceDto carMaintenance);
        Task<CarMaintenanceDto> EditCarMaintenanceAsync(int id, CarMaintenanceDto carMaintenance, string userId);
        Task<bool> CarHaveMaintenanceInThisDate(
                int CarId,
                DateTime DateStart,
                DateTime DateEnd
            );
    }
}
