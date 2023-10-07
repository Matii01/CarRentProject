using CarRent.data.Models.CarRent;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CarRent.Repository.Interfaces.CarInterfaces
{
    public interface ICarDriveRepository
    {
        Task<IEnumerable<CarDrive>> GetAllCarDriveAsync(bool trackChanges);
        Task<IEnumerable<CarDrive>> GetAllActiveCarDriveAsync(bool trackChanges);
        Task<CarDrive> GetCarDriveAsync(int id, bool trackChanges);
        void CreateCarDrive(CarDrive carDrive);
        void DeleteCarDrive(CarDrive carDrive);
    }
}
