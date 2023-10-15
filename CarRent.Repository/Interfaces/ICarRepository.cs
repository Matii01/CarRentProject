using CarRent.data.DTO;
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
        Task<IEnumerable<Car>> GetAllCarAsync(CarParameters parameters, bool trackChanges);
        Task<IEnumerable<Car>> GetAllActiveCarAsync(CarParameters parameters, bool trackChanges);
        Task<Car?> GetCarAsync(int id, bool trackChanges);
        Task<Car> GetCarForClientAsync(int id);
        void Create(Car car);
        void Delete(Car car);
    }
}
