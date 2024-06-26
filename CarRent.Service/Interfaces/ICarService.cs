﻿using CarRent.data.DTO;
using CarRent.data.Models;
using CarRent.Repository.Parameters;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CarRent.Service.Interfaces
{
    public interface ICarService
    {
        Task<PagedList<CarListDtoForClient>> GetCarListForClientAsync(CarParameters carParameters, bool trackChanges);
        Task<PagedList<CarListDto>> GetCarsForWorkerAsync(CarParameters carParameters, bool trackChanges);
        Task<CarDetailsPage> GetCarDetailsForClientAsync(int id);
        Task<CarDetailForWorkerDto?> GetCarById(int id, bool trackChanges);
        Task<IEnumerable<CarImageDto>> GetCarImages(int id);
        Task<IEnumerable<Car>> GetAvailableCarsInDates(NewRentalForClient rental);
        Task<IEnumerable<CarListDto>> GetAvailableCarsWithPriceForDatesAsync(NewRentalForClient rental);
        Task<List<RentalDatesDto>> GetExcludedDatesForCarAsync(int carId);
        Task<Car> CreateCarAsync(NewCarDto car);
        Task AddCarImg(CarImageDto img);
        Task AddToRecommendedAsync(int carId);
        Task<bool> IsCarRecommendedAsync(int carId);
        Task<IEnumerable<CarListForRecommended>> GetRecommended();
        Task UpdateCarAsync(int id, NewCarDto newCar, bool trackChanges);
        Task SetCarVisibility(int id, bool IsVisible);
        Task RemoveRecommendedAsync(int id);
        Task DeleteCar(int id);
        Task DeleteCarImage(int id);
        Task<IEnumerable<CarImageDto>> GetCarImagesAsync(int carId);
    }
}
