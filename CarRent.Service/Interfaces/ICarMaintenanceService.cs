using CarRent.data.DTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CarRent.Service.Interfaces
{
    public interface ICarMaintenanceService
    {
        Task<CarMaintenanceDto> CreateCarMaintenance(CarMaintenanceDto carMaintenance);
        Task<bool> CarHaveMaintenanceInThisDate(
                int CarId,
                DateTime DateStart,
                DateTime DateEnd
            );
    }
}
