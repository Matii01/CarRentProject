using AutoMapper;
using CarRent.data.DTO;
using CarRent.data.Models;
using CarRent.Repository;
using CarRent.Repository.Interfaces;
using CarRent.Repository.Parameters;
using CarRent.Service.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace CarRent.Service.Service
{
    public class CarService : ServiceBase, ICarService
    {
        public CarService(IRepositoryManager repository, IMapper mapper) 
            : base(repository, mapper)
        {

        }

        public async Task<List<CarListDtoForClient>> GetCarListForClientAsync(CarParameters carParameters, bool trackChanges)
        {
            var list = await _repository.Car.GetAllActiveCarAsync(carParameters, trackChanges);

            //string name, string gearbox, string ac, string averageCombustion, decimal price

            var items = list.Select(x => new CarListDtoForClient(
                x.Name,
                x.GearBoxType.Name,
                x.AirConditioningType.Name,
                x.AverageCombustion.ToString(),
                0)).ToList();

            return items;
        }

        public async Task<CarDto> GetCarById(int id, bool trackChanges)
        {
            var car = await _repository.Car.GetCarAsync(id, trackChanges);
            
            //return _mapper.Map<CarDto>(car);
            
            return ConvertCarToCarDto(car);

        }

        public Task<CarDetailsDtoForClient> GetCarDetailsForClientAsync(int id)
        {
            //throw new NotImplementedException();
            return null;
        }

        public async Task<Car> CreateCarAsync(NewCarDto car)
        {
            var newCar = _mapper.Map<Car>(car);

            _repository.Car.Create(newCar);
            await _repository.SaveAsync();

            return newCar;   
        }

        public Task UpdateCarAsync(int id, NewCarDto newCar, bool trackChanges)
        {
            throw new NotImplementedException();
        }

        private CarDto ConvertCarToCarDto(Car car)
        {
            return new CarDto(
                car.Name,
                car.CarMake.Name,
                car.CarModel,
                car.Description,
                car.CarImage,
                car.CarMileage,
                car.Horsepower,
                car.Acceleration0to100,
                car.NumberOfSeats,
                car.NumberOfSeats,
                car.YearOfProduction,
                car.OverlimitFee,
                car.AverageCombustion,
                car.TrunkCapacity,
                car.CarType.Name,
                car.EngineType.Name,
                car.KilometrLimit.LimitValue,
                car.AirConditioningType.Name,
                car.GearBoxType.Name,
                car.CarDrive.Name,
                car.IsActive
                );
        }
    }
}
