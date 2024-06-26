﻿using CarRent.data.DTO;
using CarRent.data.Models;
using CarRent.Repository.Parameters;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CarRent.Repository.Interfaces
{
    public interface ICarRepository
    {
        Task<PagedList<CarListDto>> GetCarsForWorkerAsync(CarParameters parameters, bool trackChanges);
        Task<PagedList<CarListDtoForClient>> GetCarsForClientAsync(CarParameters parameters, bool trackChanges);
        IQueryable<Car?> GetCarById(int id, bool trackChanges); // 
        Task<Car?> GetCarAsync(int id, bool trackChanges);
        Task<Car> GetCarForClientAsync(int id);
        IQueryable<Car> GetCarsExcept(List<int> excludedIds);
        void Create(Car car);
        void Delete(Car car);
    }
}
