using AutoMapper;
using CarRent.data.DTO;
using CarRent.data.Models;
using CarRent.data.Models.CarRent;
using CarRent.Repository.Interfaces;
using CarRent.Repository.Parameters;
using CarRent.Service.Helper;
using CarRent.Service.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace CarRent.Service.Service
{
    public class CarService : ServiceBase, ICarService
    {
        private readonly IRentalService _rentals;
        private readonly ICarMaintenanceService _maintenance;
        private readonly IPriceListService _priceList;

        public CarService(IRepositoryManager repository, IMapper mapper, IRentalService rentals, ICarMaintenanceService maintenance, IPriceListService priceList) 
            : base(repository, mapper)
        {
            _rentals = rentals;
            _maintenance = maintenance;
            _priceList = priceList;
        }
        
        public async Task<PagedList<CarListDtoForClient>> GetCarListForClientAsync(CarParameters carParameters, bool trackChanges)
        {
            var list = await _repository.Car.GetCarsForClientAsync(carParameters, trackChanges);
            //var items = MapHelper.MapCarToCarListDtoForClient(list);

            return list;
        }

        public async Task<PagedList<CarListDto>> GetCarsForWorkerAsync(CarParameters carParameters, bool trackChanges)
        {
            var list = await _repository.Car.GetCarsForWorkerAsync(carParameters, trackChanges);
            //var items = MapHelper.MapCarToCarListDto(list);

            return list;
        }

        public async Task<CarDetailsPage> GetCarDetailsForClientAsync(int id)
        {
            var item = await _repository.Car.GetCarForClientAsync(id);


            return MapHelper.MapCarToCarDetailsPageForClient(item);
        }

        public async Task<CarDetailForWorkerDto?> GetCarById(int id, bool trackChanges)
        {
            // TODO 
            var car = await _repository.Car
                .GetCarAsync(id, trackChanges);
            
            if(car is null)
            {
                return null;
            }
            return MapHelper.MapCarToCarDetailForWorkerDto(car);
        }

        public async Task<IEnumerable<CarImageDto>> GetCarImages(int carId)
        {
            var list = await _repository.CarImages
                .FindByCondition(x => x.IsActive == true && x.CarId == carId, false)
                .Select(x=> new CarImageDto(x.Id, x.CarId, x.ImgUrl))
                .ToListAsync();

            return list;
        }

        public async Task AddCarImg(CarImageDto img)
        {
            CarImages carImages = new()
            {
                CarId = img.CarId,
                ImgUrl = img.ImgUrl,
                IsActive = true,
            };
            _repository.CarImages.Create(carImages);
            await _repository.SaveAsync();
        }

        public async Task<IEnumerable<Car>> GetAvailableCarsInDates(NewRentalForClient rental)
        {
            var carsThatHaveRental = await _rentals.GetCarsThatHaveRentalInDates(rental);
            var carThatHaveService = await _maintenance.GetCarsThatHaveServiceInDates(rental);

            var excludedIds = carsThatHaveRental.Union(carThatHaveService).ToList();

            var cars = await _repository.Car.GetCarsExcept(excludedIds)
                .Where(x => x.IsVisible == true)
                .ToListAsync();
            return cars;
        }

        public async Task<IEnumerable<CarListDto>> GetAvailableCarsWithPriceForDatesAsync(NewRentalForClient rental)
        {
            var carsThatHaveRental = await _rentals.GetCarsThatHaveRentalInDates(rental);
            var carThatHaveService = await _maintenance.GetCarsThatHaveServiceInDates(rental);

            var excludedIds = carsThatHaveRental.Union(carThatHaveService).ToList();

            var cars = await _repository.Car.GetCarsExcept(excludedIds)
                .Where(x => x.IsVisible == true)
                .ToListAsync();
            
            var CarList = new List<CarListDto>();
            foreach(var item in cars)
            {
                var price = await _priceList.GetPriceForCarForDate(null, new NewRentalForClient(item.Id, rental.DateFrom, rental.DateTo));
                CarList.Add(new CarListDto(
                    item.Id,
                    item.Name,
                    "",
                    "",
                    "",
                    "",
                    price.Gross
              ));
            }
            return CarList;
        }


        public async Task<Car> CreateCarAsync(NewCarDto car)
        {
            var newCar = _mapper.Map<Car>(car);

            if (car.CarImages != null)
            {
                List<CarImages> carImages = new ();

                foreach (var item in car.CarImages)
                {
                    carImages.Add(new CarImages() { ImgUrl = item, IsActive = true });
                }

                newCar.CarImages = carImages;
            }

            _repository.Car.Create(newCar);
            await _repository.SaveAsync();

            return newCar;   
        }

        public async Task AddToRecommendedAsync(int carId)
        {
            RecommendedCars recommended = new () 
            {
                CarId = carId,
                AddedData = DateTime.Now,
                IsActive = true,
            };
            _repository.RecommendedCars.Create(recommended);
            await _repository.SaveAsync();
        }

        public async Task<bool> IsCarRecommendedAsync(int carId)
        {
            var list = await _repository.RecommendedCars
                .FindByCondition(x => x.IsActive == true && x.CarId == carId, false)
                .Select(x => x.Id)
                .ToListAsync();

            if(list.Count == 0)
            {
                return false;
            }
            return true;
        }

        public async Task<IEnumerable<CarListForRecommended>> GetRecommended()
        {
            var list = await _repository.RecommendedCars
                .FindByCondition(x => x.IsActive == true, false)
                .Select(x => new CarListForRecommended(x.CarId, x.Car.Name, x.Car.CarImage))
                .ToListAsync();

            foreach (var item in list)
            {
                item.Price = await _repository.PriceList.GetCarPriceForOneDay(item.CarId);
            }
            return list;
        }

        public async Task UpdateCarAsync(int id, NewCarDto newCar, bool trackChanges)
        {
            var car = await _repository.Car.GetCarAsync(id, trackChanges) ?? throw new ArgumentException("not found");
            MapHelper.UpdateCar(ref car, newCar);
            await _repository.SaveAsync();
        }

        public async Task RemoveRecommendedAsync(int id)
        {
            var item = await _repository.RecommendedCars
                .FindByCondition(x => x.CarId == id, true)
                .SingleOrDefaultAsync() ?? throw new Exception("not found");
              
            item.IsActive = false;
            await _repository.SaveAsync();
        }

        public async Task DeleteCar(int id)
        {
            var car = await _repository.Car.GetCarAsync(id, true) 
                ?? throw new Exception("not found");

            car.IsActive = false;
            await _repository.SaveAsync();
        }

        public async Task SetCarVisibility(int id, bool IsVisible)
        {
            var car = await _repository.Car.GetCarAsync(id, true)
                ?? throw new Exception("not found");

            car.IsVisible = IsVisible;
            await _repository.SaveAsync();
        }

        public async Task<IEnumerable<CarImageDto>> GetCarImagesAsync(int carId)
        {
            var list = await _repository.CarImages
                .FindByCondition(
                    x => x.IsActive == true &&
                    x.CarId == carId, false)
                .Select(x => new CarImageDto(x.Id, x.CarId, x.ImgUrl)) 
                .ToListAsync();

            return list;
        }

        public async Task DeleteCarImage(int id)
        {
            var item = await _repository.CarImages
               .GetAsync(id, true)
               .SingleOrDefaultAsync() ?? throw new Exception("Not found");

            item.IsActive = false;
            await _repository.SaveAsync();
        }

        public async Task<List<RentalDatesDto>> GetExcludedDatesForCarAsync(int carId)
        {
            var maintenanceDates = await _maintenance.GetFutureMaintenanceDatesForCarAsync(carId);
            var carRentals = await _rentals.GetFutureRentalDatesForCarAsync(carId);
            var dates = maintenanceDates.Select(x => new RentalDatesDto(x.DateStart, x.DateEnd));
            var newDates = dates.Concat(carRentals);

            return newDates.ToList();
        }
    }
}
