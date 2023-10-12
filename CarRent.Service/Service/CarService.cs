using AutoMapper;
using CarRent.data.DTO;
using CarRent.data.Models;
using CarRent.Repository.Interfaces;
using CarRent.Repository.Parameters;
using CarRent.Service.Helper;
using CarRent.Service.Interfaces;

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
            var items = MapHelper.MapCarToCarListDtoForClient(list);

            return items;
        }

        public async Task<List<CarListDto>> GetCarsAsync(CarParameters carParameters, bool trackChanges)
        {
            var list = await _repository.Car.GetAllCarAsync(carParameters, trackChanges);
            var items = MapHelper.MapCarToCarListDto(list);

            return items;
        }

        public async Task<CarDetailsDtoForClient> GetCarDetailsForClientAsync(int id)
        {
            var item = await _repository.Car.GetCarForClientAsync(id);
            return MapHelper.MapCarToCarDetailsDtoForClient(item);
        }

        public async Task<CarDto> GetCarById(int id, bool trackChanges)
        {
            var car = await _repository.Car.GetCarAsync(id, trackChanges);
            
            //return _mapper.Map<CarDto>(car);
            return MapHelper.MapCarToCarDto(car);
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

        public Task DeleteCar(int id)
        {
            throw new NotImplementedException();
        }
    }
}
