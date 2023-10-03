﻿using CarRent.data.Models.CarRent;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CarRent.Repository.Interfaces
{
    public interface ICarTypeRepository
    {
        Task<IEnumerable<CarType>> GetAllCarTypeAsync(bool trackChanges);
        Task<IEnumerable<CarType>> GetAllActiveCarTypeAsync(bool trackChanges);
        Task<CarType> GetCarTypeAsync(int id, bool trackChanges);
        void CreateCarType(CarType carMake);
        void DeleteCarType(CarType carMake);
    }
}
