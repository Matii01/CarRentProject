﻿using CarRent.data.Models.CarRent;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CarRent.Repository.Interfaces
{
    public interface IGenericRepository<T>
    {
        Task<IEnumerable<T>> GetAllAsync(bool trackChanges);
        Task<IEnumerable<T>> GetAllActiveAsync(bool trackChanges);
        Task<T> GetAsync(int id, bool trackChanges);
        void Create(T carMake);
        void Delete(T carMake);
    }
}