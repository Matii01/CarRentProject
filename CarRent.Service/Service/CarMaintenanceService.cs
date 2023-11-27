using AutoMapper;
using CarRent.data.DTO;
using CarRent.data.Models.CarRent;
using CarRent.Repository.Interfaces;
using CarRent.Service.Interfaces;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CarRent.Service.Service
{
    public class CarMaintenanceService : ServiceBase, ICarMaintenanceService
    {
        private readonly IRentalService _rentalService;

        public CarMaintenanceService(
            IRepositoryManager repository,
            IRentalService rentalService,
            IMapper mapper)
            : base(repository, mapper)
        {
            _rentalService = rentalService;
        }

        public async Task<CarMaintenanceDto> CreateCarMaintenance(CarMaintenanceDto carMaintenance)
        {

            var carHaveRental = await _rentalService.CarHaveRentalInThisDate(new(
                carMaintenance.CarId, carMaintenance.DateStart, carMaintenance.DateEnd));

            if (carHaveRental || await CarHaveMaintenanceInThisDate(carMaintenance.CarId, carMaintenance.DateStart, carMaintenance.DateEnd))
            {
                throw new Exception("The car is occupied on this date");
            }
            var newMaintenance = _mapper.Map<CarMaintenance>(carMaintenance);

            _repository.CarMaintenances.Create(newMaintenance);
            await _repository.SaveAsync();

            return _mapper.Map<CarMaintenanceDto>(newMaintenance);
        }

        public async Task<bool> CarHaveMaintenanceInThisDate(
                int CarId, 
                DateTime DateStart, 
                DateTime DateEnd
            )     
        {
            var result = await _repository.CarMaintenances
                .FindByCondition(x => x.CarId == CarId &&
                    x.IsActive == true &&
                    !((DateStart > x.DateEnd && DateEnd > x.DateEnd) ||
                        (DateStart < x.DateStart && DateEnd < x.DateStart))
                    , false)
                .ToListAsync();

            if (result.IsNullOrEmpty())
            {
                return false;
            }
            return true;
        }
    }
}
