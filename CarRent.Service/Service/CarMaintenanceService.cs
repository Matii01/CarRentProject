using AutoMapper;
using CarRent.data.DTO;
using CarRent.data.Exceptions;
using CarRent.data.Models.CarRent;
using CarRent.Repository.Extensions;
using CarRent.Repository.Interfaces;
using CarRent.Repository.Parameters;
using CarRent.Service.Helper;
using CarRent.Service.Interfaces;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;


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

        public async Task<CarMaintenanceDto> GetCarMaintenanceByIdAsync(int id, bool trackChanges)
        {
            var item = await _repository.CarMaintenances
                .GetAsync(id, trackChanges)
                .SingleOrDefaultAsync();

            return _mapper.Map<CarMaintenanceDto>(item);
        }
        public async Task<CarMaintenanceDto> EditCarMaintenanceAsync(int id, CarMaintenanceDto carMaintenance, string userId)
        {
            var carHaveRental = await _rentalService.CarHaveRentalInThisDate(
               carMaintenance.CarId, carMaintenance.DateStart, carMaintenance.DateEnd);

            if (carHaveRental || !await CanChangeDates(id, carMaintenance.CarId, carMaintenance.DateStart, carMaintenance.DateEnd))
            {
                throw new Exception("Dates taken");
            }

            var item = await _repository.CarMaintenances
                .GetAsync(id, true)
                .SingleOrDefaultAsync() ?? throw new Exception("Item not found");

            item.UserId = userId;
            item.TotalCost = carMaintenance.TotalCost;
            item.DateStart = carMaintenance.DateStart;
            item.DateEnd = carMaintenance.DateEnd;
            item.Description = carMaintenance.Description ?? "";
            item.Remarks = carMaintenance.Remarks;

            await _repository.SaveAsync();
            
            return _mapper.Map<CarMaintenanceDto>(item);
        }

        public async Task<IEnumerable<CarMaintenanceListDto>> GetCarMaintenanceListAsync(MaintenanceParameters param)
        {
            var list = await _repository.CarMaintenances
                .GetAllActiveAsync(false)
                .Search(param)
                .Select(x => new CarMaintenanceListDto(
                    x.Id,
                    x.Car.Name,
                    x.DateStart,
                    x.DateEnd,
                    x.TotalCost
                    ))
                .ToListAsync();
               
            return list;    
        }

        public async Task<CarMaintenanceDto> CreateCarMaintenance(string workerId, NewCarMaintenanceDto carMaintenance)
        {
            var item = MapHelper.MapNewCarMaintenanceDtoToCarMaintenanceDto(workerId, carMaintenance);

            var carHaveRental = await _rentalService.CarHaveRentalInThisDate(
                carMaintenance.CarId, carMaintenance.DateStart, carMaintenance.DateEnd);

            if (carHaveRental || await CarHaveMaintenanceInThisDate(carMaintenance.CarId, carMaintenance.DateStart, carMaintenance.DateEnd))
            {
                throw new DatesTakenException();
            }

            var newMaintenance = _mapper.Map<CarMaintenance>(item);

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

        public async Task<IEnumerable<int>> GetCarsThatHaveServiceInDates(NewRentalForClient dates)
        {
            var list = await _repository.CarMaintenances.FindByCondition(x => x.IsActive == true &&
                    !((dates.DateFrom > x.DateEnd && dates.DateTo > x.DateEnd) ||
                        (dates.DateFrom < x.DateStart && dates.DateTo < x.DateStart)), false)
                .Select(x => x.CarId)
                .ToListAsync();

            return list;
        }

        public async Task<IEnumerable<CarMaintenanceDatesDto>> GetFutureMaintenanceDatesForCarAsync(int CarId)
        {
            var currentDate = DateTime.Now.AddDays(-1);
            return await _repository.CarMaintenances
                .FindByCondition(x => x.CarId == CarId && x.DateStart >= currentDate, false)
                .Select(x => new CarMaintenanceDatesDto(x.DateStart, x.DateEnd))
                .ToListAsync();
        }

        private async Task<bool> CanChangeDates(
                int Id,
                int CarId,
                DateTime DateStart,
                DateTime DateEnd)
        {
            var result = await _repository.CarMaintenances
            .FindByCondition(x => x.CarId == CarId &&
                x.Id != Id && 
                x.IsActive == true &&
                !((DateStart > x.DateEnd && DateEnd > x.DateEnd) ||
                    (DateStart < x.DateStart && DateEnd < x.DateStart))
                , false)
            .ToListAsync();

            if (result.IsNullOrEmpty())
            {
                return true;
            }
            return false;
        }
    }
}
