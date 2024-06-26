﻿using CarRent.data.DTO;
using CarRent.Repository.Parameters;

namespace CarRent.Service.Interfaces
{
    public interface ICarMaintenanceService
    {
        Task<IEnumerable<CarMaintenanceListDto>> GetCarMaintenanceListAsync(MaintenanceParameters param);
        Task<CarMaintenanceDto> GetCarMaintenanceByIdAsync(int id, bool trackChanges);
        Task<CarMaintenanceDto> CreateCarMaintenance(string workerId, NewCarMaintenanceDto carMaintenance);
        Task<CarMaintenanceDto> EditCarMaintenanceAsync(int id, CarMaintenanceDto carMaintenance, string userId);
        Task<IEnumerable<int>> GetCarsThatHaveServiceInDates(NewRentalForClient dates);
        Task<IEnumerable<CarMaintenanceDatesDto>> GetFutureMaintenanceDatesForCarAsync(int CarId);
        Task<bool> CarHaveMaintenanceInThisDate(
                int CarId,
                DateTime DateStart,
                DateTime DateEnd
            );
    }
}
